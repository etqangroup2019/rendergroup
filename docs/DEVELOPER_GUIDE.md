# دليل المطورين | Developer Guide

## نظرة عامة على البنية | Architecture Overview

### النظام الديناميكي | Dynamic System

الموقع يعتمد على نظام تحميل ديناميكي يقرأ معلومات الفنانين من:
- مجلدات في `public/artists/`
- ملفات Markdown (info.md)
- صور (avatar.jpg, work_*.png)

---

## الملفات الرئيسية | Core Files

### 1. `src/utils/artistLoader.js`

**الوظيفة:** تحميل وتحليل معلومات الفنانين

**الدوال الرئيسية:**

```javascript
// تحليل ملف MD واستخراج المعلومات
parseMD(content) → { name, specialty, bio, terms, socials }

// تحميل معلومات فنان واحد
loadArtist(folderName, index) → Promise<Artist>

// تحميل جميع الفنانين
loadAllArtists() → Promise<Artist[]>

// تسجيل فنان جديد
registerArtist(folderName) → void

// الحصول على قائمة المجلدات
getArtistFolders() → string[]
```

**كيف يعمل:**

1. يقرأ قائمة `artistFolders`
2. لكل مجلد، يحمل ملف `info.md`
3. يحلل المحتوى باستخدام `parseMD()`
4. يبحث عن الصور (avatar.jpg, work_*.png)
5. يرجع كائن Artist كامل

### 2. `src/main.js`

**الوظيفة:** الكود الرئيسي للتطبيق

**التدفق:**

```javascript
// 1. تحميل الفنانين
loadAllArtists() → artists[]

// 2. تحديث الحالة
state.loading = false

// 3. عرض الصفحة
render()
```

**الحالة (State):**

```javascript
{
  page: 'home' | 'detail',
  selectedArtist: Artist | null,
  lang: 'ar' | 'en',
  theme: 'dark' | 'light',
  searchQuery: string,
  loading: boolean
}
```

### 3. `src/data/artists.js`

**الوظيفة:** الترجمات فقط

```javascript
export const translations = {
  ar: { ... },
  en: { ... }
}
```

---

## كائن Artist | Artist Object

```typescript
interface Artist {
  id: number;
  folder: string;
  name: {
    ar: string;
    en: string;
  };
  specialty: {
    ar: string;
    en: string;
  };
  bio: {
    ar: string;
    en: string;
  };
  avatar: string;
  works: string[];
  terms: {
    ar: string;
    en: string;
  };
  socials: {
    whatsapp?: string;
    telegram?: string;
    facebook?: string;
    instagram?: string;
    email?: string;
    youtube?: string;
  };
}
```

---

## إضافة ميزة جديدة | Adding New Features

### إضافة حقل جديد للفنان

1. **تحديث صيغة info.md:**

```markdown
## الحقل الجديد | New Field
النص بالعربي | Text in English
```

2. **تحديث parseMD() في artistLoader.js:**

```javascript
if (sectionTitle.includes('حقل جديد') || sectionTitle.includes('new field')) {
  currentSection = 'newField';
}
```

3. **تحديث كائن data:**

```javascript
const data = {
  // ... existing fields
  newField: { ar: '', en: '' }
};
```

4. **استخدام الحقل في main.js:**

```javascript
<p>${artist.newField[state.lang]}</p>
```

### إضافة منصة تواصل جديدة

1. **تحديث parseMD():**

```javascript
const platform = match[1].toLowerCase(); // يدعم أي منصة تلقائياً
```

2. **إضافة أيقونة في renderDetail():**

```javascript
const icons = {
  // ... existing icons
  linkedin: 'fab fa-linkedin',
  twitter: 'fab fa-twitter'
};
```

---

## التعامل مع الصور | Image Handling

### اكتشاف تلقائي للصور

