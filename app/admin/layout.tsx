import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
            <aside className="bg-white rounded-2xl p-4 h-max sticky top-24">
                <h3 className="text-sm text-gray-700 mb-3">مدیریت</h3>
                <nav className="flex flex-col gap-2 text-sm">
                    <Link href="/admin" className="py-2 px-3 rounded-xl hover:bg-gray-50">داشبورد</Link>
                    <Link href="/admin/products" className="py-2 px-3 rounded-xl hover:bg-gray-50">محصولات</Link>
                    <Link href="/admin/blog" className="py-2 px-3 rounded-xl hover:bg-gray-50">بلاگ</Link>
                    <Link href="/admin/customers" className="py-2 px-3 rounded-xl hover:bg-gray-50">مشتریان</Link>
                    <Link href="/admin/users" className="py-2 px-3 rounded-xl hover:bg-gray-50">کاربران</Link>
                </nav>
            </aside>
            <main>
                {children}
            </main>
        </div>
    );
}


