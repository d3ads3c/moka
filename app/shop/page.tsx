import Link from "next/link";
import { headers } from "next/headers";

async function getProducts(q?: string, category?: string) {
  const h = headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const base = `${proto}://${host}`;
  const params = new URLSearchParams({ ready: "1" });
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const res = await fetch(`${base}/api/products?${params.toString()}`, { cache: 'no-store' });
  const data = await res.json();
  return data as { id: string; slug: string; title: string; price: number; imageUrl?: string | null }[];
}

export default async function ShopPage({ searchParams }: { searchParams?: { q?: string; category?: string } }) {
  const items = await getProducts(searchParams?.q, searchParams?.category);
  return (
    <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl px-7 py-14">
        <h1 className="text-[var(--primaryColor)] font-black">فروشگاه</h1>
        <p className="text-sm text-gray-500 mt-3">محصولات آماده فروش</p>
      </div>
      <form className="mt-4 bg-white rounded-2xl p-3 grid grid-cols-2 md:grid-cols-6 gap-2" action="/shop" method="get">
        <input name="q" defaultValue={searchParams?.q} placeholder="جستجو..." className="col-span-2 md:col-span-4 border border-gray-200 rounded-xl px-3 py-2 text-sm" />
        <select name="category" defaultValue={searchParams?.category} className="col-span-1 border border-gray-200 rounded-xl px-3 py-2 text-sm">
          <option value="">همه دسته‌ها</option>
          <option value="کارت ویزیت">کارت ویزیت</option>
          <option value="لیبل">لیبل</option>
          <option value="ساک دستی">ساک دستی</option>
        </select>
        <button className="bg-[var(--primaryColor)] text-white rounded-xl px-4 py-2 text-sm">اعمال</button>
      </form>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((p) => (
          <Link key={p.id} href={`/shop/${p.slug}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm">
            <div className="w-full h-36 md:h-44 bg-center bg-cover" style={{ backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : "url('/img/services/businesscard.jpg')" }} />
            <div className="p-3">
              <h3 className="text-sm line-clamp-1">{p.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{p.price.toLocaleString()} تومان</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


