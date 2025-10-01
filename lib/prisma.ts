import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Ensure a default admin exists (runs once per server process)
async function ensureDefaultAdmin() {
  const email = process.env.DEFAULT_ADMIN_EMAIL;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  if (!email || !password) return;
  const admins = await prisma.user.findMany({ where: { role: "ADMIN" }, take: 1 });
  if (admins.length > 0) return;
  try {
    await prisma.user.create({ data: { email, password: hashPassword(password), role: "ADMIN", name: "Admin" } });
    console.log("Default admin user created:", email);
  } catch (e) {
    console.warn("Default admin creation skipped:", (e as Error).message);
  }
}

void ensureDefaultAdmin();
// Ensure a default business card product exists
async function ensureDefaultBusinessCard() {
  try {
    await prisma.product.upsert({
      where: { slug: "business-card" },
      update: {
        shortDescription: `دارای ابعاد استاندارد 5.5 × 8.5 سانتی‌متر
متنوع در جنس و ضخامت‌های گوناگون
قابل چاپ در دو ظاهر متفاوت دورگرد و دورتیز
مناسب برای قرار دادن در کیف پول و دیگر نگه‌دارنده‌های کارت`
      },
      create: {
        slug: "business-card",
        title: "کارت ویزیت مستطیل",
        shortDescription: `دارای ابعاد استاندارد 5.5 × 8.5 سانتی‌متر
متنوع در جنس و ضخامت‌های گوناگون
قابل چاپ در دو ظاهر متفاوت دورگرد و دورتیز
مناسب برای قرار دادن در کیف پول و دیگر نگه‌دارنده‌های کارت`,
        description: `کارت ویزیت مستطیل :
کارت ویزیت مستطیل چاپ آقا از جنس گلاسه می باشد . گلاسه 300 گرم  با روکش های متفاوت . شما میتوانید کارت ویزیت خود را با دو حالت روکش لمینت و یا روکش سلفون سفارش دهید 
در مجموعه چاپ آقا  شما میتوانید روکش های لمینت و یا سلفون خود را  مات و یا براق سفارش دهید . در تمامی حالت ها میتوانید کارت ویزیت خود را دورگرد و یا دور تیز سفارش دهید 
روکش های لمینت در چاپ باعث استحکام بیشتر کار و مقاومت بیشتر در برابر تا شدن و یا پاره شدن کارت شما می شود .
سایز کارت ویزیت

کارت‌های ویزیت به صورت کلی در دو حالت مربع و مستطیل طراحی شده و به چاپ می‌رسند. برای هریک از ابعاد مذکور اندازه‌های مختلفی وجود دارد که متداول‌ترین آن‌ها برای نوع مستطیل 5/5×5/8 و 5/4×5/8 سانتی‌متر و برای کارت ویزیت با ابعاد مربع 5/5×5/5 سانتی‌متر است.
انواع کارت ویزیت

کارت ویزیت همانند دیگر محصولات چاپی دارای انواع متعدد و متنوعی است. در این میان آنچه موجب تنوع و گستردگی این محصول می‌شود، اندازه و ابعاد کارت ویزیت، جنس و ضخامت کاغذ، انواع متنوع روکش‌های محافظ، جلوه‌دهنده‌های بصری همچون سطوح طلاکوب، نقره‌کوب، مس‌کوب، یو.وی و در نهایت نحوه چاپ آن است. البته باید توجه داشت که عامل تعیین‌کننده نوع کارت ویزیت ویژگی‌های تجارت و کسب و کار است.
طرح کارت ویزیت

یکی از مسائلی که پیش از چاپ یک کارت ویزیت مورد توجه بسیار قرار دارد نحوه طراحی کارت ویزیت و کیفیت ذخیره‌سازی آن طرح است. طرحی که برای کارت ویزیت انتخاب می‌گردد در ظاهر آن تاثیر به‌سزایی گذاشته و همانند کیفیت چاپ می‌تواند در جذب مخاطب مهم باشد. از سویی دیگر طرح محصولات چاپی، همانند استانداردهای چاپی، به‌طور مستقیم با نوع کسب و کار در رابطه است. بدین معنا که توناژ رنگی و اشکال به کار رفته در طرح می‌بایست متناسب با نوع تجارت باشد.

چاپ کارت ویزیت

به طور معمول کارت ویزیت به دو صورت افست و یا دیجیتال به چاپ می‌رسد. این دو نوع چاپ دارای خصوصیات مخصوص به خود هستند. چاپ کارت ویزیت توسط دستگاه‌های چاپ دیجیتال ضمن حفظ زمان، کیفیت بالایی را در تیراژهای پایین‌تر فراهم می کند.

سفارش کارت ویزیت

مجموعه چاپ آقا با برخورداری از سیستم هوشمند ثبت سفارش به صورت آنلاین این امکان را برای مشتریان محترم خود فراهم کرده است تا بدون نیاز به حضور فیزیکی بتوانند تنوع محصولات کارت ویزیت همراه با تعرفه هرکدام را در سایت www.chapagha.com مشاهده کرده و سفارش خود را به صورت آنلاین ثبت نمایند. همچنین کارشناسان متخصص و مجرب این مجموعه به صورت فعال آماده مشاوره و پاسخگویی به مشتریان می‌باشند. چاپ آقا مفتخر است که به عنوان اولین و تنها ارائه‌دهنده ابزار طراحی آنلاین، با ارائه سامانه‌ای هوشمند، در کنار واحد تخصصی طراحی امکان انتخاب و طراحی طرح‌های متنوع و رایگانی که در این ابزار قرار داده شده است را برای کاربران فراهم کرده و نیازهای طراحی و چاپ مشتریان را به سادگی رفع نماید.

کارت ویزیت مستطیل :
کارت ویزیت مستطیل چاپ آقا از جنس گلاسه می باشد . گلاسه 300 گرم  با روکش های متفاوت . شما میتوانید کارت ویزیت خود را با دو حالت روکش لمینت و یا روکش سلفون سفارش دهید 
در مجموعه چاپ آقا`,
        price: 340000,
        imageUrl: "/img/services/businesscard.jpg",
        isReady: false,
        config: {
          leadTimeDays: 3,
          attributes: [
            {
              key: "surface",
              label: "جنس",
              options: [
                { label: "براق", priceDelta: 0 },
                { label: "مات", priceDelta: 0 },
                { label: "لمینت", priceDelta: 60000 }
              ]
            },
            {
              key: "thickness",
              label: "ضخامت",
              options: [
                { label: "نازک", priceDelta: 0 },
                { label: "متوسط", priceDelta: 0 },
                { label: "ضخیم", priceDelta: 40000 }
              ]
            },
            {
              key: "sides",
              label: "وجه",
              options: [
                { label: "یک رو", priceDelta: 0 },
                { label: "دو رو", priceDelta: 50000 }
              ]
            },
            {
              key: "printCut",
              label: "نوع برش",
              options: [
                { label: "دورگرد", priceDelta: 0 },
                { label: "دورتیز", priceDelta: 0 }
              ]
            }
          ]
        }
      }
    });

    // Ensure one ready product appears in shop
    await prisma.product.upsert({
      where: { slug: "ready-sample" },
      update: { title: "لیبل آماده A5 - پک 50 عددی", price: 320000, isReady: true, imageUrl: "/img/services/sticker.jpg", category: "لیبل" },
      create: {
        slug: "ready-sample",
        title: "لیبل آماده A5 - پک 50 عددی",
        description: "لیبل آماده سایز A5 مناسب بسته‌بندی و برچسب‌گذاری",
        price: 320000,
        imageUrl: "/img/services/sticker.jpg",
        isReady: true,
        category: "لیبل",
      }
    });

    // Provide a few default categories
    await prisma.product.upsert({
      where: { slug: "ready-card" },
      update: { title: "کارت ویزیت آماده (100 عدد)", price: 300000, isReady: true, imageUrl: "/img/services/businesscard.jpg", category: "کارت ویزیت" },
      create: { slug: "ready-card", title: "کارت ویزیت آماده (100 عدد)", description: "کارت ویزیت آماده چاپ شده.", price: 300000, imageUrl: "/img/services/businesscard.jpg", isReady: true, category: "کارت ویزیت" }
    });
    await prisma.product.upsert({
      where: { slug: "ready-bag" },
      update: { title: "ساک دستی اسپان آماده", price: 2800000, isReady: true, imageUrl: "/img/services/spunbond.jpeg", category: "ساک دستی" },
      create: { slug: "ready-bag", title: "ساک دستی اسپان آماده", description: "بگ اسپان آماده.", price: 2800000, imageUrl: "/img/services/spunbond.jpeg", isReady: true, category: "ساک دستی" }
    });
  } catch (e) {
    console.warn("Default product creation skipped:", (e as Error).message);
  }
}

void ensureDefaultBusinessCard();


