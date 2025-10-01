"use client"
import { useEffect, useState } from "react";

type Blog = { id?: string; slug: string; title: string; content: string; published?: boolean };

export default function AdminBlogPage() {
  const [items, setItems] = useState<Blog[]>([]);
  const [form, setForm] = useState<Blog>({ slug: "", title: "", content: "" });

  const load = async () => {
    const res = await fetch("/api/blog");
    setItems(await res.json());
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/blog", { method: "POST", body: JSON.stringify(form) });
    setForm({ slug: "", title: "", content: "" });
    await load();
  };

  return (
    <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl px-7 py-6">
        <h1 className="text-[var(--primaryColor)] font-black">مدیریت بلاگ</h1>
      </div>
      <form onSubmit={submit} className="bg-white rounded-3xl p-5 mt-4 grid grid-cols-1 gap-3">
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="slug" value={form.slug} onChange={(e)=>setForm({...form, slug:e.target.value})} required />
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="عنوان" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} required />
        <textarea className="border border-gray-200 rounded-xl p-3 text-sm h-32" placeholder="متن" value={form.content} onChange={(e)=>setForm({...form, content:e.target.value})} required />
        <button className="bg-[var(--primaryColor)] text-white rounded-xl py-2.5 text-sm">ایجاد پست</button>
      </form>
      <div className="mt-4 bg-white rounded-3xl p-5">
        <h3>لیست پست‌ها</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="text-right py-2 px-3">عنوان</th>
                <th className="text-right py-2 px-3">Slug</th>
                <th className="text-right py-2 px-3">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="py-2 px-3">{p.title}</td>
                  <td className="py-2 px-3">{p.slug}</td>
                  <td className="py-2 px-3">{p.published ? 'منتشر شده' : 'پیش‌نویس'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


