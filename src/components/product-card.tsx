import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import type { Tyre } from "@/lib/store-data";

export function ProductCard({ tyre }: { tyre: Tyre }) {
  const { addItem } = useCart();
  return (
    <article className="group flex h-full flex-col border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link to="/tyres/$tyreId" params={{ tyreId: tyre.id }} className="relative block aspect-square overflow-hidden bg-product">
        {tyre.badge && <span className="absolute left-3 top-3 z-10 bg-primary px-2 py-1 text-[10px] font-extrabold text-primary-foreground">{tyre.badge}</span>}
        <img src={tyre.image} alt={`${tyre.brand} ${tyre.name} tyre and wheel`} width={1024} height={1024} loading="lazy" className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-extrabold text-primary">{tyre.brand}</p>
        <Link to="/tyres/$tyreId" params={{ tyreId: tyre.id }} className="mt-1 text-lg font-bold leading-tight hover:text-primary">{tyre.name}</Link>
        <p className="mt-1 text-sm text-muted-foreground">{tyre.size} · {tyre.type}</p>
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground"><Star className="size-3.5 fill-warning text-warning" /> <strong className="text-foreground">{tyre.rating}</strong> ({tyre.reviews})</div>
        <div className="mt-auto flex items-end justify-between pt-5">
          <div><span className="text-2xl font-extrabold">${tyre.price}</span><span className="text-xs text-muted-foreground"> / tyre</span>{tyre.originalPrice && <div className="text-xs text-muted-foreground line-through">${tyre.originalPrice}</div>}</div>
          <Button size="icon" aria-label={`Add ${tyre.name} to cart`} onClick={() => addItem(tyre)} className="rounded-none"><ShoppingCart /></Button>
        </div>
      </div>
    </article>
  );
}