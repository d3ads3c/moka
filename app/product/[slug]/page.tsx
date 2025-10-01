import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductConfigurator from "./product-configurator";
import ProductTabs from "./product-tabs";
import type { Product as PrismaProduct } from "@prisma/client";

type Config = { attributes?: { key: string; label: string; options: { label: string; priceDelta?: number }[] }[] };
type ProductWithOptionalShort = PrismaProduct & { shortDescription?: string };

export default async function ProductDetail({ params }: { params: { slug: string } }) {
    const product = await prisma.product.findUnique({ where: { slug: params.slug } });
    if (!product) {
        return (
            <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl px-5 py-10 text-center">محصول مورد نظر یافت نشد.</div>
            </div>
        );
    }

    return (
        <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/2">
                    <div className="relative h-64 md:h-[28rem] w-full rounded-3xl overflow-hidden">
                        <Image src={product.imageUrl || "/img/services/businesscard.jpg"} alt={product.title} fill className="object-cover" />
                        <Link href="/product" className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-2 rounded-full text-gray-700 text-sm flex items-center gap-2">
                            <i className="fi fi-rr-angle-small-right text-lg"></i>
                            بازگشت
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="bg-white rounded-3xl px-5 py-5 h-full">
                        <h1 className="text-xl md:text-2xl alibaba-bold">{product.title}</h1>
                        {(() => {
                            const p = product as unknown as ProductWithOptionalShort;
                            const short = p.shortDescription || (product.description ? product.description.split("\n")[0] : "");
                            return short ? <p className="text-xs text-gray-500 mt-1">{short}</p> : null;
                        })()}
                        {(() => {
                            const raw = (product as PrismaProduct).config as unknown;
                            const cfg: Config | undefined = raw ? (raw as Config) : undefined;
                            return <ProductConfigurator basePrice={product.price} config={cfg} />;
                        })()}
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <ProductTabs description={product.description || ""} productId={product.id} />
            </div>
        </div>
    );
}


