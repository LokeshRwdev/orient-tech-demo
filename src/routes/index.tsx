import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Star, Truck } from "lucide-react";
import heroImage from "@/assets/orient-city-hero.jpg";
import categoryTyres from "@/assets/category-tyres.jpg";
import categoryLubricants from "@/assets/category-lubricants.jpg";
import categoryBatteries from "@/assets/category-batteries.jpg";
import categoryWheels from "@/assets/category-wheels.jpg";
import fitmentImage from "@/assets/fitment-station.jpg";
import usaServiceMap from "@/assets/usa-service-map.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { TyreFinder } from "@/components/tyre-finder";
import { featuredTyres } from "@/lib/store-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Orient Tech — Tyres for Every City Mile" },
    { name: "description", content: "Shop tyres, wheels, batteries and lubricants with local professional fitment in New York." },
    { property: "og:title", content: "Orient Tech — Tyres for Every City Mile" },
    { property: "og:description", content: "Find the right tyres and book installation near you." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

const categories = [
  { title: "Tyres", copy: "Grip, comfort and control", image: categoryTyres, link: true },
  { title: "Lubricants", copy: "Protect every moving part", image: categoryLubricants },
  { title: "Batteries", copy: "Power you can count on", image: categoryBatteries },
  { title: "Wheels", copy: "Style meets performance", image: categoryWheels },
];

const testimonials = [
  { quote: "The booking was effortless, the price was clear, and my new tyres feel remarkably quiet through Manhattan.", name: "Marcus Chen", detail: "Verified New York customer" },
  { quote: "Orient Tech helped me choose the right all-season set and had everything ready at the station when I arrived.", name: "Sarah Jenkins", detail: "Verified New York customer" },
];

const tyreBrands = ["GOODYEAR", "MICHELIN", "CONTINENTAL", "BRIDGESTONE", "PIRELLI", "COOPER", "YOKOHAMA", "FALKEN"];

const serviceCities = [
  { name: "Seattle", left: "14%", top: "20%" },
  { name: "San Francisco", left: "12%", top: "48%" },
  { name: "Los Angeles", left: "16%", top: "64%" },
  { name: "Phoenix", left: "24%", top: "66%" },
  { name: "Denver", left: "39%", top: "49%" },
  { name: "Dallas", left: "48%", top: "72%" },
  { name: "Houston", left: "50%", top: "80%" },
  { name: "Minneapolis", left: "57%", top: "29%" },
  { name: "Chicago", left: "64%", top: "39%" },
  { name: "Atlanta", left: "72%", top: "65%" },
  { name: "Miami", left: "82%", top: "82%" },
  { name: "Washington DC", left: "83%", top: "49%" },
  { name: "New York", left: "87%", top: "39%" },
  { name: "Boston", left: "91%", top: "30%" },
];

function HomePage() {
  return <main>
    <section className="relative min-h-[590px] overflow-hidden border-b border-border">
      <img src={heroImage} alt="Silver performance car driving through New York City" width={1920} height={900} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--ink)_58%,transparent)_0%,color-mix(in_oklab,var(--ink)_24%,transparent)_43%,transparent_70%)]" />
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 pb-28 pt-14 sm:px-6 md:min-h-[590px] md:pb-36">
        <div className="max-w-xl text-hero-foreground">
          <p className="mb-4 text-xs font-bold uppercase">Ready for New York roads</p>
          <h1 className="font-display text-4xl font-bold uppercase leading-none sm:text-6xl">Engineered for<br/>the urban pulse.</h1>
          <p className="mt-5 max-w-md text-base text-hero-foreground/90 sm:text-lg">Precision, safety, and a quieter ride for every city mile.</p>
          <Button asChild className="mt-7 h-11 px-6 font-bold uppercase"><Link to="/tyres">Shop tyres <ArrowRight /></Link></Button>
        </div>
      </div>
      <div className="relative inset-x-0 bottom-0 z-10 mx-auto max-w-5xl px-4 sm:px-6 md:absolute"><TyreFinder /></div>
    </section>

    <section aria-label="Tyre brands" className="overflow-hidden border-b border-border bg-background py-8">
      <div className="brand-marquee flex w-max items-center" role="presentation">
        {[false, true].map((duplicate) => <div key={String(duplicate)} aria-hidden={duplicate} className="flex shrink-0 items-center gap-12 px-6 sm:gap-20 sm:px-10">
          {tyreBrands.map((brand) => <span key={`${brand}-${duplicate}`} className="whitespace-nowrap font-display text-2xl font-black text-muted-foreground sm:text-3xl">{brand}</span>)}
        </div>)}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8"><p className="text-xs font-bold uppercase text-muted-foreground">Everything your vehicle needs</p><h2 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Shop by category</h2></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map((category)=><article key={category.title} className="group relative aspect-[4/5] overflow-hidden bg-surface">
        <img src={category.image} alt={category.title} width={720} height={720} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_oklab,var(--ink)_78%,transparent),transparent_65%)]"/>
        <div className="absolute inset-x-0 bottom-0 p-6 text-hero-foreground"><h3 className="font-display text-3xl font-bold uppercase">{category.title}</h3><p className="mt-1 text-sm text-hero-foreground/80">{category.copy}</p>{category.link&&<Link to="/tyres" aria-label="Shop tyres" className="absolute inset-0"/>}</div>
      </article>)}</div>
    </section>

    <section className="bg-surface py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-bold uppercase text-muted-foreground">Selected for city driving</p><h2 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Popular tyres</h2></div><Button asChild variant="link"><Link to="/tyres">View all <ArrowRight /></Link></Button></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featuredTyres.map((tyre) => <ProductCard tyre={tyre} key={tyre.id} />)}</div></div></section>

    <section className="overflow-hidden bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase text-muted-foreground">Nationwide fitment network</p>
          <h2 className="mt-2 max-w-md font-display text-4xl font-bold uppercase leading-none sm:text-5xl">We serve across the country</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">From coast to coast, find trusted tyre fitting and dependable delivery in major cities across the USA.</p>
          <div className="mt-7 flex items-center gap-3 border-l-2 border-primary pl-4"><strong className="font-display text-3xl">14</strong><span className="text-sm font-semibold uppercase text-muted-foreground">Major service cities<br/>and growing</span></div>
        </div>
        <div className="relative mx-auto aspect-[16/9] w-full max-w-3xl" aria-label="Map of Orient Tech service cities across the USA">
          <img src={usaServiceMap} alt="Map of the United States showing Orient Tech service locations" width={1600} height={900} loading="lazy" className="h-full w-full object-contain"/>
          {serviceCities.map((city) => <div key={city.name} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: city.left, top: city.top }}>
            <span className="block size-2.5 rounded-full border-2 border-background bg-primary shadow-sm sm:size-3" />
            <span className="pointer-events-none absolute left-1/2 top-4 z-10 hidden -translate-x-1/2 whitespace-nowrap bg-secondary px-2 py-1 text-[10px] font-bold text-secondary-foreground shadow-sm group-hover:block sm:block">{city.name}</span>
          </div>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6"><div className="mb-10 text-center"><p className="text-xs font-bold uppercase text-muted-foreground">Driver feedback</p><h2 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">Driven by trust</h2></div><div className="grid gap-6 md:grid-cols-2">{testimonials.map(item=><figure key={item.name} className="border border-border bg-surface p-8 sm:p-10"><div className="flex gap-1 text-warning">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-4 fill-warning"/>)}</div><blockquote className="mt-6 text-xl leading-relaxed">“{item.quote}”</blockquote><figcaption className="mt-7"><strong>{item.name}</strong><p className="text-sm text-muted-foreground">{item.detail}</p></figcaption></figure>)}</div></section>

    <section className="grid bg-secondary text-secondary-foreground lg:grid-cols-2"><img src={fitmentImage} alt="Technician installing a wheel" width={1200} height={800} loading="lazy" className="h-full min-h-[420px] w-full object-cover"/><div className="flex items-center p-8 sm:p-14 lg:p-20"><div><p className="text-xs font-bold uppercase text-secondary-foreground/70">Professional fitment</p><h2 className="mt-3 font-display text-5xl font-bold uppercase leading-none">Buy online.<br/>Fit in New York.</h2><p className="mt-5 max-w-xl text-secondary-foreground/75">Choose a trusted station and reserve a convenient time while you shop.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Verified technicians","Upfront fitting prices","Easy time-slot booking","Road-ready inspection"].map((item)=><p key={item} className="flex items-center gap-2 text-sm font-semibold"><CheckCircle2 className="size-5"/>{item}</p>)}</div><Button asChild variant="outline" className="mt-8 rounded-none border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"><Link to="/fitment">View fitment centers <ArrowRight /></Link></Button></div></div></section>
    <section className="border-y border-border bg-background"><div className="mx-auto grid max-w-7xl divide-y divide-border px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0">{[[Truck,"Free shipping","On any set of four tyres"],[ShieldCheck,"Road-ready guarantee","Quality checked before dispatch"],[MapPin,"Local fitment","Book trusted New York installers"]].map(([Icon,title,copy])=>{const IconEl=Icon as typeof Truck;return <div key={String(title)} className="flex gap-4 px-5 py-8"><IconEl className="size-7 text-foreground"/><div><p className="font-bold">{String(title)}</p><p className="text-sm text-muted-foreground">{String(copy)}</p></div></div>})}</div></section>
  </main>;
}