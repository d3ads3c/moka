import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProductPage() {
    const items = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return (
        <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl px-7 py-14">
                <h1 className="text-[var(--primaryColor)] font-black">محصولات</h1>
                <h2 className="text-2xl alibaba-bold mt-1">خدمات چاپی ما</h2>
                <p className="text-sm text-gray-500 mt-3">از بین محصولات متنوع ما انتخاب کنید و سفارش خود را ثبت کنید.</p>
            </div>

            <div className="mt-6 space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
                {items.map((p) => (
                    <div key={p.id} className="rounded-3xl bg-cover bg-center h-80 md:h-64 w-full flex items-end"
                         style={{ backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : "url('/img/services/businesscard.jpg')" }}>
                        <div className="bg-black/30 rounded-3xl flex items-center justify-between p-4 w-full backdrop-blur-xs">
                            <div className="w-1/2">
                                <h3 className=" text-white">{p.title}</h3>
                                <p className="text-xs mt-1 text-gray-200 line-clamp-2">{p.description}</p>
                            </div>
                            <div className="w-1/2 text-left">
                                <Link href={`/product/${p.slug}`} className="border border-white text-white py-3 px-10 rounded-xl iranyekan-light text-sm hover:bg-white hover:text-[var(--primaryColor)] focus:bg-white focus:text-[var(--primaryColor)]">مشاهده</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


