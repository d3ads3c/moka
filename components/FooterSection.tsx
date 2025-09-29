import Image from "next/image"
export default function FooterSection() {
    return (
        <div className="px-3 py-5 bg-white">
            <div className="w-full text-center">
                <Image src={"/img/logo/type.webp"} width={1000} height={1000} className="max-w-72 mx-auto" alt="MokaChap Logo"></Image>
            </div>
            <div className="w-full text-center my-4">
                <button className="text-[var(--primaryColor)] border border-[var(--primaryColor)] rounded-xl py-2.5 px-5 mx-auto flex items-center justify-center gap-1">
                    <i className="fi fi-sr-user-graduate mt-1.5 text-base"></i>
                    <h3 className="text-sm">تماس با پشتیبانی</h3>
                </button>
            </div>
            <div className="text-xs text-gray-500 text-center space-y-3">
                <p className="font-bold">شنبه تا چهارشنبه از  ساعت ۹ - ۱۷</p>
                <p className="font-bold">آدرس : تهران، خیابان ولیعصر، خیابان بزرگمهر پاساژ بزرگ بزگمهر</p>
                <p className="font-bold">تلفن : ۰۲۱۳۳۲۲۶۸۸</p>
            </div>
        </div>
    )
}