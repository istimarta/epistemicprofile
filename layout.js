import "./globals.css";

export const metadata = {
  title: "Epistemic Profile — How Do You Know What You Know?",
  description:
    "A 16-question assessment that maps the structure of your epistemic commitments — how you form beliefs, weigh evidence, and navigate uncertainty.",
  openGraph: {
    title: "Epistemic Profile",
    description: "Map the structure of how you know what you know.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-surface dark:bg-surface-dark text-ink dark:text-ink-dark min-h-screen">
        {children}
      </body>
    </html>
  );
}
