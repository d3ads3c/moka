"use client"
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.error || 'خطا در ورود');
            }
            // check role and redirect
            const me = await fetch('/api/auth/me');
            const data = await me.json();
            if (data?.user?.role === 'ADMIN') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/panel';
            }
        } catch (err: any) {
            setError(err?.message || "خطا در ورود");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 mt-20 pb-10">
            <div className="bg-white rounded-3xl px-7 py-14">
                <h1 className="text-[var(--primaryColor)] font-black">ورود</h1>
                <h2 className="text-2xl alibaba-bold mt-1">ورود به حساب کاربری</h2>
                <p className="text-sm text-gray-500 mt-3">لطفاً ایمیل و رمز عبور خود را وارد کنید.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 mt-6 space-y-4">
                <div>
                    <label className="text-sm">ایمیل</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-[var(--primaryColor)]"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm">رمز عبور</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-[var(--primaryColor)]"
                        placeholder="••••••••"
                        required
                    />
                </div>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button
                    type="submit"
                    className="bg-[var(--primaryColor)] text-white py-2.5 px-6 rounded-xl text-sm disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "در حال ورود..." : "ورود"}
                </button>
            </form>
        </div>
    );
}


