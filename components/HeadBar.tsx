"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function HeadBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <div className="p-3 w-full fixed top-0 z-30">
                <div className="bg-white rounded-3xl flex items-center justify-between p-3">
                    <div className="w-1/3 pr-2 pt-1.5">
                        <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
                            <i className="fi fi-rr-menu-burger text-2xl text-gray-800"></i>
                        </button>
                    </div>
                    <div className="w-1/3 text-center">
                        <Image src={"/img/logo/Emblem.webp"} width={1000} height={1000} className="max-w-12 mx-auto" alt="MochaChap Emblem" />
                    </div>
                    <div className="w-1/3 flex items-center justify-end">
                        <Link href={"#"} className="bg-[var(--primaryColor)] py-2.5 px-4 rounded-xl text-white custom_shadow text-sm">لیست قیمت</Link>
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
                    <Link href="#" className="text-sm text-gray-800">خانه</Link>
                    <Link href="#" className="text-sm text-gray-800">درباره ما</Link>
                    <Link href="#" className="text-sm text-gray-800">خدمات</Link>
                    <Link href="#" className="text-sm text-gray-800">تماس با ما</Link>
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