import Link from "next/link";

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: "۵ دلیل که شما به کارت ویزیت نیاز دارید",
            excerpt:
                "در حالی که امروزه تمامی کارها به صورت آنلاین انجام می‌شود، کارت ویزیت هنوز جایگاه خود را دارد...",
            date: "۱۴ شهریور ۱۴۰۴",
            readTime: "۴ دقیقه",
            image: "/img/blog/blog1.webp",
        },
        {
            id: 2,
            title: "نکات طراحی لیبل حرفه‌ای",
            excerpt: "چگونه یک لیبل حرفه‌ای و تاثیرگذار طراحی کنیم؟",
            date: "۲۰ مهر ۱۴۰۴",
            readTime: "۳ دقیقه",
            image: "/img/blog/blog1.webp",
        },
    ];

    return (
        <div className="p-3 mt-20 pb-10 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl px-7 py-14">
                <h1 className="text-[var(--primaryColor)] font-black">بلاگ</h1>
                <h2 className="text-2xl alibaba-bold mt-1">مطالب آموزشی و کاربردی</h2>
                <p className="text-sm text-gray-500 mt-3">آخرین مقالات آموزشی تیم موکا چاپ.</p>
            </div>

            <div className="mt-6 space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-5">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="rounded-3xl bg-center bg-cover h-80 md:h-72 w-full flex items-end"
                        style={{ backgroundImage: `url(${post.image})` }}
                    >
                        <div className="bg-black/30 rounded-3xl px-5 py-3 w-full backdrop-blur-xs">
                            <div>
                                <h3 className="text-white alibaba-bold">{post.title}</h3>
                                <p className="line-clamp-2 text-gray-200 mt-1.5 text-xs">{post.excerpt}</p>
                                <div className="flex items-center gap-7 text-gray-200 text-xs mt-3">
                                    <p>{post.date}</p>
                                    <p>{post.readTime}</p>
                                </div>
                                <div className="mt-3">
                                    <Link href={`#`} className="border border-white text-white py-2 px-5 rounded-xl text-xs">ادامه مطلب</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


