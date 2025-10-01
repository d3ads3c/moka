"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function HeadBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <div className="p-3 w-full fixed top-0 z-30">
                <div className="bg-white rounded-3xl flex items-center justify-between p-3 max-w-7xl mx-auto">
                    <div className="w-1/3 pr-2 pt-1.5 md:hidden">
                        <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
                            <i className="fi fi-rr-menu-burger text-2xl text-gray-800"></i>
                        </button>
                    </div>
                    <div className="w-1/3 md:w-auto text-center">
                    <Link href={"/"}>
                        <Image src={"/img/logo/Emblem.webp"} width={1000} height={1000} className="max-w-12 mx-auto" alt="MochaChap Emblem" />
                    </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-4">
                        <Link href="/" className="text-sm text-gray-800">خانه</Link>
                        <Link href="/about" className="text-sm text-gray-800">درباره ما</Link>
                        <Link href="/product" className="text-sm text-gray-800">محصولات</Link>
                        <Link href="/services" className="text-sm text-gray-800">خدمات</Link>
                        <Link href="/shop" className="text-sm text-gray-800">فروشگاه</Link>
                        <Link href="/blog" className="text-sm text-gray-800">بلاگ</Link>
                        <Link href="/contact" className="text-sm text-gray-800">تماس با ما</Link>
                    </nav>
                    <div className="w-1/3 md:w-auto flex items-center justify-end gap-2">
                        <Link href={"/login"} className="hidden md:inline-block border border-[var(--primaryColor)] text-[var(--primaryColor)] py-2.5 px-4 rounded-xl text-sm">ورود</Link>
                        <Link href={"/prices"} className="bg-[var(--primaryColor)] py-2.5 px-4 rounded-xl text-white custom_shadow text-sm">لیست قیمت</Link>
                    </div>
                </div>
            </div>
            {/* Full height sliding menu */}
            <div
                className={`fixed top-2 h-[98%] w-full max-w-xs p-3 rounded-3xl bg-white z-50 shadow-lg transition-transform duration-500 ease-in-out flex flex-col ${menuOpen ? 'translate-x-0 right-2' : 'translate-x-full right-0'}`}
                style={{ direction: 'rtl' }}
            >
                {/* Menu content here */}
                <div>
                    <Image src={"/img/logo/type.webp"} width={1000} height={1000} className="max-w-72 mx-auto" alt="MokaChap Logo"></Image>
                </div>
                <nav className="flex flex-col gap-4 px-6 border-t pt-5 border-gray-200">
                    <Link href="/" className="text-sm text-gray-800">خانه</Link>
                    <Link href="/about" className="text-sm text-gray-800">درباره ما</Link>
                    <Link href="/product" className="text-sm text-gray-800">محصولات</Link>
                    <Link href="/services" className="text-sm text-gray-800">خدمات</Link>
                    <Link href="/shop" className="text-sm text-gray-800">فروشگاه</Link>
                    <Link href="/blog" className="text-sm text-gray-800">بلاگ</Link>
                    <Link href="/contact" className="text-sm text-gray-800">تماس با ما</Link>
                    <Link href="/login" className="text-sm text-gray-800">ورود</Link>
                </nav>
            </div>
            {/* Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-md bg-opacity-40 z-40"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </>
    );
}