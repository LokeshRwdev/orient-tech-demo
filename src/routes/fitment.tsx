import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Gauge,
  MapPin,
  Navigation,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import fitmentImage from "@/assets/fitment-station.jpg";
import usaServiceMap from "@/assets/usa-service-map.jpg";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { featuredTyres } from "@/lib/store-data";

export const Route = createFileRoute("/fitment")({
  head: () => ({
    meta: [
      { title: "Tyre Fitment Centers in New York — Orient Tech" },
      { name: "description", content: "Find an Orient Tech fitment center in New York and reserve professional tyre installation online." },
      { property: "og:title", content: "Tyre Fitment Centers in New York — Orient Tech" },
      { property: "og:description", content: "Choose a nearby workshop, service, date, and appointment time for professional tyre installation." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/fitment" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/fitment" }],
  }),
  component: FitmentPage,
});

const defaultStation = { name: "Orient Auto Center — Downtown", distance: "2.4 mi", address: "1420 Market Street, New York", rating: "4.9", reviews: "382", status: "Open until 7:00 PM" };

const stations = [
  defaultStation,
  { name: "QuickFit Garage — Westside", distance: "4.1 mi", address: "825 Lincoln Avenue, New York", rating: "4.8", reviews: "246", status: "Open until 6:30 PM" },
  { name: "RoadReady Service Center", distance: "6.7 mi", address: "3100 North Harbor Blvd, New York", rating: "4.7", reviews: "198", status: "Open until 7:00 PM" },
];

const services = [
  { icon: Wrench, name: "Tyre fitting", copy: "Professional mounting and installation for passenger vehicles and SUVs.", time: "45–60 min" },
  { icon: Gauge, name: "Wheel balancing", copy: "Precision balancing for a smoother ride and more even tyre wear.", time: "30–45 min" },
  { icon: Navigation, name: "Wheel alignment", copy: "Steering and suspension alignment checked to manufacturer guidance.", time: "45–60 min" },
  { icon: Sparkles, name: "Road-ready check", copy: "Tread, pressure, valves, and final torque inspected before departure.", time: "Included" },
];

const dates = ["Fri, Sep 18", "Sat, Sep 19", "Mon, Sep 21"];
const slots = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"];

