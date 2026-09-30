import { createFileRoute, Link } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { BrandingPanel } from "@/components/admin/BrandingPanel";
import { EventsPanel } from "@/components/admin/EventsPanel";
import { InquiriesPanel } from "@/components/admin/InquiriesPanel";
import { MediaPanel } from "@/components/admin/MediaPanel";
import { ServicesPanel } from "@/components/admin/ServicesPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/lib/studio";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Studio Dashboard | Parinayam Weddings" },
      { name: "description", content: "Private Parinayam Weddings studio dashboard." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Studio Dashboard | Parinayam Weddings" },
      { property: "og:description", content: "Private Parinayam Weddings studio dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const TABS = [
  { value: "branding", label: "Branding" },
  { value: "media", label: "Gallery" },
  { value: "events", label: "Events" },
  { value: "services", label: "Pricing" },
  { value: "inquiries", label: "Leads" },
];

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="eyebrow">Loading…</p>
      </div>
    );
  }

  if (!session) return <LoginCard />;

  return <Dashboard />;
}

function LoginCard() {
  const [email, setEmail] = useState("admin@studio.com");
  const [password, setPassword] = useState("admin123");
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // First run: create the studio account with these credentials.
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setBusy(false);
        toast.error(error.message);
        return;
      }
      const retry = await supabase.auth.signInWithPassword({ email, password });
      if (retry.error) {
        setBusy(false);
        toast.error(retry.error.message);
        return;
      }
    }
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm border border-border/70 bg-surface p-8">
        <p className="eyebrow">Studio access</p>
        <h1 className="mt-3 text-3xl">Sign in</h1>
        <div className="mt-8 space-y-4">
          <div>
            <Label className="eyebrow">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 rounded-none border-border bg-transparent"
            />
          </div>
          <div>
            <Label className="eyebrow">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void signIn();
              }}
              className="mt-2 rounded-none border-border bg-transparent"
            />
          </div>
          <Button
            onClick={signIn}
            disabled={busy}
            className="w-full rounded-none text-[11px] tracking-[0.22em]"
          >
            {busy ? "SIGNING IN…" : "SIGN IN"}
          </Button>
          <Link
            to="/"
            className="block pt-2 text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary"
          >
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { settings } = useSettings();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background px-5 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="mt-2 text-4xl">{settings.studio_name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary"
            >
              View site
            </Link>
            <Button
              variant="outline"
              onClick={signOut}
              className="rounded-none border-border bg-transparent text-[11px] tracking-[0.2em] hover:border-primary hover:bg-transparent hover:text-primary"
            >
              SIGN OUT
            </Button>
          </div>
        </div>

        <div className="hairline my-8" />

        <Tabs defaultValue="branding">
          <TabsList className="mb-8 h-auto flex-wrap justify-start gap-2 rounded-none bg-transparent p-0">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="rounded-none border border-border px-5 py-2 text-[11px] uppercase tracking-[0.2em] data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="branding">
            <BrandingPanel />
          </TabsContent>
          <TabsContent value="media">
            <MediaPanel />
          </TabsContent>
          <TabsContent value="events">
            <EventsPanel />
          </TabsContent>
          <TabsContent value="services">
            <ServicesPanel />
          </TabsContent>
          <TabsContent value="inquiries">
            <InquiriesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
