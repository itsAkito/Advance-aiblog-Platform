"use client";

import { cn } from "@/lib/utils";

type AppToastProps = {
  message: string;
  tone?: "success" | "error" | "info";
  visible: boolean;
};

export default function AppToast({ message, tone = "info", visible }: AppToastProps) {
  if (!visible || !message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 px-4">
      <div
        className={cn(
          "rounded-xl border px-4 py-2.5 text-xs font-semibold shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200",
          tone === "success" && "border-emerald-500/35 bg-emerald-500/15 text-emerald-100",
          tone === "error" && "border-red-500/35 bg-red-500/15 text-red-100",
          tone === "info" && "border-primary/35 bg-primary/15 text-on-primary"
        )}
      >
        {message}
      </div>
    </div>
  );
}
