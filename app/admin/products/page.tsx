"use client"
import { useEffect, useState } from "react";

type Product = {
  id?: string;
  slug: string;
  title: string;
  price: number;
  imageUrl?: string;
  isReady?: boolean;
};

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ slug: "", title: "", price: 0, imageUrl: "", isReady: false });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Product>({ slug: "", title: "", price: 0, imageUrl: "", isReady: false });

  const load = async () => {
    const res = await fetch("/api/products");
    setItems(await res.json());
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/products", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ slug: "", title: "", price: 0, imageUrl: "", isReady: false });
    await load();
    setLoading(false);
  };

  const beginEdit = (p: Product & { id: string }) => {
    setEditId(p.id);
    setEditForm({ slug: p.slug, title: p.title, price: p.price, imageUrl: p.imageUrl || "", isReady: !!p.isReady });
  };

  const saveEdit = async () => {
    if (!editId) return;
    await fetch(`/api/products/${editId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) });
    setEditId(null);
    await load();
  };

  const deleteItem = async (id?: string) => {
    if (!id) return;
    if (!confirm('حذف این مورد؟')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl px-7 py-6">
        <h1 className="text-[var(--primaryColor)] font-black">مدیریت محصولات</h1>
      </div>

      <form onSubmit={submit} className="bg-white rounded-3xl p-5 mt-4 grid grid-cols-1 gap-3">
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="slug" value={form.slug} onChange={(e)=>setForm({...form, slug:e.target.value})} required />
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="عنوان" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} required />
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="قیمت" type="number" value={form.price} onChange={(e)=>setForm({...form, price:parseInt(e.target.value||"0")})} required />
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="تصویر" value={form.imageUrl} onChange={(e)=>setForm({...form, imageUrl:e.target.value})} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.isReady} onChange={(e)=>setForm({...form, isReady:e.target.checked})} /> محصول آماده فروش</label>
        <button disabled={loading} className="bg-[var(--primaryColor)] text-white rounded-xl py-2.5 text-sm">{loading?"در حال ذخیره...":"ایجاد محصول"}</button>
      </form>

      <div className="mt-4 bg-white rounded-3xl p-5">
        <h3>لیست محصولات</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="text-right py-2 px-3">عنوان</th>
                <th className="text-right py-2 px-3">Slug</th>
                <th className="text-right py-2 px-3">قیمت</th>
                <th className="text-right py-2 px-3">آماده فروش</th>
                <th className="text-right py-2 px-3">اقدامات</th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <>
                  <tr key={p.id} className="border-t">
                    <td className="py-2 px-3">{p.title}</td>
                    <td className="py-2 px-3">{p.slug}</td>
                    <td className="py-2 px-3">{p.price.toLocaleString()} تومان</td>
                    <td className="py-2 px-3">{p.isReady ? 'بله' : 'خیر'}</td>
                    <td className="py-2 px-3 flex items-center gap-2">
                      <button className="text-[var(--primaryColor)] text-xs border px-2 py-1 rounded-lg" onClick={()=>beginEdit(p as Product & { id: string })}>ویرایش</button>
                      <button className="text-red-600 text-xs border px-2 py-1 rounded-lg" onClick={()=>deleteItem(p.id)}>حذف</button>
                    </td>
                  </tr>
                  {editId === p.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="py-3 px-3">
                        <div className="grid md:grid-cols-6 gap-2">
                          <input className="border border-gray-200 rounded-xl p-2 text-xs" placeholder="عنوان" value={editForm.title} onChange={(e)=>setEditForm({...editForm, title: e.target.value})} />
                          <input className="border border-gray-200 rounded-xl p-2 text-xs" placeholder="slug" value={editForm.slug} onChange={(e)=>setEditForm({...editForm, slug: e.target.value})} />
                          <input className="border border-gray-200 rounded-xl p-2 text-xs" placeholder="قیمت" type="number" value={editForm.price} onChange={(e)=>setEditForm({...editForm, price: parseInt(e.target.value||'0')})} />
                          <input className="border border-gray-200 rounded-xl p-2 text-xs" placeholder="تصویر" value={editForm.imageUrl} onChange={(e)=>setEditForm({...editForm, imageUrl: e.target.value})} />
                          <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={!!editForm.isReady} onChange={(e)=>setEditForm({...editForm, isReady: e.target.checked})} /> آماده فروش</label>
                          <div className="flex items-center gap-2">
                            <button className="bg-[var(--primaryColor)] text-white rounded-lg px-3 py-2 text-xs" onClick={saveEdit}>ذخیره</button>
                            <button className="border rounded-lg px-3 py-2 text-xs" onClick={()=>setEditId(null)}>انصراف</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


