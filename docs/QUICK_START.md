[English](#english) | [العربية](#arabic)

---

<a name="english"></a>
## English

# Quick Start Guide

## Add a New Artist in 3 Steps

### 1️⃣ Create Folder and Files

```bash
# Create artist folder
mkdir public/artists/artist_name

# Add images
# Put avatar.jpg (profile picture)
# Put work_1.png, work_2.png, ... (work images)
```

### 2️⃣ Create info.md File

Copy and paste this template into `public/artists/artist_name/info.md`:

```markdown
# Name in Arabic | Name in English

## Specialty
Specialty in Arabic | Specialty in English

## Bio
Bio in Arabic.

Bio in English.

## Collaboration Terms
Terms in Arabic.

Terms in English.

## Contact Information
- WhatsApp: https://wa.me/218XXXXXXXXX
- Email: email@example.com
```

### 3️⃣ Register Artist

Open `src/utils/artistLoader.js` and add folder name:

```javascript
const artistFolders = ['khaled', 'alaa', 'new_artist_name'];
```

## ✅ Done!

Now run the project:

```bash
npm run dev
```

---

## Practical Example

To add an artist named "mohamed":

1. Create `public/artists/mohamed/`
2. Add files:
   - `avatar.jpg`
   - `work_1.png`
   - `work_2.png`
   - `info.md`
3. Edit `artistLoader.js`:
   ```javascript
   const artistFolders = ['khaled', 'alaa', 'mohamed'];
   ```

---

## Important Tips 💡

- Use English names for folders (no spaces)
- Number work images sequentially: work_1, work_2, work_3
- Make sure avatar.jpg exists for each artist
- You can delete any contact link you don't need

---

For more details, check `ARTISTS_GUIDE.md`

---

<a name="arabic"></a>
## العربية (Arabic)

# دليل البدء السريع

## إضافة فنان جديد في 3 خطوات

### 1️⃣ إنشاء المجلد والملفات

```bash
# إنشاء مجلد الفنان
mkdir public/artists/اسم_الفنان

# إضافة الصور
# ضع avatar.jpg (الصورة الشخصية)
# ضع work_1.png, work_2.png, ... (صور الأعمال)
```

### 2️⃣ إنشاء ملف info.md

انسخ والصق هذا القالب في `public/artists/اسم_الفنان/info.md`:

```markdown
# الاسم بالعربي | Name in English

## التخصص | Specialty
التخصص بالعربي | Specialty in English

## السيرة الذاتية | Bio
السيرة الذاتية بالعربي.

Bio in English.

## شروط التعاون | Collaboration Terms
الشروط بالعربي.

Terms in English.

## معلومات التواصل | Contact Information
- WhatsApp: https://wa.me/218XXXXXXXXX
- Email: email@example.com
```

### 3️⃣ تسجيل الفنان

افتح `src/utils/artistLoader.js` وأضف اسم المجلد:

```javascript
const artistFolders = ['khaled', 'alaa', 'اسم_الفنان_الجديد'];
```

## ✅ انتهى!

الآن قم بتشغيل المشروع:

```bash
npm run dev
```

---

## مثال عملي

لإضافة فنان اسمه "محمد":

1. أنشئ `public/artists/mohamed/`
2. أضف الملفات:
   - `avatar.jpg`
   - `work_1.png`
   - `work_2.png`
   - `info.md`
3. عدّل `artistLoader.js`:
   ```javascript
   const artistFolders = ['khaled', 'alaa', 'mohamed'];
   ```

---

## نصائح مهمة 💡

- استخدم أسماء إنجليزية للمجلدات (بدون مسافات)
- رقّم صور الأعمال بالتسلسل: work_1, work_2, work_3
- تأكد من وجود avatar.jpg لكل فنان
- يمكنك حذف أي رابط تواصل لا تحتاجه

---

للمزيد من التفاصيل، راجع `ARTISTS_GUIDE.md`
