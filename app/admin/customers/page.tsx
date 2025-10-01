"use client"
import { useEffect, useState } from "react";

type Customer = { id?: string; email: string; name: string; phone?: string };

export default function AdminCustomersPage() {
  const [items, setItems] = useState<Customer[]>([]);
  const [form, setForm] = useState<Customer>({ email: "", name: "", phone: "" });

  const load = async () => {
    const res = await fetch("/api/customers");
    setItems(await res.json());
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/customers", { method: "POST", body: JSON.stringify(form) });
    setForm({ email: "", name: "", phone: "" });
    await load();
  };

  return (
    <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl px-7 py-6">
        <h1 className="text-[var(--primaryColor)] font-black">مدیریت مشتریان</h1>
      </div>
      <form onSubmit={submit} className="bg-white rounded-3xl p-5 mt-4 grid grid-cols-1 gap-3">
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="ایمیل" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="نام" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="تلفن" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
        <button className="bg-[var(--primaryColor)] text-white rounded-xl py-2.5 text-sm">افزودن مشتری</button>
      </form>
      <div className="mt-4 bg-white rounded-3xl p-5">
        <h3>لیست مشتریان</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {items.map(c => (
            <li key={c.id} className="flex items-center justify-between border border-gray-100 rounded-xl px-3 py-2">
              <span>{c.name}</span>
              <span className="text-gray-500">{c.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


