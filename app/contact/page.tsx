"use client"
import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl px-7 py-14">
                <h1 className="text-[var(--primaryColor)] font-black">تماس با ما</h1>
                <h2 className="text-2xl alibaba-bold mt-1">در تماس باشید</h2>
                <p className="text-sm text-gray-500 mt-3">سوال یا سفارشی دارید؟ فرم را پر کنید تا با شما تماس بگیریم.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 mt-6 space-y-4">
                <div>
                    <label className="text-sm">نام و نام خانوادگی</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-[var(--primaryColor)]"
                        placeholder="نام شما"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm">ایمیل</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-[var(--primaryColor)]"
                        placeholder="your@email.com"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm">پیام شما</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-[var(--primaryColor)] h-32"
                        placeholder="متن پیام"
                        required
                    />
                </div>
                <button type="submit" className="bg-[var(--primaryColor)] text-white py-2.5 px-6 rounded-xl text-sm">
                    ارسال پیام
                </button>
                {submitted && (
                    <p className="text-green-600 text-xs mt-2">پیام شما ارسال شد. به زودی با شما تماس می‌گیریم.</p>
                )}
            </form>
        </div>
    );
}