```javascript
// يبحث عن work_1.png, work_2.png, ... حتى work_10.png
for (let i = 1; i <= 10; i++) {
  const workPath = `${basePath}artists/${folderName}/work_${i}.png`;
  // ...
}
```

### دعم صيغ أخرى

لدعم JPG بالإضافة إلى PNG:

```javascript
const extensions = ['png', 'jpg', 'jpeg'];
for (let i = 1; i <= 10; i++) {
  for (const ext of extensions) {
    const workPath = `${basePath}artists/${folderName}/work_${i}.${ext}`;
    // ...
  }
}
```

---

## التوجيه (Routing) | Routing

### URL Structure

```
/ → الصفحة الرئيسية
/?artist=1 → صفحة الفنان رقم 1
```

### History API

```javascript
// Push state
window.history.pushState({ page, artistId }, '', path);

// Pop state (زر الرجوع)
window.addEventListener('popstate', (event) => {
  // تحديث الحالة
});
```

---

## الأداء | Performance

### تحسينات مطبقة

1. **Lazy Loading للصور:**
   - استخدام `fetch` مع `HEAD` للتحقق من وجود الصور
   - تحميل الصور فقط عند الحاجة

2. **Caching:**
   - Service Worker يخزن الملفات
   - LocalStorage للإعدادات (lang, theme)

3. **Code Splitting:**
   - Vite يقوم بذلك تلقائياً

### تحسينات مقترحة

1. **Virtual Scrolling** للقوائم الطويلة
2. **Image Optimization** (WebP, responsive images)
3. **Preloading** للصفحات المتوقعة

---

## الاختبار | Testing

### اختبار يدوي

```bash
# 1. تشغيل المشروع
npm run dev

# 2. اختبار الميزات:
# - تبديل اللغة
# - تبديل الثيم
# - البحث
# - التنقل بين الصفحات
# - زر الرجوع
# - PWA Installation
```

### اختبار إضافة فنان

```bash
# 1. إضافة فنان جديد
npm run add-artist test-artist

# 2. إضافة الصور
# 3. تعديل info.md
# 4. تشغيل المشروع
npm run dev

# 5. التحقق من ظهور الفنان
```

---

## استكشاف الأخطاء | Debugging

### مشاكل شائعة

#### 1. الفنان لا يظهر

**الحل:**
```javascript
// تحقق من console
console.log(artists); // في main.js

// تحقق من artistFolders
console.log(getArtistFolders()); // في artistLoader.js
```

#### 2. الصور لا تظهر

**الحل:**
```javascript
// تحقق من المسارات
console.log(artist.avatar);
console.log(artist.works);

// تحقق من BASE_URL
console.log(import.meta.env.BASE_URL);
```

#### 3. خطأ في تحليل MD

**الحل:**
```javascript
// أضف logging في parseMD
console.log('Parsing:', content);
console.log('Result:', data);
```

---

## النشر | Deployment

### GitHub Pages

```bash
# 1. بناء المشروع
npm run build

# 2. نشر dist/
# تأكد من base في vite.config.js
base: '/repository-name/'
```

### Netlify/Vercel

```bash
# Build command
npm run build

# Output directory
dist

# Base directory
/
```

---

## المساهمة | Contributing

### معايير الكود

1. **استخدم ES6+**
2. **تعليقات بالعربية والإنجليزية**
3. **أسماء متغيرات واضحة**
4. **دوال صغيرة ومركزة**

### Git Workflow

```bash
# 1. إنشاء branch
git checkout -b feature/new-feature

# 2. التطوير والاختبار
# ...

# 3. Commit
git commit -m "feat: add new feature"

# 4. Push
git push origin feature/new-feature

# 5. Pull Request
```

---

## الموارد | Resources

- [Vite Documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [Markdown Guide](https://www.markdownguide.org/)

---

## الدعم | Support

للأسئلة التقنية:
1. راجع هذا الدليل
2. راجع الكود المصدري
3. افتح Issue في GitHub

---

**Happy Coding! 🚀**
