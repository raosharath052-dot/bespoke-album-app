import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Weddings, Pre-Weddings & Films" },
      {
        name: "description",
        content:
          "Browse our editorial wedding photographs, pre-wedding portraits and cinematic wedding films.",
      },
      { property: "og:title", content: "Portfolio — Weddings, Pre-Weddings & Films" },
      {
        property: "og:description",
        content: "Editorial wedding photographs, pre-wedding portraits and cinematic films.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-10 md:pt-40">
        <p className="eyebrow">Archive</p>
        <h1 className="mt-3 text-5xl md:text-7xl">The Portfolio</h1>
        <div className="hairline my-10" />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
