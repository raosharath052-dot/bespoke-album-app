import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { QuoteBuilder } from "@/components/site/QuoteBuilder";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Build Your Investment — Wedding Quote Calculator" },
      {
        name: "description",
        content:
          "Add each wedding function, pick your cameras and crew, and see a live estimate. Submit to check your date on WhatsApp.",
      },
      { property: "og:title", content: "Build Your Investment — Wedding Quote Calculator" },
      {
        property: "og:description",
        content: "A granular, event-by-event wedding photography quote builder with live pricing.",
      },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <p className="eyebrow">Investment builder</p>
        <h1 className="mt-3 text-4xl md:text-6xl">Craft your coverage</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Add every function of your celebration, choose the cameras and crew for each one, then
          layer on albums and deliverables. Your estimate updates as you go.
        </p>
        <div className="hairline my-10" />
        <QuoteBuilder />
      </main>
      <Footer />
    </div>
  );
}
