import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { TyreFinder } from "@/components/tyre-finder";
import { tyres } from "@/lib/store-data";
import stackedTyresBanner from "@/assets/stacked-tyres-banner.jpg";

export const Route = createFileRoute("/tyres/")({
  head: () => ({ meta: [
    { title: "Shop Tyres — Orient Tech" }, { name: "description", content: "Browse all-season, touring, SUV and all-terrain tyres in popular sizes." },
    { property: "og:title", content: "Shop Tyres — Orient Tech" }, { property: "og:description", content: "Compare leading tyre brands and book local installation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: TyresPage,
});

function TyresPage() {
  const [query,setQuery]=useState(""); const [type,setType]=useState("All"); const [sort,setSort]=useState("featured");
  const results=useMemo(()=>tyres.filter(t=>(type==="All"||t.type===type)&&`${t.brand} ${t.name} ${t.size}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==="low"?a.price-b.price:sort==="high"?b.price-a.price:b.rating-a.rating),[query,type,sort]);
  return <main><section className="relative min-h-[700px] overflow-hidden border-b border-border md:min-h-[560px]"><img src={stackedTyresBanner} alt="Four new tyres stacked and ready to fit" width={1920} height={900} className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"/><div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--background)_95%,transparent)_0%,color-mix(in_oklab,var(--background)_82%,transparent)_43%,transparent_70%)]"/><div className="relative mx-auto flex min-h-[700px] max-w-7xl flex-col justify-start px-4 pb-[430px] pt-14 sm:px-6 md:min-h-[560px] md:justify-center md:pb-52"><div><p className="text-xs font-extrabold uppercase text-primary">Shop tyres</p><h1 className="mt-2 max-w-3xl font-display text-5xl font-black uppercase sm:text-7xl">Find your perfect fit</h1><p className="mt-3 text-muted-foreground">Trusted brands. Clear prices. Expert local installation.</p></div><div className="absolute inset-x-4 bottom-10 z-10 sm:inset-x-6"><TyreFinder compact /></div></div></section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end"><label className="relative flex-1"><span className="mb-2 block text-xs font-bold uppercase">Search</span><Search className="absolute bottom-3 left-3 size-4 text-muted-foreground"/><Input value={query} onChange={e=>setQuery(e.target.value)} className="h-11 rounded-none pl-10" placeholder="Brand, model or size"/></label><label><span className="mb-2 block text-xs font-bold uppercase">Tyre type</span><select value={type} onChange={e=>setType(e.target.value)} className="h-11 min-w-48 border border-input bg-background px-3"><option>All</option>{[...new Set(tyres.map(t=>t.type))].map(v=><option key={v}>{v}</option>)}</select></label><label><span className="mb-2 block text-xs font-bold uppercase">Sort by</span><select value={sort} onChange={e=>setSort(e.target.value)} className="h-11 min-w-48 border border-input bg-background px-3"><option value="featured">Top rated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><div className="mb-5 flex items-center justify-between"><p className="font-bold">{results.length} tyres</p><p className="flex items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontal className="size-4"/>Prices shown per tyre</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map(t=><ProductCard key={t.id} tyre={t}/>)}</div></section></main>;
}