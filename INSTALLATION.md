[English](#english) | [العربية](#arabic)

---

<a name="english"></a>
## English

# Installation & Setup Guide

## 📋 Requirements

- **Node.js** (version 16 or newer)
- **npm** (comes with Node.js)
- Text editor (VS Code recommended)

---

## 🚀 Installation

### 1. Download Project

```bash
# If project is on GitHub
git clone [repository-url]
cd render-hub

# Or if you have a zip file
# Extract and open folder in Terminal
```

### 2. Install Dependencies

```bash
npm install
```

This command will install all required libraries (Vite and others).

---

## ▶️ Running

### Development Mode

```bash
npm run dev
```

Project will open at:
- **Local:** http://localhost:5173
- **Network:** http://[your-ip]:5173

### Production Build

```bash
npm run build
```

A `dist/` folder will be created with files ready for deployment.

### Preview Build

```bash
npm run preview
```

To preview the built version before deployment.

---

## 🎨 Add New Artist

### Quick Method

```bash
npm run add-artist [folder_name]
```

Example:
```bash
npm run add-artist mohamed
```

The script will:
1. ✅ Create folder `public/artists/mohamed/`
2. ✅ Create `info.md` file with ready template
3. ✅ Update `src/utils/artistLoader.js` automatically

Then:
1. Add `avatar.jpg` image
2. Add work images `work_1.png`, `work_2.png`, ...
3. Edit `info.md` with artist information

### Manual Method

Check [docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md) for full details.

---

## 🌐 Deployment

### GitHub Pages

1. **Update vite.config.js:**
   ```javascript
   base: '/repository-name/'
   ```

2. **Build project:**
   ```bash
   npm run build
   ```

3. **Deploy dist folder:**
   - Can use GitHub Actions
   - Or manual deployment

### Netlify

1. **Connect project to Netlify**
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel

1. **Connect project to Vercel**
2. **Build settings:**
   - Build command: `npm run build`
   - Output directory: `dist`

---

## 🔧 Troubleshooting

### Error: "npm: command not found"

**Solution:** Install Node.js from [nodejs.org](https://nodejs.org/)

### Error: "Cannot find module"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Website doesn't open

**Solution:**
1. Make sure `npm run dev` is running
2. Check port - might be in use
3. Try another port:
   ```bash
   npm run dev -- --port 3000
   ```

### Artist not showing

**Solution:**
1. Make sure folder name is added in `src/utils/artistLoader.js`
2. Make sure `avatar.jpg` and `info.md` exist
3. Open Console in browser for errors (F12)

### Images not showing

**Solution:**
1. Make sure file names are correct
2. Make sure correct path: `public/artists/[name]/`
3. Clear cache (Ctrl+Shift+R)

---

## 📱 Install as App

### On Desktop

1. Open website in Chrome/Edge
2. Click install icon in address bar
3. Or: Menu → "Install [site name]"

### On Android

1. Open website in Chrome
2. Menu → "Add to Home screen"

### On iPhone/iPad

1. Open website in Safari
2. Click share button (⬆️)
3. "Add to Home Screen"

---

## 🔄 Updates

### Update Project

```bash
# If on GitHub
git pull origin main

# Then reinstall libraries
npm install
```

### Update Dependencies

```bash
# Update all libraries
npm update

# Or update Vite only
npm install vite@latest
```

---

## 📊 Available Commands

| Command | Function |
|---------|----------|
| `npm install` | Install libraries |
| `npm run dev` | Run development mode |
| `npm run build` | Build for production |
| `npm run preview` | Preview build |
| `npm run add-artist [name]` | Add new artist |

---

## 📚 More Information

- **[START_HERE.md](START_HERE.md)** - Starting point
- **[README.md](README.md)** - Overview
- **[docs/QUICK_START.md](docs/QUICK_START.md)** - Quick guide
- **[docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)** - Artists guide
- **[docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)** - Developers guide

---

## 💡 Tips

### For Development

- Use VS Code with Vite extension
- Enable Hot Module Replacement (HMR) - works automatically
- Open Console for errors (F12)

### For Production

- Test build before deployment: `npm run preview`
- Check file sizes in `dist/`
- Test on different devices

### For Performance

- Compress images before uploading
- Use WebP format for images (optional)
- Make sure Service Worker is enabled

---

## 🆘 Support

### Technical Problem?

1. Check this guide
2. Check [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)
3. Open Issue on GitHub

### Usage Question?

1. Check [docs/QUICK_START.md](docs/QUICK_START.md)
2. Check [docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)

---

## ✅ Checklist

Before starting, make sure:

- [ ] Node.js installed
- [ ] Ran `npm install`
- [ ] Ran `npm run dev` successfully
- [ ] Opened website in browser
- [ ] Read [START_HERE.md](START_HERE.md)

---

**Ready to start! 🚀**

---

<a name="arabic"></a>
## العربية (Arabic)

# دليل التثبيت والتشغيل

## 📋 المتطلبات

- **Node.js** (الإصدار 16 أو أحدث)
- **npm** (يأتي مع Node.js)
- محرر نصوص (VS Code موصى به)

---

## 🚀 التثبيت

### 1. تحميل المشروع

```bash
# إذا كان المشروع على GitHub
git clone [repository-url]
cd render-hub

# أو إذا كان لديك ملف مضغوط
# فك الضغط وافتح المجلد في Terminal
```

### 2. تثبيت المكتبات

```bash
npm install
```

هذا الأمر سيقوم بتثبيت جميع المكتبات المطلوبة (Vite وغيرها).

---

## ▶️ التشغيل

### وضع التطوير

```bash
npm run dev
```

سيفتح المشروع على:
- **Local:** http://localhost:5173
- **Network:** http://[your-ip]:5173

### بناء للإنتاج

```bash
npm run build
```

سيتم إنشاء مجلد `dist/` يحتوي على الملفات الجاهزة للنشر.

### معاينة البناء

```bash
npm run preview
```

لمعاينة النسخة المبنية قبل النشر.

---

## 🎨 إضافة فنان جديد

### الطريقة السريعة

```bash
npm run add-artist [اسم_المجلد]
```

مثال:
```bash
npm run add-artist mohamed
```

سيقوم السكريبت بـ:
1. ✅ إنشاء مجلد `public/artists/mohamed/`
2. ✅ إنشاء ملف `info.md` بقالب جاهز
3. ✅ تحديث `src/utils/artistLoader.js` تلقائياً

ثم:
1. أضف صورة `avatar.jpg`
2. أضف صور الأعمال `work_1.png`, `work_2.png`, ...
3. عدّل `info.md` بمعلومات الفنان

### الطريقة اليدوية

راجع [docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md) للتفاصيل الكاملة.

---

## 🌐 النشر

### GitHub Pages

1. **تحديث vite.config.js:**
   ```javascript
   base: '/repository-name/'
   ```

2. **بناء المشروع:**
   ```bash
   npm run build
   ```

3. **نشر مجلد dist:**
   - يمكن استخدام GitHub Actions
   - أو نشر يدوي

### Netlify

1. **ربط المشروع بـ Netlify**
2. **إعدادات البناء:**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel

1. **ربط المشروع بـ Vercel**
2. **إعدادات البناء:**
   - Build command: `npm run build`
   - Output directory: `dist`

---

## 🔧 استكشاف الأخطاء

### خطأ: "npm: command not found"

**الحل:** قم بتثبيت Node.js من [nodejs.org](https://nodejs.org/)

### خطأ: "Cannot find module"

**الحل:**
```bash
# احذف node_modules وأعد التثبيت
rm -rf node_modules
npm install
```

### الموقع لا يفتح

**الحل:**
1. تأكد من تشغيل `npm run dev`
2. تحقق من المنفذ (Port) - قد يكون مستخدم
3. جرب منفذ آخر:
   ```bash
   npm run dev -- --port 3000
   ```

### الفنان لا يظهر

**الحل:**
1. تأكد من إضافة اسم المجلد في `src/utils/artistLoader.js`
2. تأكد من وجود `avatar.jpg` و `info.md`
3. افتح Console في المتصفح للأخطاء (F12)

### الصور لا تظهر

**الحل:**
1. تأكد من أسماء الملفات صحيحة
2. تأكد من المسار الصحيح: `public/artists/[اسم]/`
3. امسح الكاش (Ctrl+Shift+R)

---

## 📱 تثبيت كتطبيق

### على الكمبيوتر

1. افتح الموقع في Chrome/Edge
2. انقر على أيقونة التثبيت في شريط العنوان
3. أو: القائمة → "تثبيت [اسم الموقع]"

### على Android

1. افتح الموقع في Chrome
2. القائمة → "إضافة إلى الشاشة الرئيسية"

### على iPhone/iPad

1. افتح الموقع في Safari
2. انقر على زر المشاركة (⬆️)
3. "إضافة إلى الشاشة الرئيسية"

---

## 🔄 التحديثات

### تحديث المشروع

```bash
# إذا كان على GitHub
git pull origin main

# ثم أعد تثبيت المكتبات
npm install
```

### تحديث المكتبات

```bash
# تحديث جميع المكتبات
npm update

# أو تحديث Vite فقط
npm install vite@latest
```

---

## 📊 الأوامر المتاحة

| الأمر | الوظيفة |
|------|---------|
| `npm install` | تثبيت المكتبات |
| `npm run dev` | تشغيل وضع التطوير |
| `npm run build` | بناء للإنتاج |
| `npm run preview` | معاينة البناء |
| `npm run add-artist [اسم]` | إضافة فنان جديد |

---

## 📚 المزيد من المعلومات

- **[START_HERE.md](START_HERE.md)** - نقطة البداية
- **[README.md](README.md)** - نظرة عامة
- **[docs/QUICK_START.md](docs/QUICK_START.md)** - دليل سريع
- **[docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)** - دليل إضافة الفنانين
- **[docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)** - دليل المطورين

---

## 💡 نصائح

### للتطوير

- استخدم VS Code مع ملحق Vite
- فعّل Hot Module Replacement (HMR) - يعمل تلقائياً
- افتح Console للأخطاء (F12)

### للإنتاج

- اختبر البناء قبل النشر: `npm run preview`
- تحقق من حجم الملفات في `dist/`
- اختبر على أجهزة مختلفة

### للأداء

- ضغط الصور قبل رفعها
- استخدم صيغة WebP للصور (اختياري)
- تأكد من تفعيل Service Worker

---

## 🆘 الدعم

### مشكلة تقنية؟

1. راجع هذا الدليل
2. راجع [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)
3. افتح Issue في GitHub

### سؤال عن الاستخدام؟

1. راجع [docs/QUICK_START.md](docs/QUICK_START.md)
2. راجع [docs/ARTISTS_GUIDE.md](docs/ARTISTS_GUIDE.md)

---

## ✅ قائمة التحقق

قبل البدء، تأكد من:

- [ ] تثبيت Node.js
- [ ] تشغيل `npm install`
- [ ] تشغيل `npm run dev` بنجاح
- [ ] فتح الموقع في المتصفح
- [ ] قراءة [START_HERE.md](START_HERE.md)

---

**جاهز للبدء! 🚀**
