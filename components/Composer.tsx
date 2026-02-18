import { FormEvent, KeyboardEvent, useRef } from "react";

type ComposerProps = {
  value: string;
  onChange: (next: string) => void;
  onSend: () => void;
  disabled: boolean;
};

export function Composer({ value, onChange, onSend, disabled }: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "0px";
    element.style.height = `${Math.min(element.scrollHeight, 140)}px`;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSend();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 border-t border-slate-200 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.7rem)] pt-2 backdrop-blur"
    >
      <div className="flex items-end gap-2 rounded-2xl border border-slate-300 bg-white px-2 py-2 shadow-sm focus-within:border-slate-400">
        <textarea
          ref={textareaRef}
          value={value}
          maxLength={2000}
          rows={1}
          placeholder="Tanyakan kebijakan RS/BPJS/rujukan…"
          onChange={(event) => {
            onChange(event.target.value);
            resize();
          }}
          onInput={resize}
          onKeyDown={handleKeyDown}
          className="max-h-36 min-h-[1.5rem] flex-1 resize-none border-0 bg-transparent px-2 text-sm leading-6 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flowmed-accent text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          aria-label="Kirim pesan"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M3.478 2.404a.75.75 0 0 1 .819-.096l17.25 8.25a.75.75 0 0 1 0 1.384l-17.25 8.25A.75.75 0 0 1 3.25 19.5v-6.443l7.05-1.057a.75.75 0 1 0 0-1.482L3.25 9.46V2.999a.75.75 0 0 1 .228-.595Z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
