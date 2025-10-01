"use client"
import { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.error || 'ثبت‌نام ناموفق بود');
            }
            // auto login after register
            const login = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
            if (login.ok) {
                window.location.href = '/panel';
            }
        } catch (err: any) {
            setError(err?.message || 'خطا');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-3 mt-20 pb-10">
            <div className="bg-white rounded-3xl px-7 py-14">
                <h1 className="text-[var(--primaryColor)] font-black">ثبت‌نام</h1>
                <h2 className="text-2xl alibaba-bold mt-1">ایجاد حساب مشتری</h2>
            </div>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 mt-6 space-y-4">
                <input className="w-full border border-gray-200 rounded-xl p-3 text-sm" placeholder="نام" value={name} onChange={(e)=>setName(e.target.value)} />
                <input className="w-full border border-gray-200 rounded-xl p-3 text-sm" placeholder="ایمیل" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <input className="w-full border border-gray-200 rounded-xl p-3 text-sm" placeholder="رمز عبور" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button disabled={loading} className="bg-[var(--primaryColor)] text-white rounded-xl py-2.5 text-sm">{loading? 'در حال ثبت‌نام...' : 'ثبت‌نام'}</button>
            </form>
        </div>
    )
}


