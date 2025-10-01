import Link from "next/link";

export default function PanelPage() {
    return (
        <div className="p-3 mt-20 pb-10">
            <div className="bg-white rounded-3xl px-7 py-14">
                <h1 className="text-[var(--primaryColor)] font-black">پنل مشتری</h1>
                <p className="text-sm text-gray-500 mt-3">سفارش‌ها و اطلاعات حساب خود را مدیریت کنید.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
                <Link href="/product" className="bg-white rounded-2xl p-5 text-center border border-gray-100 hover:shadow-sm">
                    <h3>سفارش جدید</h3>
                </Link>
                <Link href="/" className="bg-white rounded-2xl p-5 text-center border border-gray-100 hover:shadow-sm">
                    <h3>خانه</h3>
                </Link>
            </div>
        </div>
    );
}


