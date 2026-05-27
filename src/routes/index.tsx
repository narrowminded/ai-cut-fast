import { createFileRoute } from "@tanstack/react-router";
import {
  Scissors,
  Zap,
  ShieldCheck,
  Wand2,
  Download,
  Check,
  Image as ImageIcon,
  Sparkles,
  Layers,
  ArrowRight,
  Upload,
  Cpu,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { BgRemoverDemo } from "@/components/BgRemoverDemo";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "BGCut AI — Remove Image Backgrounds in One Click" },
      {
        name: "description",
        content:
          "BGCut AI removes image backgrounds instantly with one click. Free, fast, and pixel-perfect transparent PNGs for designers, sellers, and creators.",
      },
      { property: "og:title", content: "BGCut AI — One-Click Background Removal" },
      {
        property: "og:description",
        content: "Upload an image, get a transparent PNG in seconds. Powered by AI.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="BGCut AI" className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-lg font-bold tracking-tight">
            BGCut <span className="text-brand-gradient">AI</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#demo" className="hover:text-foreground">Try it</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
          <a href="#demo">
            <Button className="bg-brand-gradient text-white border-0 hover:opacity-90">
              Try Free
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            Powered by next-gen background removal AI
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Remove image backgrounds in{" "}
            <span className="text-brand-gradient">one click.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Upload any photo and get a crisp transparent PNG in seconds. No
            Photoshop, no learning curve — just instant, pixel-perfect cutouts.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#demo">
              <Button size="lg" className="bg-brand-gradient text-white border-0 hover:opacity-90 h-12 px-6 text-base">
                <Upload className="mr-2 h-5 w-5" />
                Remove background — free
              </Button>
            </a>
            <a href="#how">
              <Button size="lg" variant="ghost" className="h-12 px-6 text-base">
                See how it works <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-400" /> No signup</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-400" /> Private — runs on-device</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-400" /> Free HD download</span>
          </div>
        </div>

        <div id="demo" className="mx-auto mt-14 max-w-5xl scroll-mt-20">
          <BgRemoverDemo />
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const items = ["Shopify Sellers", "Etsy Creators", "Indie Designers", "TikTok Studios", "Notion Templates", "Marketing Teams"];
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-5 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by creators worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-60">
          {items.map((x) => (
            <span key={x} className="text-sm font-medium">{x}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Zap, title: "Instant results", desc: "AI cutouts in under 3 seconds — no waiting, no queues." },
    { icon: Wand2, title: "Pixel-perfect edges", desc: "Handles hair, fur, and complex edges with stunning detail." },
    { icon: ShieldCheck, title: "Private by design", desc: "Images are processed on-device. Nothing is stored on our servers." },
    { icon: Layers, title: "Bulk processing", desc: "Drop a folder and process hundreds of product photos at once." },
    { icon: Download, title: "HD transparent PNG", desc: "Full-resolution downloads ready for any design workflow." },
    { icon: Cpu, title: "Developer API", desc: "Integrate one-click background removal into your own app." },
  ];
  return (
    <section id="features" className="py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Built for <span className="text-brand-gradient">speed</span>, quality and scale
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to ship clean, professional cutouts — without ever opening an editor.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass group rounded-2xl p-6 transition hover:bg-white/[0.06]">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient shadow-lg shadow-purple-500/20">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Upload, title: "Upload", desc: "Drag in any JPG, PNG or WEBP image." },
    { icon: Scissors, title: "AI cuts the background", desc: "Our model isolates the subject in seconds." },
    { icon: Download, title: "Download transparent PNG", desc: "Ready to drop into any design or store." },
  ];
  return (
    <section id="how" className="bg-white/[0.02] py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Three steps. Zero skills.</h2>
          <p className="mt-4 text-muted-foreground">From raw photo to transparent PNG in less time than it takes to open Photoshop.</p>
        </div>
        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="glass relative rounded-2xl p-8">
              <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                {i + 1}
              </div>
              <s.icon className="h-8 w-8 text-purple-400" />
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    { title: "E-commerce", desc: "Clean product photos for Shopify, Amazon, Etsy." },
    { title: "Designers", desc: "Skip the pen tool — get cutouts in seconds." },
    { title: "Social creators", desc: "Stickers, thumbnails, and edits in a tap." },
    { title: "Marketers", desc: "Hero images and ad creatives ready to ship." },
    { title: "Students", desc: "Project visuals and presentations made easy." },
    { title: "Small businesses", desc: "Pro-grade catalog photos without the studio." },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">For every kind of creator</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold">{c.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for trying it out.",
      features: ["5 images / day", "Standard resolution", "Web app access"],
      cta: "Start free",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9",
      per: "/mo",
      desc: "For creators and small teams.",
      features: ["Unlimited HD downloads", "Bulk processing", "Priority AI queue", "Email support"],
      cta: "Go Pro",
      highlighted: true,
    },
    {
      name: "API",
      price: "$0.02",
      per: "/image",
      desc: "For businesses and developers.",
      features: ["REST + webhook API", "Volume discounts", "99.9% uptime SLA", "Dedicated support"],
      cta: "Get API key",
      highlighted: false,
    },
  ];
  return (
    <section id="pricing" className="bg-white/[0.02] py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Simple, honest pricing</h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you need more.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 ${
                p.highlighted
                  ? "bg-brand-gradient text-white shadow-2xl shadow-purple-500/30"
                  : "glass"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple-700">
                  Most popular
                </div>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className={`mt-1 text-sm ${p.highlighted ? "text-white/80" : "text-muted-foreground"}`}>
                {p.desc}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold">{p.price}</span>
                {p.per && (
                  <span className={p.highlighted ? "text-white/80" : "text-muted-foreground"}>
                    {p.per}
                  </span>
                )}
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlighted ? "text-white" : "text-green-400"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 w-full ${
                  p.highlighted
                    ? "bg-white text-purple-700 hover:bg-white/90"
                    : "bg-brand-gradient text-white border-0 hover:opacity-90"
                }`}
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-12 text-center text-white shadow-2xl shadow-purple-500/30">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Remove. Cut. Perfect.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              Join thousands of creators using BGCut AI to ship cleaner visuals faster.
            </p>
            <a href="#demo">
              <Button size="lg" className="mt-8 h-12 bg-white px-8 text-base text-purple-700 hover:bg-white/90">
                Try BGCut AI free
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="BGCut AI" className="h-7 w-7 rounded-md object-cover" />
          <span className="text-sm font-semibold">
            BGCut <span className="text-brand-gradient">AI</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BGCut AI. Remove. Cut. Perfect.
        </p>
      </div>
    </footer>
  );
}
