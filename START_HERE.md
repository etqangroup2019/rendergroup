[English](#english) | [العربية](#arabic)

---

<a name="english"></a>
## English

# 🚀 Start Here

## Welcome to Render Hub! 👋

The website has been successfully converted to a **dynamic system** that makes it easy to add and manage artists.

---

## ⚡ Quick Start

### 1. Installation and Running

```bash
# Install dependencies
npm install

# Run the project
npm run dev
```

### 2. Add a New Artist

```bash
# Use the helper script
npm run add-artist [folder_name]

# Example
npm run add-artist mohamed
```

Then:
1. Add `avatar.jpg` image in `public/artists/mohamed/`
2. Add work images `work_1.png`, `work_2.png`, ...
3. Edit `info.md` file with artist information

---

## 📚 Full Documentation

### For Users
- **[README.md](README.md)** - Project overview
- **[docs/QUICK_START.md](docs/QUICK_START.md)** - Quick start guide (3 steps)
- **[docs/README_AR.md](docs/README_AR.md)** - README in Arabic

### For Adding Artists
- **[docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)** - Comprehensive guide with examples
- **[public/artists/example/EXAMPLE_TEMPLATE.md](public/artists/example/EXAMPLE_TEMPLATE.md)** - Ready templates

### For Developers
- **[docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)** - Detailed technical guide
- **[docs/CHANGELOG.md](docs/CHANGELOG.md)** - Change log
- **[docs/PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)** - Project summary

---

## 🎯 What's New?

### ✨ Dynamic System

**Before:**
```javascript
// Had to edit JavaScript files
export const artist = { ... }
```

**After:**
```bash
# Just one command!
npm run add-artist ahmed
```

### 📝 Markdown Files

**Before:**
```javascript
bio: { ar: "...", en: "..." }
```

**After:**
```markdown
## Bio
Arabic text

English text
```

### 🖼️ Auto Image Discovery

**Before:**
```javascript
works: ["/work1.png", "/work2.png"]
```

**After:**
```
# Just add the images!
work_1.png
work_2.png
# Discovered automatically ✨
```

---

## 📁 Basic Structure

```
render-hub/
├── public/artists/          # Artist folders
│   ├── khaled/
│   │   ├── avatar.jpg      # Profile picture
│   │   ├── work_1.png      # Work images
│   │   └── info.md         # Artist info
│   └── alaa/
│       └── ...
├── src/
│   ├── utils/
│   │   └── artistLoader.js # Dynamic system ⭐
│   └── main.js
├── docs/                    # Full documentation
└── scripts/
    └── add-artist.js       # Helper script
```

---

## 🔧 Available Commands

```bash
npm run dev          # Run project
npm run build        # Build for production
npm run preview      # Preview build
npm run add-artist   # Add new artist
```

---

## 💡 Quick Tips

### Add Artist Manually

1. Create folder: `public/artists/[name]/`
2. Add files:
   - `avatar.jpg` (required)
   - `work_1.png`, `work_2.png`, ... (optional)
   - `info.md` (required)
3. Register in `src/utils/artistLoader.js`:
   ```javascript
   const artistFolders = ['khaled', 'alaa', 'new_name'];
   ```

### info.md Format

```markdown
# Name in Arabic | Name in English

## Specialty
Specialty in Arabic | Specialty in English

## Bio
Text in Arabic

Text in English

## Collaboration Terms
Terms in Arabic

Terms in English

## Contact Information
- WhatsApp: https://wa.me/218XXXXXXXXX
- Email: email@example.com
```

---

## ❓ FAQ

### How to add a new artist?
```bash
npm run add-artist [name]
```

### Where to put images?
```
public/artists/[artist_name]/
├── avatar.jpg
├── work_1.png
└── work_2.png
```

### How to edit artist info?
Edit file `public/artists/[name]/info.md`

### Artist not showing?
Make sure to add folder name in `src/utils/artistLoader.js`

---

## 🆘 Support

### Problem?
1. Check [docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)
2. Check [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)
3. Open Issue on GitHub

### Want to contribute?
Check [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)

---

## 🎉 Ready to Start!

Choose what suits you:

- 🏃 **Quick:** Check [docs/QUICK_START.md](docs/QUICK_START.md)
- 📖 **Comprehensive:** Check [docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)
- 💻 **Technical:** Check [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)

---

**Made with ❤️ in Libya**

---

<a name="arabic"></a>
## العربية (Arabic)

# 🚀 ابدأ من هنا

## مرحباً بك في Render Hub! 👋

تم تحويل الموقع بنجاح إلى **نظام ديناميكي** يسهل إضافة وإدارة الفنانين.

---

## ⚡ البدء السريع

### 1. التثبيت والتشغيل

```bash
# تثبيت المكتبات
npm install

# تشغيل المشروع
npm run dev
```

### 2. إضافة فنان جديد

```bash
# استخدم السكريبت المساعد
npm run add-artist [اسم_المجلد]

# مثال
npm run add-artist mohamed
```

ثم:
1. أضف صورة `avatar.jpg` في `public/artists/mohamed/`
2. أضف صور الأعمال `work_1.png`, `work_2.png`, ...
3. عدّل ملف `info.md` بمعلومات الفنان

---

## 📚 التوثيق الكامل

### للمستخدمين
- **[README.md](README.md)** - نظرة عامة على المشروع
- **[docs/QUICK_START.md](docs/QUICK_START.md)** - دليل البدء السريع (3 خطوات)
- **[docs/README_AR.md](docs/README_AR.md)** - README بالعربية

### لإضافة فنانين
- **[docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)** - دليل شامل مع أمثلة
- **[public/artists/example/EXAMPLE_TEMPLATE.md](public/artists/example/EXAMPLE_TEMPLATE.md)** - قوالب جاهزة

### للمطورين
- **[docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)** - دليل تقني مفصل
- **[docs/CHANGELOG.md](docs/CHANGELOG.md)** - سجل التغييرات
- **[docs/PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)** - ملخص المشروع

---

## 🎯 ما الجديد؟

### ✨ النظام الديناميكي

**قبل:**
```javascript
// كان يجب تعديل ملفات JavaScript
export const artist = { ... }
```

**بعد:**
```bash
# فقط أمر واحد!
npm run add-artist ahmed
```

### 📝 ملفات Markdown

**قبل:**
```javascript
bio: { ar: "...", en: "..." }
```

**بعد:**
```markdown
## السيرة الذاتية
النص بالعربي

النص بالإنجليزية
```

### 🖼️ اكتشاف تلقائي للصور

**قبل:**
```javascript
works: ["/work1.png", "/work2.png"]
```

**بعد:**
```
# فقط ضع الصور!
work_1.png
work_2.png
# يتم اكتشافها تلقائياً ✨
```

---

## 📁 البنية الأساسية

```
render-hub/
├── public/artists/          # مجلدات الفنانين
│   ├── khaled/
│   │   ├── avatar.jpg      # الصورة الشخصية
│   │   ├── work_1.png      # صور الأعمال
│   │   └── info.md         # معلومات الفنان
│   └── alaa/
│       └── ...
├── src/
│   ├── utils/
│   │   └── artistLoader.js # النظام الديناميكي ⭐
│   └── main.js
├── docs/                    # التوثيق الكامل
└── scripts/
    └── add-artist.js       # سكريبت المساعدة
```

---

## 🔧 الأوامر المتاحة

```bash
npm run dev          # تشغيل المشروع
npm run build        # بناء للإنتاج
npm run preview      # معاينة البناء
npm run add-artist   # إضافة فنان جديد
```

---

## 💡 نصائح سريعة

### إضافة فنان يدوياً

1. أنشئ مجلد: `public/artists/[اسم]/`
2. أضف الملفات:
   - `avatar.jpg` (إلزامي)
   - `work_1.png`, `work_2.png`, ... (اختياري)
   - `info.md` (إلزامي)
3. سجل في `src/utils/artistLoader.js`:
   ```javascript
   const artistFolders = ['khaled', 'alaa', 'اسم_جديد'];
   ```

### صيغة info.md

```markdown
# الاسم بالعربي | Name in English

## التخصص | Specialty
التخصص | Specialty

## السيرة الذاتية | Bio
النص بالعربي

النص بالإنجليزية

## شروط التعاون | Collaboration Terms
الشروط بالعربي

Terms in English

## معلومات التواصل | Contact Information
- WhatsApp: https://wa.me/218XXXXXXXXX
- Email: email@example.com
```

---

## ❓ الأسئلة الشائعة

### كيف أضيف فنان جديد؟
```bash
npm run add-artist [اسم]
```

### أين أضع الصور؟
```
public/artists/[اسم_الفنان]/
├── avatar.jpg
├── work_1.png
└── work_2.png
```

### كيف أعدل معلومات فنان؟
عدّل ملف `public/artists/[اسم]/info.md`

### الفنان لا يظهر؟
تأكد من إضافة اسم المجلد في `src/utils/artistLoader.js`

---

## 🆘 الدعم

### مشكلة؟
1. راجع [docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)
2. راجع [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)
3. افتح Issue في GitHub

### تريد المساهمة؟
راجع [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)

---

## 🎉 جاهز للبدء!

اختر ما يناسبك:

- 🏃 **سريع:** راجع [docs/QUICK_START.md](docs/QUICK_START.md)
- 📖 **شامل:** راجع [docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)
- 💻 **تقني:** راجع [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)

---

**صُنع بـ ❤️ في ليبيا**
