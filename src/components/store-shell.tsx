import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, MapPin, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CartProvider, useCart } from "@/lib/cart";

export function StoreShell({ children }: { children: React.ReactNode }) {
  return <CartProvider><div className="min-h-screen bg-background text-foreground"><Header />{children}<Footer /></div></CartProvider>;
}

function Header() {
  const { count } = useCart();
  return (
    <>
      <div className="bg-secondary px-4 py-2 text-center text-xs font-bold text-secondary-foreground">FREE SHIPPING ON 4 TYRES · INSTALLATION FROM $24.99</div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6">
          <Link to="/" className="mr-auto flex items-center gap-2" aria-label="Orient Tech home">
            <span className="grid size-9 place-items-center bg-primary font-display text-xl font-black text-primary-foreground">O</span>
            <span className="font-display text-xl font-extrabold uppercase tracking-normal">Orient <span className="text-primary">Tech</span></span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            <Link to="/tyres" activeProps={{ className: "text-primary" }} className="text-sm font-bold uppercase hover:text-primary">Tyres</Link>
            {['Lubricants','Batteries','Wheels'].map((item) => <span key={item} className="cursor-default text-sm font-bold uppercase text-muted-foreground hover:text-foreground">{item}</span>)}
            <Link to="/fitment" activeProps={{ className: "text-primary" }} className="text-sm font-bold uppercase hover:text-primary">Fitment</Link>
          </nav>
          <div className="flex items-center gap-1.5 border-l border-border pl-3 sm:gap-2 sm:pl-5"><MapPin className="hidden size-4 text-primary sm:block"/><span aria-label="United States" className="relative h-3.5 w-5 shrink-0 overflow-hidden bg-[repeating-linear-gradient(to_bottom,var(--primary-foreground)_0_1.1px,var(--primary)_1.1px_2.2px)]"><span className="absolute left-0 top-0 h-2 w-2 bg-secondary" /></span><span className="text-[10px] font-bold sm:text-xs">USA · New York</span><ChevronDown className="hidden size-3 sm:block" /></div>
          <CartDrawer><Button variant="ghost" size="icon" className="relative" aria-label="Open cart"><ShoppingCart />{count > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{count}</span>}</Button></CartDrawer>
        </div>
        <nav className="flex h-11 items-center gap-6 overflow-x-auto border-t border-border px-4 lg:hidden">
          <Link to="/tyres" className="shrink-0 text-xs font-bold uppercase">Tyres</Link>
          {['Lubricants','Batteries','Wheels'].map((item) => <span key={item} className="shrink-0 text-xs font-bold uppercase text-muted-foreground">{item}</span>)}
          <Link to="/fitment" activeProps={{ className: "text-primary" }} className="shrink-0 text-xs font-bold uppercase">Fitment</Link>
        </nav>
      </header>
    </>
  );
}

function CartDrawer({ children }: { children: React.ReactNode }) {
  const { items, removeItem, clear } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [complete, setComplete] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.tyre.price * item.quantity, 0);
  return (
    <Sheet onOpenChange={(open) => { if (!open) { setCheckout(false); setComplete(false); } }}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col border-border sm:max-w-md">
        <SheetHeader><SheetTitle className="font-display text-2xl uppercase">{complete ? "Order received" : checkout ? "Checkout" : `Your cart (${items.length})`}</SheetTitle><SheetDescription>{complete ? "Your demo order has been prepared." : checkout ? "Enter your delivery and payment details." : "Review tyres and fitment bookings."}</SheetDescription></SheetHeader>
        {complete ? <div className="my-auto text-center"><div className="mx-auto grid size-16 place-items-center rounded-full bg-success text-success-foreground"><Check className="size-8" /></div><h3 className="mt-5 text-xl font-bold">Thanks for choosing Orient Tech</h3><p className="mt-2 text-sm text-muted-foreground">Confirmation #OT-48291 · No payment was processed.</p></div> : checkout ? (
          <form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); setComplete(true); clear(); }}>
            <div className="grid grid-cols-2 gap-3"><Input required placeholder="First name" /><Input required placeholder="Last name" /></div>
            <Input required type="email" placeholder="Email address" /><Input required placeholder="Street address" />
            <div className="grid grid-cols-2 gap-3"><Input required placeholder="City" /><Input required placeholder="ZIP code" /></div>
            <div className="border border-primary bg-primary/5 p-4"><p className="text-xs font-bold uppercase text-primary">Payment</p><Input required className="mt-3" placeholder="Card number" /><div className="mt-3 grid grid-cols-2 gap-3"><Input required placeholder="MM / YY" /><Input required placeholder="CVC" /></div></div>
            <Button type="submit" className="h-12 w-full rounded-none font-bold uppercase">Pay ${subtotal.toFixed(2)}</Button><p className="text-center text-xs text-muted-foreground">Demo checkout — no charge will be made.</p>
          </form>
        ) : items.length ? <><div className="mt-6 flex-1 space-y-4 overflow-auto">{items.map((item) => <div key={`${item.tyre.id}-${item.station}-${item.slot}`} className="flex gap-3 border-b border-border pb-4"><img src={item.tyre.image} alt="" width={80} height={80} className="size-20 object-cover" /><div className="min-w-0 flex-1"><p className="text-xs font-bold text-primary">{item.tyre.brand}</p><p className="truncate font-bold">{item.tyre.name}</p><p className="text-xs text-muted-foreground">Qty {item.quantity}{item.station ? ` · ${item.station}` : ""}</p><p className="mt-1 font-bold">${(item.tyre.price * item.quantity).toFixed(2)}</p></div><Button variant="ghost" size="icon" aria-label="Remove item" onClick={() => removeItem(item.tyre.id)}><Trash2 /></Button></div>)}</div><div className="border-t border-border pt-5"><div className="mb-4 flex justify-between text-lg font-bold"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div><Button onClick={() => setCheckout(true)} className="h-12 w-full rounded-none font-bold uppercase">Address & payment</Button></div></> : <div className="my-auto text-center text-muted-foreground"><ShoppingCart className="mx-auto mb-4 size-12" /><p>Your cart is empty.</p><SheetTrigger asChild><Button variant="link" asChild><Link to="/tyres">Shop tyres</Link></Button></SheetTrigger></div>}
      </SheetContent>
    </Sheet>
  );
}

function Footer() {
  return <footer className="border-t border-border bg-background"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4"><div className="md:col-span-2"><p className="font-display text-2xl font-black uppercase">Orient <span className="text-primary">Tech</span></p><p className="mt-3 max-w-sm text-sm text-muted-foreground">Tyres, wheels, batteries and lubricants selected for the roads you drive every day.</p></div><div><p className="mb-3 text-xs font-bold text-foreground">SHOP</p>{["Tyres","Wheels","Batteries"].map((item) => <p key={item} className="mb-2 text-sm text-muted-foreground">{item}</p>)}</div><div><p className="mb-3 text-xs font-bold text-foreground">SUPPORT</p><Link to="/fitment" className="mb-2 block text-sm text-muted-foreground hover:text-primary">Fitment centers</Link>{["Shipping","Contact us"].map((item) => <p key={item} className="mb-2 text-sm text-muted-foreground">{item}</p>)}</div></div><div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">© 2026 Orient Tech. Built for every road.</div></footer>;
}