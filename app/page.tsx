import { ChatShell } from "@/components/ChatShell";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-flowmed-panel shadow-mobile sm:my-6 sm:min-h-[calc(100vh-3rem)] sm:rounded-3xl sm:border sm:border-slate-200">
      <ChatShell />
    </main>
  );
}
