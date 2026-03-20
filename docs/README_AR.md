# Render Hub - نظام ديناميكي

## التحديثات الجديدة ✨

تم تحويل الموقع إلى نظام ديناميكي بالكامل! الآن يمكنك إضافة فنانين جدد بسهولة دون الحاجة لتعديل الكود.

## البنية الجديدة 📁

```
public/artists/
├── khaled/
│   ├── avatar.jpg
│   ├── work_1.png
│   ├── work_2.png
│   └── info.md
├── alaa/
│   ├── avatar.jpg
│   ├── work_1.png
│   └── info.md
└── example/
    ├── avatar.jpg
    └── info.md
```

## كيفية إضافة فنان جديد 🎨

### الخطوة 1: إنشاء المجلد
```
public/artists/[اسم_الفنان]/
```

### الخطوة 2: إضافة الملفات
- `avatar.jpg` - الصورة الشخصية (إلزامي)
- `work_1.png`, `work_2.png`, ... - صور الأعمال (اختياري)
- `info.md` - معلومات الفنان (إلزامي)

### الخطوة 3: تعديل artistLoader.js
افتح `src/utils/artistLoader.js` وأضف اسم المجلد:
```javascript
const artistFolders = ['khaled', 'alaa', 'اسم_الفنان_الجديد'];
```

## صيغة ملف info.md 📝

```markdown
# الاسم بالعربي | Name in English

## التخصص | Specialty
التخصص بالعربي | Specialty in English

## السيرة الذاتية | Bio
النص بالعربي

النص بالإنجليزية

## شروط التعاون | Collaboration Terms
النص بالعربي

النص بالإنجليزية

## معلومات التواصل | Contact Information
- WhatsApp: https://wa.me/218XXXXXXXXX
- Telegram: https://t.me/username
- Facebook: https://facebook.com/username
- Instagram: https://instagram.com/username
- Email: email@example.com
- YouTube: https://youtube.com/@channel
```

## المميزات الجديدة 🚀

✅ **تحميل تلقائي**: يتم قراءة معلومات الفنانين من ملفات MD تلقائياً
✅ **صور ديناميكية**: يتم اكتشاف صور الأعمال تلقائياً
✅ **سهولة الإضافة**: فقط أضف مجلد جديد وملف MD
✅ **دعم متعدد اللغات**: عربي وإنجليزي في نفس الملف
✅ **روابط تواصل مرنة**: أضف أي عدد من روابط التواصل

## الملفات المهمة 📄

- `src/utils/artistLoader.js` - نظام التحميل الديناميكي
- `src/data/artists.js` - الترجمات فقط
- `src/main.js` - الكود الرئيسي المحدث
- `ARTISTS_GUIDE.md` - دليل مفصل بالعربية والإنجليزية

## تشغيل المشروع 🏃

```bash
npm install
npm run dev
```

## ملاحظات مهمة ⚠️

1. أسماء المجلدات يجب أن تكون بالإنجليزية فقط
2. لا تستخدم مسافات في أسماء المجلدات
3. تأكد من وجود ملف `avatar.jpg` لكل فنان
4. صور الأعمال يجب أن تكون مرقمة بالتسلسل (work_1, work_2, ...)

## للمزيد من المعلومات 📚

راجع ملف `ARTISTS_GUIDE.md` للحصول على دليل شامل ومفصل.
