import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ShopItemPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product || !product.isReady) {
    return (
      <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl px-5 py-10 text-center">محصول آماده‌ای با این شناسه یافت نشد.</div>
      </div>
    );
  }

  return (
    <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <div className="relative h-64 md:h-[28rem] w-full rounded-3xl overflow-hidden">
            <Image src={product.imageUrl || "/img/services/businesscard.jpg"} alt={product.title} fill className="object-cover" />
            <Link href="/shop" className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-2 rounded-full text-gray-700 text-sm flex items-center gap-2">
              <i className="fi fi-rr-angle-small-right text-lg"></i>
              بازگشت
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white rounded-3xl px-5 py-5 h-full">
            <h1 className="text-xl md:text-2xl alibaba-bold">{product.title}</h1>
            {('shortDescription' in (product as object)) && (product as unknown as { shortDescription?: string }).shortDescription && (
              <p className="text-xs text-gray-500 mt-1">{(product as unknown as { shortDescription?: string }).shortDescription}</p>
            )}
            {product.description && (
              <p className="text-xs text-gray-600 mt-3 whitespace-pre-line">{product.description}</p>
            )}

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">قیمت</span>
                <span className="text-lg alibaba-bold text-[var(--primaryColor)]">{product.price.toLocaleString("fa-IR")} تومان</span>
              </div>
              <button className="w-full mt-4 bg-[var(--primaryColor)] text-white rounded-2xl py-3 text-sm md:text-base">افزودن به سبد</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


