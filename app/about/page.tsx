export default function AboutPage() {
    return (
        <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl px-7 py-14">
                <h1 className="text-[var(--primaryColor)] font-black">درباره ما</h1>
                <h2 className="text-2xl alibaba-bold mt-1">چاپ با کیفیت، تجربه‌ای دلنشین</h2>
                <p className="text-sm text-gray-500 mt-3">
                    موکا چاپ با هدف ارائه خدمات چاپی با کیفیت و قیمت مناسب راه‌اندازی شده است. ما با تکیه بر تجربه و تجهیزات حرفه‌ای، تلاش می‌کنیم بهترین نتیجه را برای شما فراهم کنیم.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6">
                <div className="bg-white rounded-3xl p-5">
                    <h3>ماموریت ما</h3>
                    <p className="text-sm text-gray-600 mt-2">ارائه خدمات چاپ سریع، باکیفیت و مقرون‌به‌صرفه برای کسب‌وکارها و افراد.</p>
                </div>
                <div className="bg-white rounded-3xl p-5">
                    <h3>چرا ما؟</h3>
                    <ul className="text-sm text-gray-600 list-disc mr-5 mt-2 space-y-1">
                        <li>تضمین کیفیت چاپ</li>
                        <li>پشتیبانی و مشاوره رایگان</li>
                        <li>تحویل سریع</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}


