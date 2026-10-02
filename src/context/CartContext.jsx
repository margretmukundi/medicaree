import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const KEY = 'medicare_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ } }, [items]);

  const add = (product, qty = 1) => setItems(l => l.some(i => i.id === product.id)
    ? l.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
    : [...l, { id: product.id, name: product.name, price: product.price, image_url: product.image_url, requires_prescription: !!product.requires_prescription, qty }]);
  const setQty = (id, qty) => setItems(l => qty < 1 ? l.filter(i => i.id !== id) : l.map(i => i.id === id ? { ...i, qty } : i));
  const remove = id => setItems(l => l.filter(i => i.id !== id));
  const clear = () => setItems([]);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);

  return <CartContext.Provider value={{ items, add, setQty, remove, clear, count, total }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
