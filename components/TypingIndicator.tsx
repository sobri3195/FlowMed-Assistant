export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 px-3 py-2 animate-slide-fade">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
        AI
      </div>
      <div className="rounded-2xl rounded-bl-md bg-flowmed-assistant px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 150, 300].map((delay, idx) => (
            <span
              key={idx}
              className="h-2 w-2 rounded-full bg-slate-500 animate-typing-dot"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
