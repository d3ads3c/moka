import Image from "next/image";
import Link from "next/link";
import AutoSlideImages from "@/components/AutoSlideImages";

export default function Home() {
  const images = [
    '/img/customers/mellat.png',
    '/img/customers/saedinia.png',
    '/img/customers/tapsi.png',
    '/img/customers/tejarat.png',
  ];

  return (
    <div className="p-3 mt-20 pb-10">
      <div className="bg-white rounded-3xl px-7 py-14">
        <h1 className="text-[var(--primaryColor)] font-black">موکا چاپ</h1>
        <h2 className="text-2xl alibaba-bold mt-1">
          طراحی و چاپ دلخواه خودتو با کیفیت بالا به واقعیت تبدیل کن!
        </h2>
        <ul className="text-sm text-gray-500 list-disc mr-5 mt-3">
          <li>
            خدمات چاپ آفست و دیجیتال
          </li>
          <li>
            چاپ محصولات متنوع بدون محدودیت تیراژ
          </li>
          <li>
            خدمات طراحی
          </li>
          <li>
            ضمانت کیفیت
          </li>
        </ul>
        <div className="w-full flex item-center gap-2 mt-4">
          <Link href={"#"} className="bg-[var(--primaryColor)] text-white custom_shadow py-2.5 px-4 rounded-xl text-sm">سفارش اختصاصی</Link>
          <Link href={"#"} className="text-[var(--primaryColor)] border border-[var(--primaryColor)] py-2.5 px-6 rounded-xl text-sm">فروشگاه</Link>
        </div>
      </div>
      <div style={{ width: '100%', height: '120px', position: 'relative', marginTop: '2rem' }}>
        <AutoSlideImages images={images} interval={3000} />
      </div>
      <div className="">
        <div className="text-center mb-3">
          <h2 className="text-[var(--primaryColor)]">خدمات ما</h2>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl bg-[url('/img/services/businesscard.jpg')] bg-cover bg-center h-80 w-full flex items-end">
            <div className="bg-black/30 rounded-3xl flex items-center justify-between p-4 w-full backdrop-blur-xs">
              <div className="w-1/2">
                <h3 className=" text-white">چاپ کارت ویزیت</h3>
                <p className="text-xs mt-1 text-gray-200">لمینت، دورگرد، کنفی و ...</p>
              </div>
              <div className="w-1/2 text-left">
                <Link href={"#"} className="border border-white text-white py-3 px-10 rounded-xl iranyekan-light text-sm hover:bg-white hover:text-[var(--primaryColor)] focus:bg-white focus:text-[var(--primaryColor)]">مشاهده</Link>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-[url('/img/services/sticker.jpg')] bg-cover bg-center h-80 w-full flex items-end">
            <div className="bg-black/30 rounded-3xl flex items-center justify-between p-4 w-full backdrop-blur-xs">
              <div className="w-1/2">
                <h3 className=" text-white">لیبل اختصاصی</h3>
                <p className="text-xs mt-1 text-gray-200">شیشه ای، هولوگرام، اموال و ...</p>
              </div>
              <div className="w-1/2 text-left">
                <Link href={"#"} className="border border-white text-white py-3 px-10 rounded-xl iranyekan-light text-sm hover:bg-white hover:text-[var(--primaryColor)] focus:bg-white focus:text-[var(--primaryColor)]">مشاهده</Link>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-[url('/img/services/spunbond.jpeg')] bg-cover bg-center h-80 w-full flex items-end">
            <div className="bg-black/30 rounded-3xl flex items-center justify-between p-4 w-full backdrop-blur-xs">
              <div className="w-1/2">
                <h3 className=" text-white">ساک دستی اسپان</h3>
                <p className="text-xs mt-1 text-gray-200">چاپ اختصاصی روی بگ اسپان</p>
              </div>
              <div className="w-1/2 text-left">
                <Link href={"#"} className="border border-white text-white py-3 px-10 rounded-xl iranyekan-light text-sm hover:bg-white hover:text-[var(--primaryColor)] focus:bg-white focus:text-[var(--primaryColor)]">مشاهده</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--primaryColor)] rounded-3xl p-5 my-5 text-center">
        <h2 className="text-xl text-white">مشاوره رایگان</h2>
        <p className="text-white text-sm mt-1.5">جهت دریافت مشاوره رایگان با ما در ارتباط باشید</p>
        <div className="mt-5">
          <Link href={"#"} className="bg-white text-[var(--primaryColor)] py-2 px-7 rounded-xl iranyekan-bold">تماس با ما</Link>
        </div>
      </div>
      <div className="mt-8">
        <div>
          <h2 className="text-[var(--primaryColor)]">مطالب آموزشی</h2>
          <p className="text-xs text-gray-500">محتواهای آموزشی و کاربردی</p>
        </div>
        <div className="mt-3 space-y-5">
          <div className="rounded-3xl bg-[url('/img/blog/blog1.webp')] bg-center bg-cover h-80 w-full flex items-end">
            <div className="bg-black/30 rounded-3xl px-5 py-3 w-full backdrop-blur-xs">
              <div>
                <h3 className="text-white alibaba-bold">۵ دلیل که شما به کارت ویزیت نیاز دارید</h3>
                <p className="line-clamp-2 text-gray-200 mt-1.5 text-xs">در حالی که امروزه تمامی کارها و برقراری ارتباط به صورت آنلاین در دنیای دیجیتال انجام می شود، کارت ویزیت هنوز در جهان مطرح است و هدف اصلی و نیاز به کارت ویزیت را جایگزین نمی کند. کارت ویزیت برای برقرای ارتباط اولیه با هدف توسعه یک رابطه بلند مدت ایجاد می شود. در ادامه به 8دلیل که شما به کارت ویزیت نیاز دارید میپردازیم.</p>
                <div className="flex items-center gap-7 text-gray-200 text-xs mt-3">
                  <p>۱۴ شهریور ۱۴۰۴</p>
                  <p>۴ دقیقه</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-[url('/img/blog/blog1.webp')] bg-center bg-cover h-80 w-full flex items-end">
            <div className="bg-black/30 rounded-3xl px-5 py-3 w-full backdrop-blur-xs">
              <div>
                <h3 className="text-white alibaba-bold">۵ دلیل که شما به کارت ویزیت نیاز دارید</h3>
                <p className="line-clamp-2 text-gray-200 mt-1.5 text-xs">در حالی که امروزه تمامی کارها و برقراری ارتباط به صورت آنلاین در دنیای دیجیتال انجام می شود، کارت ویزیت هنوز در جهان مطرح است و هدف اصلی و نیاز به کارت ویزیت را جایگزین نمی کند. کارت ویزیت برای برقرای ارتباط اولیه با هدف توسعه یک رابطه بلند مدت ایجاد می شود. در ادامه به 8دلیل که شما به کارت ویزیت نیاز دارید میپردازیم.</p>
                <div className="flex items-center gap-7 text-gray-200 text-xs mt-3">
                  <p>۱۴ شهریور ۱۴۰۴</p>
                  <p>۴ دقیقه</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
