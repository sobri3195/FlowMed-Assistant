import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowMed Assistant",
  description: "Mobile-first AI chat bot for FlowMed"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
