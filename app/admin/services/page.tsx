"use client"
import { useEffect, useState } from "react";

type Service = { id?: string; slug: string; title: string; description?: string; imageUrl?: string };

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [form, setForm] = useState<Service>({ slug: "", title: "", description: "", imageUrl: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Service>({ slug: "", title: "", description: "", imageUrl: "" });

  const load = async () => {
    const res = await fetch("/api/services");
    setItems(await res.json());
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/services", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ slug: "", title: "", description: "", imageUrl: "" });
    await load();
  };

  const beginEdit = (s: Service & { id: string }) => {
    setEditId(s.id);
    setEditForm({ slug: s.slug, title: s.title, description: s.description || "", imageUrl: s.imageUrl || "" });
  };

  const saveEdit = async () => {
    if (!editId) return;
    await fetch(`/api/services/${editId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) });
    setEditId(null);
    await load();
  };

  const deleteItem = async (id?: string) => {
    if (!id) return;
    if (!confirm('حذف این مورد؟')) return;
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div className="bg-white rounded-3xl p-5">
      <h1 className="text-[var(--primaryColor)] font-black">خدمات</h1>
      <form onSubmit={submit} className="grid grid-cols-1 gap-3 mt-4">
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="slug" value={form.slug} onChange={(e)=>setForm({...form, slug:e.target.value})} required />
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="عنوان" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} required />
        <textarea className="border border-gray-200 rounded-xl p-3 text-sm h-24" placeholder="توضیحات" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
        <input className="border border-gray-200 rounded-xl p-3 text-sm" placeholder="تصویر" value={form.imageUrl} onChange={(e)=>setForm({...form, imageUrl:e.target.value})} />
        <button className="bg-[var(--primaryColor)] text-white rounded-xl py-2.5 text-sm">افزودن خدمت</button>
      </form>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="text-right py-2 px-3">عنوان</th>
              <th className="text-right py-2 px-3">Slug</th>
              <th className="text-right py-2 px-3">اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {items.map(s => (
              <>
                <tr key={s.id} className="border-t">
                  <td className="py-2 px-3">{s.title}</td>
                  <td className="py-2 px-3">{s.slug}</td>
                  <td className="py-2 px-3 flex items-center gap-2">
                    <button className="text-[var(--primaryColor)] text-xs border px-2 py-1 rounded-lg" onClick={()=>beginEdit(s as Service & { id: string })}>ویرایش</button>
                    <button className="text-red-600 text-xs border px-2 py-1 rounded-lg" onClick={()=>deleteItem(s.id)}>حذف</button>
                  </td>
                </tr>
                {editId === s.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="py-3 px-3">
                      <div className="grid md:grid-cols-5 gap-2">
                        <input className="border border-gray-200 rounded-xl p-2 text-xs" placeholder="عنوان" value={editForm.title} onChange={(e)=>setEditForm({...editForm, title: e.target.value})} />
                        <input className="border border-gray-200 rounded-xl p-2 text-xs" placeholder="slug" value={editForm.slug} onChange={(e)=>setEditForm({...editForm, slug: e.target.value})} />
                        <input className="border border-gray-200 rounded-xl p-2 text-xs" placeholder="تصویر" value={editForm.imageUrl} onChange={(e)=>setEditForm({...editForm, imageUrl: e.target.value})} />
                        <input className="border border-gray-200 rounded-xl p-2 text-xs" placeholder="توضیحات" value={editForm.description} onChange={(e)=>setEditForm({...editForm, description: e.target.value})} />
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
  );
}


