import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CarFront, ChevronDown, Disc3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TyreFinder({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"vehicle" | "size">("vehicle");
  return (
    <div className={compact ? "border border-border bg-card" : "border border-border bg-card shadow-xl"}>
      <div className="flex border-b border-border">
        <Button variant="ghost" onClick={() => setMode("vehicle")} className={`h-12 flex-1 rounded-none border-b-2 ${mode === "vehicle" ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}>
          <CarFront /> By vehicle
        </Button>
        <Button variant="ghost" onClick={() => setMode("size")} className={`h-12 flex-1 rounded-none border-b-2 ${mode === "size" ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}>
          <Disc3 /> By tyre size
        </Button>
      </div>
      <div className={`grid gap-3 p-4 ${compact ? "md:grid-cols-4" : "md:grid-cols-[1fr_1fr_1fr_auto]"}`}>
        {(mode === "vehicle" ? ["Year", "Make", "Model"] : ["Width", "Aspect ratio", "Rim size"]).map((label, index) => (
          <label key={label} className="relative block">
            <span className="mb-1.5 block text-[11px] font-bold uppercase text-muted-foreground">{label}</span>
            <select aria-label={label} defaultValue="" className="h-11 w-full appearance-none border border-input bg-background px-3 pr-9 text-sm text-foreground outline-none focus:border-primary">
              <option value="" disabled>{mode === "vehicle" ? `Select ${label.toLowerCase()}` : index === 0 ? "245" : index === 1 ? "45" : "18"}</option>
              <option>{mode === "vehicle" ? ["2024", "Toyota", "Camry"][index] : ["245", "45", "18"][index]}</option>
              <option>{mode === "vehicle" ? ["2023", "Honda", "Accord"][index] : ["235", "55", "19"][index]}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute bottom-3.5 right-3 size-4 text-muted-foreground" />
          </label>
        ))}
        <Button onClick={() => navigate({ to: "/tyres" })} className="mt-auto h-11 rounded-none px-6 font-bold uppercase">
          <Search /> Find tyres
        </Button>
      </div>
    </div>
  );
}