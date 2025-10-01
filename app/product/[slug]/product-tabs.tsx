"use client"
import { useState } from "react";

export default function ProductTabs({ description, productId }: { description: string; productId: string }) {
    const [tab, setTab] = useState<"desc" | "comments">("desc");
    return (
        <div className="bg-white rounded-3xl p-4">
            <div className="flex items-center gap-2 border-b border-gray-100">
                <button type="button" onClick={() => setTab("desc")} className={`px-4 py-2 text-sm ${tab === "desc" ? "text-[var(--primaryColor)] border-b-2 border-[var(--primaryColor)]" : "text-gray-600"}`}>
                    توضیحات
                </button>
                <button type="button" onClick={() => setTab("comments")} className={`px-4 py-2 text-sm ${tab === "comments" ? "text-[var(--primaryColor)] border-b-2 border-[var(--primaryColor)]" : "text-gray-600"}`}>
                    نظرات
                </button>
            </div>

            {tab === "desc" && (
                <div className="text-sm text-gray-700 mt-4 leading-7 whitespace-pre-line">
                    {<><p>{description}</p></> || "توضیحاتی برای این محصول ثبت نشده است."}
                </div>
            )}

            {tab === "comments" && <Comments productId={productId} />}
        </div>
    );
}

function Comments({ productId }: { productId: string }) {
    const [items, setItems] = useState<{ id: string; author: string; message: string; rating: number; createdAt: string }[]>([]);
    const [author, setAuthor] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);

    async function load() {
        const res = await fetch(`/api/products/${productId}/comments`, { cache: "no-store" });
        const data = await res.json();
        setItems(data);
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`/api/products/${productId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author, message, rating })
            });
            if (!res.ok) throw new Error(await res.text());
            setAuthor("");
            setMessage("");
            setRating(5);
            await load();
        } catch (err) {
            alert((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    // naive load when first opened
    useState(() => { void load(); return undefined; });

    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-3">
                {items.length === 0 && <p className="text-sm text-gray-500">هیچ نظری ثبت نشده است.</p>}
                {items.map((c) => (
                    <div key={c.id} className="border border-gray-200 rounded-2xl p-3">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{c.author}</span>
                            <span>{new Date(c.createdAt).toLocaleDateString("fa-IR")}</span>
                        </div>
                        <div className="mt-1 text-yellow-500 text-xs">{"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}</div>
                        <p className="text-sm text-gray-800 mt-2 whitespace-pre-line">{c.message}</p>
                    </div>
                ))}
            </div>
            <div>
                <form onSubmit={onSubmit} className="border border-gray-200 rounded-2xl p-3 space-y-3">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">نام</label>
                        <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border border-gray-200 rounded-2xl px-3 py-2 text-sm" required />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">امتیاز</label>
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full border border-gray-200 rounded-2xl px-3 py-2 text-sm">
                            {[5,4,3,2,1].map((r) => (<option key={r} value={r}>{r}</option>))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">نظر شما</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border border-gray-200 rounded-2xl px-3 py-2 text-sm" rows={4} required />
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className="w-full bg-[var(--primaryColor)] text-white rounded-2xl py-2 text-sm">{loading ? "در حال ارسال..." : "ارسال نظر"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


