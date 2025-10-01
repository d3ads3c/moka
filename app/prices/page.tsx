"use client"
import { useMemo, useState } from "react";

type PriceRow = { id: string; name: string; size: string; quantity: string; price: number; leadTimeDays: number };
type Category = { id: string; title: string; items: PriceRow[] };

const sampleData: Category[] = [
  {
    id: "business-card",
    title: "کارت ویزیت",
    items: [
      { id: "bc-1", name: "گلاسه 300 گرم (مات)", size: "5.5×8.5 سانتی‌متر", quantity: "100 عدد", price: 340_000, leadTimeDays: 3 },
      { id: "bc-2", name: "گلاسه 300 گرم (لمینت)", size: "5.5×8.5 سانتی‌متر", quantity: "100 عدد", price: 400_000, leadTimeDays: 4 },
      { id: "bc-3", name: "سلفون براق", size: "5.5×8.5 سانتی‌متر", quantity: "100 عدد", price: 370_000, leadTimeDays: 3 },
    ],
  },
  {
    id: "sticker",
    title: "لیبل/استیکر",
    items: [
      { id: "st-1", name: "شیشه‌ای شفاف", size: "A6", quantity: "50 عدد", price: 290_000, leadTimeDays: 2 },
      { id: "st-2", name: "اموال", size: "A6", quantity: "50 عدد", price: 320_000, leadTimeDays: 3 },
    ],
  },
  {
    id: "bag",
    title: "ساک دستی اسپان",
    items: [
      { id: "bg-1", name: "بگ اسپان 60 گرم", size: "35×45 سانتی‌متر", quantity: "100 عدد", price: 2_800_000, leadTimeDays: 5 },
    ],
  },
];

export default function PricesPage() {
  const categories = useMemo(() => sampleData, []);
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const current = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl px-7 py-6">
        <h1 className="text-[var(--primaryColor)] font-black">لیست قیمت</h1>
        <p className="text-sm text-gray-500 mt-1">قیمت‌های به‌روز به تفکیک دسته‌بندی</p>
      </div>

      {/* scrollable tabs */}
      <div className="mt-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`px-4 py-2 text-sm rounded-full border ${active === c.id ? "bg-[var(--primaryColor)] text-white border-[var(--primaryColor)]" : "bg-white text-gray-700 border-gray-200"}`}
              onClick={() => setActive(c.id)}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* table */}
      <div className="mt-4 bg-white rounded-3xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-right">
            <thead className="bg-gray-50 text-gray-700 text-xs alibaba-bold">
              <tr>
                <th className="px-4 py-3">نام</th>
                <th className="px-4 py-3">سایز</th>
                <th className="px-4 py-3">تعداد</th>
                <th className="px-4 py-3">قیمت</th>
                <th className="px-4 py-3">زمان تحویل</th>
              </tr>
            </thead>
            <tbody className="text-[13px] iranyekan-light">
              {current?.items?.map((row) => (
                <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{row.name}</td>
                  <td className="px-4 py-3 text-gray-700">{row.size}</td>
                  <td className="px-4 py-3 text-gray-700">{row.quantity}</td>
                  <td className="px-4 py-3 text-gray-900 iranyekan-bold">{row.price.toLocaleString("fa-IR")} تومان</td>
                  <td className="px-4 py-3 text-gray-700">{row.leadTimeDays} روز کاری</td>
                </tr>
              ))}
              {(!current || current.items.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500 text-sm">موردی ثبت نشده است.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


