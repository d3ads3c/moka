"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = { id: string; slug: string; title: string; price: number; imageUrl?: string | null };

export default function ReadyProductsSlider() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/products?ready=1", { cache: "no-store" });
      const data: Product[] = await res.json();
      setItems(data);
    })();
  }, []);

  if (!items.length) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[var(--primaryColor)]">محصولات آماده فروش</h2>
        <Link href="/shop" className="text-sm text-[var(--primaryColor)]">مشاهده همه</Link>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-4 snap-x snap-mandatory">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="min-w-[220px] max-w-[220px] bg-white rounded-2xl border border-gray-100 snap-start overflow-hidden hover:shadow-sm"
            >
              <div
                className="w-full h-36 bg-center bg-cover"
                style={{ backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : "url('/img/services/businesscard.jpg')" }}
              />
              <div className="p-3">
                <h3 className="text-sm line-clamp-1">{p.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{p.price.toLocaleString()} تومان</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


