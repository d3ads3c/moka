"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

type AttributeOption = { label: string; priceDelta?: number };
type Attribute = { key: string; label: string; options: AttributeOption[] };

export default function AdminNewProductPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [saving, setSaving] = useState(false);

    function addAttribute() {
        setAttributes((prev) => [...prev, { key: "", label: "", options: [{ label: "", priceDelta: 0 }] }]);
    }

    function updateAttribute(idx: number, patch: Partial<Attribute>) {
        setAttributes((prev) => prev.map((a, i) => (i === idx ? { ...a, ...patch } : a)));
    }

    function addOption(attrIdx: number) {
        setAttributes((prev) => prev.map((a, i) => (i === attrIdx ? { ...a, options: [...a.options, { label: "", priceDelta: 0 }] } : a)));
    }

    function updateOption(attrIdx: number, optIdx: number, patch: Partial<AttributeOption>) {
        setAttributes((prev) => prev.map((a, i) => (
            i === attrIdx ? { ...a, options: a.options.map((o, j) => (j === optIdx ? { ...o, ...patch } : o)) } : a
        )));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, slug, price, description, imageUrl, config: { attributes } }),
            });
            if (!res.ok) throw new Error(await res.text());
            const created = await res.json();
            router.push(`/admin/products`);
        } catch (err) {
            alert((err as Error).message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="p-3 mt-20 pb-10 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-6">
                <h1 className="text-[var(--primaryColor)] font-black mb-4">افزودن محصول جدید</h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="عنوان" value={title} onChange={setTitle} required />
                        <Input label="اسلاگ" value={slug} onChange={setSlug} required helper="مثال: business-card" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="قیمت پایه (تومان)" type="number" value={String(price)} onChange={(v) => setPrice(Number(v || 0))} required />
                        <Input label="آدرس تصویر" value={imageUrl} onChange={setImageUrl} placeholder="/img/..." />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">توضیحات</label>
                        <textarea className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm text-gray-800">ویژگی‌ها و تاثیر بر قیمت</h2>
                            <button type="button" className="text-[var(--primaryColor)] text-sm" onClick={addAttribute}>+ افزودن ویژگی</button>
                        </div>
                        <div className="space-y-4">
                            {attributes.map((attr, idx) => (
                                <div key={idx} className="border border-gray-200 rounded-2xl p-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Input label="کلید ویژگی" value={attr.key} onChange={(v) => updateAttribute(idx, { key: v })} placeholder="مثال: surface" />
                                        <Input label="عنوان ویژگی" value={attr.label} onChange={(v) => updateAttribute(idx, { label: v })} placeholder="مثال: جنس" />
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-600">گزینه‌ها</span>
                                            <button type="button" className="text-[var(--primaryColor)] text-xs" onClick={() => addOption(idx)}>+ افزودن گزینه</button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                            {attr.options.map((opt, jdx) => (
                                                <div key={jdx} className="grid grid-cols-2 gap-2">
                                                    <Input label="عنوان گزینه" value={opt.label} onChange={(v) => updateOption(idx, jdx, { label: v })} />
                                                    <Input label="تغییر قیمت" type="number" value={String(opt.priceDelta ?? 0)} onChange={(v) => updateOption(idx, jdx, { priceDelta: Number(v || 0) })} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button type="submit" className="bg-[var(--primaryColor)] text-white rounded-2xl py-2 px-6 text-sm" disabled={saving}>
                            {saving ? "در حال ذخیره..." : "ذخیره محصول"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Input({ label, helper, ...rest }: { label: string; helper?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & { onChange: (v: string) => void }) {
    return (
        <label className="block">
            <span className="block text-sm text-gray-700 mb-1">{label}</span>
            <input {...rest} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm" onChange={(e) => rest.onChange(e.target.value)} />
            {helper && <span className="block text-xs text-gray-500 mt-1">{helper}</span>}
        </label>
    );
}


