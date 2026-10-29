# Day Flow — نسخه آزمایشی v3 (بازطراحی صفحه امروز)

این بسته بر پایه پروژه فعلی Day Flow ساخته شده است و هدف آن افزودن تجربه‌ی «امروز» و مدیریت کارها، بدون بازنویسی کامل قابلیت‌های قدیمی است.

## تغییرات این نسخه

جزئیات تغییرات قابل مشاهده در فایل `CHANGELOG-v3.md` آمده است.

- صفحه‌ی جدید «امروز» با پیشرفت روز، فهرست کارها، سه اولویت، یادداشت روز و افزودن سریع
- ایجاد، تکمیل، ویرایش، حذف و فیلتر کارها
- ثبت هوشمند محلی (بدون API خارجی) با پیش‌نمایش قابل ویرایش، تشخیص پایه‌ی «امروز/فردا/پس‌فردا»، ساعت و تکرار روزانه
- ذخیره‌سازی محلی در `localStorage` و قابلیت خروجی/بازیابی JSON برای کارهای جدید
- تم روشن/تیره با پیروی از تنظیم سیستم تا وقتی کاربر انتخاب دستی نکند
- ظاهر ساده‌تر با پس‌زمینه سرمه‌ای تیره، خطوط طلایی کم‌کنتراست و سبز برای عملیات اصلی
- حذف پاک‌سازی خودکار داده‌های قبلی هنگام بارگذاری نسخه جدید
- افزایش نسخه کش Service Worker برای دریافت منابع جدید

## محدودیت‌های شناخته‌شده

- قابلیت ثبت هوشمند یک پارسر قاعده‌محور است، نه مدل هوش مصنوعی؛ ممکن است در جمله‌های پیچیده خطا کند. همیشه پیش‌نمایش را بررسی کن.
- کارهای جدید فعلاً محلی هستند و هنوز با حساب کاربری/Supabase همگام نمی‌شوند. برای جلوگیری از ادعای نادرست، همگام‌سازی چنددستگاهی این قابلیت را فعال‌شده فرض نکن.
- تاریخ کارها در این بخش به‌صورت تاریخ میلادی محلی ذخیره می‌شود؛ نمایش تاریخ از locale مرورگر استفاده می‌کند. انتخاب دستی تقویم شمسی/میلادی هنوز کامل نشده است.
- اعلان بومی زمان‌بندی‌شده برای کارهای جدید، همگام‌سازی تعارض‌ها و دسترسی‌های امنیتی سمت سرور هنوز پیاده‌سازی/آزمایش نشده‌اند.
- آزمون مرورگر واقعی و ساخت APK در این محیط کامل نشده‌اند؛ نصب وابستگی‌ها با محدودیت زمانی مواجه شد.

## اجرای محلی

پیش‌نیاز: Node.js نسخه LTS و اینترنت برای دریافت وابستگی‌ها.

```bash
npm install
npm run build
```

برای ساخت اندروید در یک محیط توسعه مناسب:

```bash
npx cap add android   # فقط اگر پوشه android هنوز وجود ندارد
npx cap sync android
npx cap open android
```

سپس از Android Studio خروجی APK بگیر. در GitHub Actions نیز Workflow موجود پروژه برای ساخت APK debug نگه داشته شده است؛ موفقیت ساخت باید در اجرای واقعی Actions تأیید شود.

## نکته‌ی مهم داده‌ها

نسخه فعلی دیگر در زمان شروع، داده‌های قبلی را به‌صورت خودکار پاک نمی‌کند. بااین‌حال پیش از جایگزینی نسخه‌ای که داده واقعی دارد، از داده‌ها پشتیبان بگیر. این بسته را ابتدا در شاخه یا مخزن آزمایشی بررسی کن و تا تأیید تست‌ها به مخزن انتشار اصلی منتقل نکن.


## v9 Living Starry Sky
The background now uses a responsive animated night-sky canvas with soft twinkling stars and rare subtle meteors. The effect pauses in hidden tabs and respects reduced-motion preferences.


## v11 Night Sky Palette
- Unified dark glass surfaces and text contrast to match the animated starry-sky background.
- Replaced conflicting light-card colors with a midnight navy palette and restrained violet, cyan, and gold accents.
- This is a source update; run the Android workflow and test on-device before release.


## v15 Functional compact redesign

See `CHANGELOG-v15-functional-compact.md`. The daily progress bar is replaced by a ring, the priorities card by a compact 7-day task-completion chart, and category/date/time controls are tucked into the existing task-entry flow. The chart only counts completion timestamps available in local task data; older completed tasks without timestamps cannot be reconstructed. Build and test the APK before release.

## v16 Compact functional redesign

See `CHANGELOG-v16-compact-functional.md`. This release replaces the daily progress bar with a ring, replaces the priorities card with a compact weekly task chart, and tucks scheduling/category fields behind an optional disclosure. Status, date, and category filters stay inside the existing task list. Historical chart counts are limited to tasks with recorded completion timestamps. APK build and device testing are still required.