function FitmentPage() {
  const [station, setStation] = useState(defaultStation.name);
  const [service, setService] = useState("Tyre fitting");
  const [date, setDate] = useState(dates[0]);
  const [slot, setSlot] = useState(slots[0]);
  const [confirmed, setConfirmed] = useState(false);
  const selectedStation = stations.find((item) => item.name === station) ?? defaultStation;

  return (
    <main>
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-5 text-xs text-muted-foreground sm:px-6">
        <Link to="/" className="hover:text-primary">Home</Link><ChevronRight className="size-3" /><span>Fitment centers</span>
      </div>

      <section className="relative min-h-[580px] overflow-hidden bg-secondary text-secondary-foreground">
        <img src={fitmentImage} alt="Orient Tech technician installing a wheel" width={1200} height={800} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--secondary)_94%,transparent)_0%,color-mix(in_oklab,var(--secondary)_74%,transparent)_52%,color-mix(in_oklab,var(--secondary)_22%,transparent)_100%)]" />
        <div className="relative mx-auto flex min-h-[580px] max-w-7xl items-center px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase text-primary">New York fitment network</p>
            <h1 className="mt-3 font-display text-5xl font-black uppercase leading-none sm:text-7xl">Fitted right.<br />Ready for the road.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary-foreground/80 sm:text-lg">Choose a nearby workshop and reserve a convenient time for professional tyre fitting, balancing, and inspection.</p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-2"><Star className="size-4 fill-warning text-warning" /><strong>4.9</strong> from local drivers</span>
              <span className="flex items-center gap-2"><Clock3 className="size-4 text-primary" />Open until 7:00 PM</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-none px-6 font-bold uppercase"><a href="#book">Book appointment <ArrowRight /></a></Button>
              <Button asChild variant="outline" className="h-12 rounded-none border-secondary-foreground/40 bg-secondary/20 px-6 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"><a href="#centers"><MapPin /> Find a center</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="centers" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="text-xs font-bold uppercase text-primary">Nearby locations</p><h2 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">Choose your center</h2><p className="mt-4 max-w-md text-muted-foreground">Every location is quality checked and equipped for tyre mounting, balancing, and final inspection.</p></div>
          <div className="space-y-3">{stations.map((item) => <Button key={item.name} variant="ghost" onClick={() => { setStation(item.name); setConfirmed(false); }} className={`h-auto w-full justify-start whitespace-normal rounded-none border p-5 text-left ${station === item.name ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
            <MapPin className="mt-1 size-5 shrink-0 text-primary" /><span className="min-w-0 flex-1"><strong className="block text-base">{item.name}</strong><span className="mt-1 block text-sm font-normal text-muted-foreground">{item.address}</span><span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold"><span className="text-success">{item.status}</span><span>★ {item.rating} ({item.reviews})</span></span></span><span className="text-sm font-bold">{item.distance}</span>
          </Button>)}</div>
        </div>
      </section>

      <section id="book" className="border-y border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-9"><p className="text-xs font-bold uppercase text-primary">Reserve online</p><h2 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">Book your fitment slot</h2></div>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.48fr]">
            <div className="border border-border bg-background p-5 sm:p-8">
              <p className="text-xs font-extrabold uppercase text-muted-foreground">1 · Select a service</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">{services.map((item) => <Button key={item.name} variant="ghost" onClick={() => { setService(item.name); setConfirmed(false); }} className={`h-auto justify-start whitespace-normal rounded-none border p-4 text-left ${service === item.name ? "border-primary bg-primary/5" : "border-border"}`}><item.icon className="size-5 shrink-0 text-primary" /><span><strong className="block">{item.name}</strong><span className="text-xs font-normal text-muted-foreground">{item.time}</span></span></Button>)}</div>
              <p className="mt-8 text-xs font-extrabold uppercase text-muted-foreground">2 · Select a date</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">{dates.map((item) => <Button key={item} variant={date === item ? "default" : "outline"} className="rounded-none" onClick={() => { setDate(item); setConfirmed(false); }}>{item}</Button>)}</div>
              <p className="mt-8 text-xs font-extrabold uppercase text-muted-foreground">3 · Select a time</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{slots.map((item) => <Button key={item} variant={slot === item ? "default" : "outline"} className="rounded-none" onClick={() => { setSlot(item); setConfirmed(false); }}>{item}</Button>)}</div>
            </div>
            <aside className="border border-border bg-background p-6 lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-extrabold uppercase text-primary">Appointment summary</p><h3 className="mt-3 font-display text-2xl font-black uppercase">{selectedStation.name}</h3><p className="mt-2 text-sm text-muted-foreground">{selectedStation.address}</p>
              <dl className="mt-6 space-y-4 border-y border-border py-5 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Service</dt><dd className="text-right font-bold">{service}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Date</dt><dd className="font-bold">{date}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Time</dt><dd className="font-bold">{slot}</dd></div></dl>
              <Button className="mt-6 h-12 w-full rounded-none font-bold uppercase" onClick={() => setConfirmed(true)}>{confirmed ? <><Check /> Appointment confirmed</> : <><CalendarDays /> Confirm appointment</>}</Button>
              {confirmed && <p className="mt-4 flex gap-2 text-sm text-success"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />Your demo appointment has been reserved.</p>}
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="mb-8"><p className="text-xs font-bold uppercase text-muted-foreground">Workshop services</p><h2 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">Everything for a confident drive</h2></div><div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{services.map((item) => <article key={item.name} className="bg-background p-6"><item.icon className="size-7 text-primary" /><h3 className="mt-6 text-lg font-bold">{item.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.copy}</p><p className="mt-5 text-xs font-bold uppercase">{item.time}</p></article>)}</div></section>

      <section className="grid bg-secondary text-secondary-foreground lg:grid-cols-2"><div className="relative min-h-[440px]"><img src={usaServiceMap} alt="Orient Tech service network across the United States" width={1600} height={900} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90" /><span className="absolute left-[72%] top-[37%] grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg"><MapPin className="size-5" /></span></div><div className="p-8 sm:p-14 lg:p-16"><p className="text-xs font-bold uppercase text-primary">Center information</p><h2 className="mt-3 font-display text-4xl font-black uppercase sm:text-5xl">Orient Auto Center — Downtown</h2><p className="mt-4 text-secondary-foreground/70">1420 Market Street, New York<br />2.4 miles from your selected city</p><div className="mt-8 grid gap-3 text-sm sm:grid-cols-2">{["Mon–Fri · 8 AM–7 PM","Saturday · 9 AM–6 PM","Sunday · 10 AM–4 PM","Free on-site parking"].map((item) => <p key={item} className="flex gap-2"><Check className="size-4 shrink-0 text-primary" />{item}</p>)}</div><Button asChild variant="outline" className="mt-8 rounded-none border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"><a href="https://www.google.com/maps/search/tyre+fitment+New+York" target="_blank" rel="noreferrer"><Navigation /> Get directions</a></Button></div></section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr]"><div><p className="text-xs font-bold uppercase text-primary">Customer reviews</p><h2 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">Trusted by New York drivers</h2><div className="mt-5 flex items-center gap-3"><span className="font-display text-5xl font-black">4.9</span><span><span className="flex gap-1 text-warning">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-warning" />)}</span><span className="mt-1 block text-xs text-muted-foreground">382 verified reviews</span></span></div></div><div className="grid gap-4 md:grid-cols-2">{[
        ["Booking online saved me time, and the team had the car ready exactly when promised.", "Daniel R.", "Downtown customer"],
        ["Clear pricing, careful fitting, and a final pressure check before I left. Excellent service.", "Maya T.", "Verified customer"],
      ].map(([quote, name, detail]) => <figure key={name} className="border border-border bg-surface p-7"><div className="flex gap-1 text-warning">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-warning" />)}</div><blockquote className="mt-5 text-lg leading-relaxed">“{quote}”</blockquote><figcaption className="mt-6 text-sm"><strong>{name}</strong><p className="text-muted-foreground">{detail}</p></figcaption></figure>)}</div></div></section>

      <section className="bg-surface py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase text-primary">Ready to fit</p><h2 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">Popular tyres near you</h2></div><Button asChild variant="outline" className="hidden rounded-none sm:flex"><Link to="/tyres">Shop all tyres</Link></Button></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featuredTyres.map((tyre) => <ProductCard key={tyre.id} tyre={tyre} />)}</div></div></section>

      <section className="border-y border-border bg-background"><div className="mx-auto grid max-w-7xl divide-y divide-border px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0">{[[ShieldCheck, "Verified technicians", "Every center is quality checked"], [CalendarDays, "Easy booking", "Choose a center, date, and time"], [CheckCircle2, "Road-ready inspection", "Final checks before you leave"]].map(([Icon, title, copy]) => { const IconEl = Icon as typeof ShieldCheck; return <div key={String(title)} className="flex gap-4 px-5 py-8"><IconEl className="size-7 text-primary" /><div><p className="font-bold">{String(title)}</p><p className="text-sm text-muted-foreground">{String(copy)}</p></div></div>; })}</div></section>
    </main>
  );
}