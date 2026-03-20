[English](#english) | [العربية](#arabic)

---

<a name="english"></a>
## English

# Render Hub - Architectural Render Artists Platform 🎨

A dynamic platform for showcasing architectural render artists with full Arabic and English support.

---

## ✨ Features

- 🎨 **Dynamic System** - Add new artists without editing code
- 📝 **MD Files** - Content management through Markdown files
- 🌐 **Bilingual** - Full support for Arabic and English
- 🌓 **Light/Dark Mode** - Smooth switching between modes
- 📱 **PWA** - Works as an app on phones
- � **Smart Search** - Search artist names in both languages
- �️ **Work Gallery** - Professional display of artists' work
- 📞 **Contact Links** - Direct links to all social platforms

---

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run project
npm run dev
```

### Add New Artist

#### Quick Method (Using Script)

```bash
npm run add-artist [folder_name]
```

Example:
```bash
npm run add-artist mohamed
```

#### Manual Method

1. Create new folder in `public/artists/[artist_name]/`
2. Add files:
   - `avatar.jpg` (profile picture)
   - `work_1.png`, `work_2.png`, ... (work images)
   - `info.md` (artist information)
3. Edit `src/utils/artistLoader.js` and add folder name

---

## 📁 Structure

```
render-hub/
├── public/
│   └── artists/
│       ├── khaled/
│       │   ├── avatar.jpg
│       │   ├── work_1.png
│       │   ├── work_2.png
│       │   └── info.md
│       ├── alaa/
│       │   ├── avatar.jpg
│       │   ├── work_1.png
│       │   └── info.md
│       └── example/
│           ├── avatar.jpg
│           └── info.md
├── src/
│   ├── utils/
│   │   └── artistLoader.js    # Dynamic loading system
│   ├── data/
│   │   └── artists.js          # Translations
│   ├── main.js                 # Main code
│   └── style.css
└── scripts/
    └── add-artist.js           # Add artist script
```

---

## 📝 info.md Format

```markdown
# Name in Arabic | Name in English

## Specialty
Specialty in Arabic | Specialty in English

## Bio
Text in Arabic

Text in English

## Collaboration Terms
Text in Arabic

Text in English

## Contact Information
- WhatsApp: https://wa.me/218XXXXXXXXX
- Telegram: https://t.me/username
- Facebook: https://facebook.com/username
- Instagram: https://instagram.com/username
- Email: email@example.com
- YouTube: https://youtube.com/@channel
```

---

## 🛠️ Available Commands

```bash
# Run project in development mode
npm run dev

# Build project for production
npm run build

# Preview build
npm run preview

# Add new artist
npm run add-artist [folder_name]
```

---

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - Starting point
- **[INSTALLATION.md](INSTALLATION.md)** - Installation guide
- **[docs/QUICK_START.md](docs/QUICK_START.md)** - Quick start guide
- **[docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)** - Comprehensive guide for adding artists
- **[docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)** - Developer guide
- **[docs/README_AR.md](docs/README_AR.md)** - README in Arabic
- **[docs/CHANGELOG.md](docs/CHANGELOG.md)** - Change log
- **[docs/PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)** - Project summary

---

## 🔧 Technologies Used

- **Vite** - Fast build tool
- **Vanilla JavaScript** - No framework
- **CSS3** - Modern and responsive design
- **Markdown** - Content management
- **PWA** - Progressive Web App support

---

## 📱 Supported Browsers

- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create new branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is open source and available for free use.

---

## 📞 Contact

For questions and inquiries, please open an Issue in the project.

---

## 🙏 Special Thanks

Thanks to all render artists who contribute to enriching Arabic content.

---

**Made with ❤️ in Libya**

---

<a name="arabic"></a>
## العربية (Arabic)

# Render Hub - منصة فنانين الرندر 🎨

نظام ديناميكي لعرض ملفات فنانين الرندر المعماري مع دعم كامل للغتين العربية والإنجليزية.

---

## ✨ المميزات

- 🎨 **نظام ديناميكي** - إضافة فنانين جدد بدون تعديل الكود
- 📝 **ملفات MD** - إدارة المحتوى من خلال ملفات Markdown
- 🌐 **ثنائي اللغة** - دعم كامل للعربية والإنجليزية
- 🌓 **وضع فاتح/مظلم** - تبديل سلس بين الأوضاع
- 📱 **PWA** - يعمل كتطبيق على الهواتف
- 🔍 **بحث ذكي** - بحث في أسماء الفنانين بكلا اللغتين
- 🖼️ **معرض أعمال** - عرض احترافي لأعمال الفنانين
- 📞 **روابط تواصل** - روابط مباشرة لجميع منصات التواصل

---

## 🚀 البدء السريع

### التثبيت

```bash
# تثبيت المكتبات
npm install

# تشغيل المشروع
npm run dev
```

### إضافة فنان جديد

#### الطريقة السريعة (باستخدام السكريبت)

```bash
npm run add-artist [اسم_المجلد]
```

مثال:
```bash
npm run add-artist mohamed
```

#### الطريقة اليدوية

1. أنشئ مجلد جديد في `public/artists/[اسم_الفنان]/`
2. أضف الملفات:
   - `avatar.jpg` (الصورة الشخصية)
   - `work_1.png`, `work_2.png`, ... (صور الأعمال)
   - `info.md` (معلومات الفنان)
3. عدّل `src/utils/artistLoader.js` وأضف اسم المجلد

---

## 📁 البنية

```
render-hub/
├── public/
│   └── artists/
│       ├── khaled/
│       │   ├── avatar.jpg
│       │   ├── work_1.png
│       │   ├── work_2.png
│       │   └── info.md
│       ├── alaa/
│       │   ├── avatar.jpg
│       │   ├── work_1.png
│       │   └── info.md
│       └── example/
│           ├── avatar.jpg
│           └── info.md
├── src/
│   ├── utils/
│   │   └── artistLoader.js    # نظام التحميل الديناميكي
│   ├── data/
│   │   └── artists.js          # الترجمات
│   ├── main.js                 # الكود الرئيسي
│   └── style.css
└── scripts/
    └── add-artist.js           # سكريبت إضافة فنان
```

---

## 📝 صيغة ملف info.md

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

---

## 🛠️ الأوامر المتاحة

```bash
# تشغيل المشروع في وضع التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة البناء
npm run preview

# إضافة فنان جديد
npm run add-artist [اسم_المجلد]
```

---

## 📚 التوثيق

- **[START_HERE.md](START_HERE.md)** - نقطة البداية
- **[INSTALLATION.md](INSTALLATION.md)** - دليل التثبيت
- **[docs/QUICK_START.md](docs/QUICK_START.md)** - دليل البدء السريع
- **[docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)** - دليل شامل لإضافة الفنانين
- **[docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)** - دليل المطورين
- **[docs/README_AR.md](docs/README_AR.md)** - ملف README بالعربية
- **[docs/CHANGELOG.md](docs/CHANGELOG.md)** - سجل التغييرات
- **[docs/PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)** - ملخص المشروع

---

## 🔧 التقنيات المستخدمة

- **Vite** - أداة البناء السريعة
- **Vanilla JavaScript** - بدون إطار عمل
- **CSS3** - تصميم حديث ومتجاوب
- **Markdown** - لإدارة المحتوى
- **PWA** - دعم تطبيقات الويب التقدمية

---

## 📱 المتصفحات المدعومة

- ✅ Chrome/Edge (آخر نسختين)
- ✅ Firefox (آخر نسختين)
- ✅ Safari (آخر نسختين)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

---

## 📄 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الحر.

---

## 📞 التواصل

للأسئلة والاستفسارات، يرجى فتح Issue في المشروع.

---

## 🙏 شكر خاص

شكراً لجميع فنانين الرندر الذين يساهمون في إثراء المحتوى العربي.

---

**صُنع بـ ❤️ في ليبيا**
