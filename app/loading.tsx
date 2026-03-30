export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <p className="mt-3 text-sm text-on-surface-variant">Loading...</p>
      </div>
    </div>
  );
}
