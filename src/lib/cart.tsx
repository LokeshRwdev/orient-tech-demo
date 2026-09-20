import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Tyre } from "./store-data";

type CartItem = { tyre: Tyre; quantity: number; station: string | undefined; slot: string | undefined };
type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (tyre: Tyre, quantity?: number, station?: string, slot?: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const value = useMemo(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    addItem: (tyre: Tyre, quantity = 1, station?: string, slot?: string) => setItems((current) => {
      const existing = current.find((item) => item.tyre.id === tyre.id && item.station === station && item.slot === slot);
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      return [...current, { tyre, quantity, station, slot }];
    }),
    removeItem: (id: string) => setItems((current) => current.filter((item) => item.tyre.id !== id)),
    clear: () => setItems([]),
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}