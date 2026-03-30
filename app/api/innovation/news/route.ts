import { NextResponse } from 'next/server';

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  sourceName: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
};

const extractText = (xml: string, tag: string): string => {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
    || xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  if (!match?.[1]) return '';
  return match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
};

const extractAttr = (xml: string, tag: string, attr: string): string => {
  const match = xml.match(new RegExp(`<${tag}[^>]*${attr}=["']([^"']+)["']`, 'i'));
  return match?.[1] || '';
};

const parseRSS = (xml: string, sourceName: string, category: string): NewsItem[] => {
  const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).map((m) => m[1]);
  return items.slice(0, 8).map((item, idx) => {
    const title = extractText(item, 'title');
    const link = extractText(item, 'link') || extractText(item, 'guid');
    const description = extractText(item, 'description');
    const pubDate = extractText(item, 'pubDate');
    const imageUrl = extractAttr(item, 'media:thumbnail', 'url')
      || extractAttr(item, 'media:content', 'url')
      || extractAttr(item, 'enclosure', 'url');

    return {
      id: link || `${sourceName}-${idx}`,
      title,
      summary: description.slice(0, 220),
      url: link,
      source: sourceName.toLowerCase().replace(/\s/g, '-'),
      sourceName,
      category,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      imageUrl: imageUrl || undefined,
    };
  }).filter((item) => item.title && item.url);
};

const RSS_SOURCES = [
  {
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    name: 'BBC Technology',
    category: 'Technology',
  },
  {
    url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
    name: 'BBC Science',
    category: 'Science',
  },
  {
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    name: 'NYT Technology',
    category: 'Technology',
  },
  {
    url: 'https://techcrunch.com/feed/',
    name: 'TechCrunch',
    category: 'Startups',
  },
  {
    url: 'https://www.wired.com/feed/rss',
    name: 'Wired',
    category: 'Innovation',
  },
];

async function fetchFeedSafe(source: typeof RSS_SOURCES[0]): Promise<NewsItem[]> {
  try {
    const resp = await fetch(source.url, {
      headers: { 'User-Agent': 'AiBlog News Aggregator/1.0' },
      next: { revalidate: 900 }, // 15 min cache
    });
    if (!resp.ok) return [];
    const xml = await resp.text();
    return parseRSS(xml, source.name, source.category);
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const results = await Promise.allSettled(RSS_SOURCES.map(fetchFeedSafe));
    const allNews: NewsItem[] = [];

    results.forEach((r) => {
      if (r.status === 'fulfilled') allNews.push(...r.value);
    });

    allNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      items: allNews.slice(0, 25),
      total: allNews.length,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
