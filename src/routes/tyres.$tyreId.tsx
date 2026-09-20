import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Gauge,
  Headphones,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { tyres } from "@/lib/store-data";

export const Route = createFileRoute("/tyres/$tyreId")({
  loader: ({ params }) => {
    const tyre = tyres.find((item) => item.id === params.tyreId);
    if (!tyre) throw notFound();
    return tyre;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.brand} ${loaderData.name} — Orient Tech`
          : "Tyre Not Found — Orient Tech",
      },
      {
        name: "description",
        content: loaderData
          ? `Shop the ${loaderData.name} ${loaderData.size} and book nearby professional fitment.`
          : "This tyre is unavailable.",
      },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.brand} ${loaderData.name}` : "Tyre Not Found",
      },
      {
        property: "og:description",
        content: "Buy online and reserve professional tyre installation near you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

const stations = [
  {
    name: "Orient Auto Center — Downtown",
    distance: "2.4 mi",
    address: "1420 Market Street",
    rating: "4.9",
    next: "Today",
  },
  {
    name: "QuickFit Garage — Westside",
    distance: "4.1 mi",
    address: "825 Lincoln Avenue",
    rating: "4.8",
    next: "Tomorrow",
  },
  {
    name: "RoadReady Service Center",
    distance: "6.7 mi",
    address: "3100 North Harbor Blvd",
    rating: "4.7",
    next: "Tomorrow",
  },
];

const slots = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"];

const performanceDetails = {
  title: "Built for everyday confidence",
  copy: "A dependable road tyre tuned for predictable handling, low noise and confident traction through changing city conditions.",
  points: [
    "Wide grooves help clear water",
    "Optimized tread pattern reduces road noise",
    "Stable shoulder blocks support cornering",
  ],
};

const tyreSpecifications = {
  title: "Tyre specifications",
  specs: [
    ["Size", "245/45R18"],
    ["Load index", "96"],
    ["Speed rating", "V"],
    ["Season", "All-season"],
    ["Sidewall", "Black"],
    ["Warranty", "60,000 miles"],
  ],
};

const valueProps = [
  { icon: Truck, title: "Free delivery", copy: "Free shipping on a set of four tyres." },
  { icon: Gauge, title: "Expert fitment", copy: "Installed and balanced by local specialists." },
  { icon: RotateCcw, title: "Easy returns", copy: "Straightforward 30-day return support." },
  {
    icon: Headphones,
    title: "Human support",
    copy: "Help choosing the right tyre for your vehicle.",
  },
];

function ProductPage() {
  const tyre = Route.useLoaderData();
  const { addItem } = useCart();
  const [qty, setQty] = useState(4);
  const [delivery, setDelivery] = useState<"fitment" | "address" | "doorstep">("fitment");
  const [station, setStation] = useState("Orient Auto Center — Downtown");
  const [slot, setSlot] = useState("9:00 AM");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [added, setAdded] = useState(false);
  const [zipCode, setZipCode] = useState("30002");
  const [zipInput, setZipInput] = useState("30002");
  const [zipSaved, setZipSaved] = useState(false);
  const recommendations = tyres.filter((item) => item.id !== tyre.id).slice(0, 4);

  const handleZipSubmit = () => {
    const clean = zipInput.trim();
    if (clean.length === 5) {
      setZipCode(clean);
      setZipSaved(true);
      setTimeout(() => setZipSaved(false), 2000);
    }
  };

  const addToCart = () => {
    if (delivery === "fitment" && !bookingConfirmed) {
      setBookingOpen(true);
      return;
    }
    addItem(
      tyre,
      qty,
      delivery === "fitment"
        ? `${station} (ZIP ${zipCode})`
        : delivery === "doorstep"
          ? `Doorstep Service (ZIP ${zipCode})`
          : undefined,
      delivery === "fitment" ? slot : undefined,
    );
    setAdded(true);
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/tyres" className="hover:text-primary">
            Tyres
          </Link>
          <ChevronRight className="size-3" />
          <span>{tyre.brand}</span>
          <ChevronRight className="size-3" />
          <span className="truncate">{tyre.name}</span>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="relative aspect-square max-h-[620px] overflow-hidden bg-product">
            {tyre.badge && (
              <span className="absolute left-4 top-4 z-10 bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                {tyre.badge}
              </span>
            )}
            <img
              src={tyre.image}
              alt={`${tyre.brand} ${tyre.name} tyre and wheel`}
              width={1024}
              height={1024}
              className="h-full w-full object-contain p-6"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["60K mile warranty", "All-season grip", "Quiet ride"].map((value) => (
              <div key={value} className="border border-border p-3 text-center text-xs font-bold">
                <Check className="mx-auto mb-1 size-4 text-primary" />
                {value}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pt-4">
          <p className="text-sm font-black text-primary">{tyre.brand}</p>
          <h1 className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
            {tyre.name}
          </h1>
          <p className="mt-3 text-xl text-muted-foreground">
            {tyre.size} · {tyre.type}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Star className="size-4 fill-warning text-warning" />
            <strong>{tyre.rating}</strong>
            <span className="text-muted-foreground">{tyre.reviews.toLocaleString()} reviews</span>
          </div>
          <div className="mt-7 border-y border-border py-6">
            <span className="text-4xl font-black">${tyre.price}</span>
            <span className="text-muted-foreground"> / tyre</span>
            {tyre.originalPrice && (
              <span className="ml-3 text-muted-foreground line-through">${tyre.originalPrice}</span>
            )}
            <p className="mt-2 text-sm text-success">In stock · Ships within 1 business day</p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Quantity</p>
              <p className="text-xs text-muted-foreground">Most drivers replace all four</p>
            </div>
            <div className="flex border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none"
                aria-label="Decrease quantity"
                onClick={() => setQty((current) => Math.max(1, current - 1))}
              >
                <Minus />
              </Button>
              <span className="grid w-10 place-items-center font-bold">{qty}</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none"
                aria-label="Increase quantity"
                onClick={() => setQty((current) => Math.min(8, current + 1))}
              >
                <Plus />
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-4 border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-xl font-bold uppercase">Choose delivery</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-primary" />
                <span>
                  ZIP: <strong className="text-foreground">{zipCode}</strong>
                </span>
              </div>
            </div>

            {/* ZIP code location checker */}
            <div className="border border-border bg-muted/40 p-3.5">
              <label
                htmlFor="zipcode-input"
                className="mb-2 block text-xs font-bold uppercase text-muted-foreground"
              >
                Check delivery & fitment in your area
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="zipcode-input"
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    placeholder="Enter 5-digit ZIP code"
                    maxLength={5}
                    className="h-10 rounded-none bg-background pl-9 text-sm font-semibold tracking-wider"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleZipSubmit();
                      }
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleZipSubmit}
                  className="h-10 rounded-none border-foreground px-4 text-xs font-bold uppercase"
                >
                  {zipSaved ? "Saved" : "Apply"}
                </Button>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-success">
                <Check className="size-3.5 shrink-0" />
                <span>Available for workshop fitment, shipping & mobile vans in {zipCode}</span>
              </p>
            </div>

            <div className="space-y-3">
              <label
                className={`flex cursor-pointer gap-3 border p-4 ${delivery === "fitment" ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery === "fitment"}
                  onChange={() => setDelivery("fitment")}
                  className="accent-primary"
                />
                <span>
                  <span className="flex flex-wrap items-center gap-2">
                    <strong className="block">Ship to fitment station</strong>
                    <span className="rounded-none border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-primary">
                      10 options available
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Professional installation from $24.99 / tyre near {zipCode}
                  </span>
                </span>
              </label>
              <label
                className={`flex cursor-pointer gap-3 border p-4 ${delivery === "address" ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery === "address"}
                  onChange={() => setDelivery("address")}
                  className="accent-primary"
                />
                <span>
                  <strong className="block">Ship to my address</strong>
                  <span className="text-xs text-muted-foreground">
                    Free shipping to {zipCode} · Ships within 1 business day
                  </span>
                </span>
              </label>
              <label
                className={`flex cursor-pointer gap-3 border p-4 ${delivery === "doorstep" ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery === "doorstep"}
                  onChange={() => setDelivery("doorstep")}
                  className="accent-primary"
                />
                <span>
                  <strong className="block">Doorstep tire replacement service</strong>
                  <span className="text-xs text-muted-foreground">
                    Tires fitted right at your location in {zipCode}
                  </span>
                </span>
              </label>
            </div>

            {delivery === "fitment" && (
              <Sheet open={bookingOpen} onOpenChange={setBookingOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-none border-foreground font-bold uppercase"
                  >
                    <MapPin />{" "}
                    {bookingConfirmed ? "Change fitment booking" : "Show nearby fitment stations"}
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex w-full flex-col p-0 sm:max-w-xl">
                  <SheetHeader className="border-b border-border px-5 py-6 pr-12 sm:px-7">
                    <p className="text-xs font-extrabold uppercase text-primary">
                      Nearby {zipCode} · New York
                    </p>
                    <SheetTitle className="font-display text-3xl font-black uppercase">
                      Choose your fitment
                    </SheetTitle>
                    <SheetDescription>
                      Select a station and an available appointment time.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
                    <p className="mb-3 text-xs font-extrabold uppercase text-muted-foreground">
                      1 · Select a station
                    </p>
                    <div className="space-y-3">
                      {stations.map((item) => (
                        <Button
                          key={item.name}
                          variant="ghost"
                          onClick={() => {
                            setStation(item.name);
                            setBookingConfirmed(false);
                          }}
                          className={`h-auto w-full justify-start whitespace-normal rounded-none border p-4 text-left ${station === item.name ? "border-primary bg-primary/5" : "border-border bg-card"}`}
                        >
                          <MapPin className="mt-1 size-5 shrink-0 text-primary" />
                          <span className="min-w-0 flex-1">
                            <strong className="block">{item.name}</strong>
                            <span className="block text-sm font-normal text-muted-foreground">
                              {item.address} · ★ {item.rating}
                            </span>
                            <span className="mt-1 block text-xs font-bold text-success">
                              Next opening: {item.next}
                            </span>
                          </span>
                          <span className="text-sm font-bold">{item.distance}</span>
                        </Button>
                      ))}
                    </div>
                    <p className="mb-3 mt-7 text-xs font-extrabold uppercase text-muted-foreground">
                      2 · Pick a time · Friday, Sep 18
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {slots.map((time) => (
                        <Button
                          key={time}
                          variant={slot === time ? "default" : "outline"}
                          onClick={() => {
                            setSlot(time);
                            setBookingConfirmed(false);
                          }}
                          className="rounded-none"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <SheetFooter className="border-t border-border bg-background p-5 sm:block sm:p-7">
                    <div className="mb-4 flex items-start gap-3 text-sm">
                      <CalendarDays className="mt-0.5 size-5 text-primary" />
                      <div>
                        <strong>{station}</strong>
                        <p className="text-muted-foreground">Friday, Sep 18 at {slot}</p>
                      </div>
                    </div>
                    <SheetClose asChild>
                      <Button
                        className="h-12 w-full rounded-none font-bold uppercase"
                        onClick={() => setBookingConfirmed(true)}
                      >
                        <Check /> Confirm fitment slot
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            )}
            {delivery === "fitment" && bookingConfirmed && (
              <p className="flex items-start gap-2 text-sm text-success">
                <Check className="mt-0.5 size-4 shrink-0" />
                <span>
                  {station}
                  <br />
                  Friday, Sep 18 at {slot}
                </span>
              </p>
            )}
          </div>

          <Button
            onClick={addToCart}
            className="mt-5 h-14 w-full rounded-none text-base font-extrabold uppercase"
          >
            {added ? (
              <>
                <Check />
                Added to cart
              </>
            ) : delivery === "fitment" && !bookingConfirmed ? (
              "Choose fitment & add to cart"
            ) : (
              `Add ${qty} to cart · $${(tyre.price * qty).toFixed(2)}`
            )}
          </Button>
          <div className="mt-5 flex justify-around text-xs text-muted-foreground">
            <span className="flex gap-2">
              <Truck className="size-4" />
              Free delivery
            </span>
            <span className="flex gap-2">
              <ShieldCheck className="size-4" />
              Secure checkout
            </span>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-extrabold uppercase text-primary">Product details</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl font-black uppercase sm:text-5xl">
            Performance you can rely on, mile after mile
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold">{performanceDetails.title}</h3>
              <p className="mt-3 max-w-xl text-muted-foreground">{performanceDetails.copy}</p>
              <ul className="mt-6 space-y-3">
                {performanceDetails.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm">
                    <Check className="size-5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">{tyreSpecifications.title}</h3>
              <dl className="mt-4 grid grid-cols-2 border-l border-t border-border">
                {tyreSpecifications.specs.map(([label, value]) => (
                  <div key={label} className="border-b border-r border-border bg-background p-4">
                    <dt className="text-xs uppercase text-muted-foreground">{label}</dt>
                    <dd className="mt-1 font-bold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-10 text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {valueProps.map((item) => (
            <div key={item.title} className="flex gap-4">
              <item.icon className="size-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-secondary-foreground/70">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase text-primary">Keep comparing</p>
              <h2 className="mt-2 font-display text-4xl font-black uppercase sm:text-5xl">
                Other tyres you may like
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden rounded-none sm:flex">
              <Link to="/tyres">View all tyres</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((item) => (
              <ProductCard key={item.id} tyre={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
