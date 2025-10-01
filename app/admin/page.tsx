import Link from "next/link";

export default function AdminHome() {
    const cards = [
        { href: "/admin/products", title: "محصولات" },
        { href: "/admin/blog", title: "بلاگ" },
        { href: "/admin/customers", title: "مشتریان" },
        { href: "/admin/users", title: "کاربران" },
    ];
    return (
        <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl px-7 py-14">
                <h1 className="text-[var(--primaryColor)] font-black">داشبورد مدیریت</h1>
                <p className="text-sm text-gray-500 mt-3">مدیریت محتوا و فروشگاه</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {cards.map(c => (
                    <Link key={c.href} href={c.href} className="bg-white rounded-2xl p-5 text-center border border-gray-100 hover:shadow-sm">
                        <h3>{c.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}


