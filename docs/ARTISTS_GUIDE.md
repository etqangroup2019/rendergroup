[English](#english) | [العربية](#arabic)

---

<a name="english"></a>
## English

# Guide to Adding New Artists

## Dynamic Structure

The website now works completely dynamically! Artist information is loaded automatically from folders.

---

## Steps to Add a New Artist

### 1. Create Artist Folder

Create a new folder in:
```
public/artists/[artist_name]/
```

Example:
```
public/artists/ahmed/
```

### 2. Add Images

Put the following files in the artist folder:

**Profile Picture (Required):**
```
avatar.jpg
```

**Work Images (Optional):**
```
1.png
2.png
3.png
...
```

Note: You can add any number of works, just make sure to number them sequentially (1, 2, 3, ...). Supported formats: PNG or JPG.

### 3. Create Info File

Create `info.md` file in the artist folder with the following format:

```markdown
# Name in Arabic | Name in English

## Specialty
Specialty in Arabic | Specialty in English

## Bio
Detailed bio in Arabic.

Detailed bio in English.

## Collaboration Terms
Collaboration terms and conditions in Arabic.

Collaboration terms and conditions in English.

## Contact Information
- WhatsApp: https://wa.me/218XXXXXXXXX
- Telegram: https://t.me/+218XXXXXXXXX
- Facebook: https://facebook.com/username
- Instagram: https://instagram.com/username
- Email: email@example.com
- YouTube: https://youtube.com/@channel
```

### 4. Register Artist in System

Open `src/utils/artistLoader.js` and add folder name to the list:

```javascript
const artistFolders = ['khaled', 'alaa', 'ahmed']; // Add new name here
```

---

## Complete Example

### Folder Structure
```
public/artists/ahmed/
├── avatar.jpg          (profile picture)
├── work_1.png         (work 1)
├── work_2.png         (work 2)
├── work_3.png         (work 3)
└── info.md            (artist information)
```

### info.md Content
```markdown
# Eng. Ahmed Mohamed | م. أحمد محمد

## Specialty
Interior Design & Decoration | تصميم داخلي وديكور

## Bio
Professional interior designer with 10 years of experience in design and architectural visualization.

مصمم داخلي محترف مع خبرة 10 سنوات في مجال التصميم والإظهار المعماري.

## Collaboration Terms
We provide comprehensive design services with quality assurance and deadline commitment.

نقدم خدمات تصميم متكاملة مع ضمان الجودة والالتزام بالمواعيد.

## Contact Information
- WhatsApp: https://wa.me/218912345678
- Email: ahmed@example.com
- Instagram: https://instagram.com/ahmed_design
```

---

## Important Notes

### File Names
- Folder names must be in English without spaces
- Use underscore (_) or dash (-) instead of spaces
- Correct example: `ahmed_mohamed` or `ahmed-mohamed`
- Wrong example: `ahmed mohamed` or `أحمد محمد`

### Images
- Profile picture must be in JPG format
- Work images can be PNG or JPG
- Images should be high quality but reasonable size (less than 2MB)

### Contact Links
Supported platforms:
- WhatsApp
- Telegram
- Facebook
- Instagram
- Email (Gmail or any other)
- YouTube

You can add any number of links or remove what you don't need.

---

## Troubleshooting

### Artist not showing on website
1. Make sure folder name is added in `artistFolders` in `artistLoader.js`
2. Make sure `info.md` file exists in artist folder
3. Make sure `avatar.jpg` image exists
4. Check console in browser for errors

### Images not showing
1. Make sure file names are correct (avatar.jpg, work_1.png, work_2.png, ...)
2. Make sure images are in correct folder
3. Try clearing cache and reloading page

### Information is incorrect
1. Check `info.md` file format
2. Make sure `|` separator exists between Arabic and English text
3. Make sure there's a space after `##` in headings

---

## Automatic Updates

Once you add a new artist and update `artistLoader.js`, the artist will automatically appear in:
- Home page
- Search results
- Their detail page

No need to edit any other files! 🎉

---

<a name="arabic"></a>
## العربية (Arabic)

# دليل إضافة فنانين جدد

## البنية الديناميكية

الموقع الآن يعمل بشكل ديناميكي بالكامل! يتم تحميل معلومات الفنانين تلقائياً من المجلدات.

---

## خطوات إضافة فنان جديد

### 1. إنشاء مجلد الفنان

قم بإنشاء مجلد جديد في:
```
public/artists/[اسم_الفنان]/
```

مثال:
```
public/artists/ahmed/
```

### 2. إضافة الصور

ضع الملفات التالية في مجلد الفنان:

**صورة الملف الشخصي (إلزامية):**
```
avatar.jpg
```

**صور الأعمال (اختيارية):**
```
work_1.png
work_2.png
work_3.png
...
```

ملاحظة: يمكنك إضافة أي عدد من الأعمال، فقط تأكد من ترقيمها بالتسلسل (work_1, work_2, work_3, ...)

### 3. إنشاء ملف المعلومات

أنشئ ملف `info.md` في مجلد الفنان بالصيغة التالية:

```markdown
# الاسم بالعربي | Name in English

## التخصص | Specialty
التخصص بالعربي | Specialty in English

## السيرة الذاتية | Bio
السيرة الذاتية بالعربي بشكل مفصل.

Detailed bio in English.

## شروط التعاون | Collaboration Terms
شروط التعاون والعمل بالعربي.

Collaboration terms and conditions in English.

## معلومات التواصل | Contact Information
- WhatsApp: https://wa.me/218XXXXXXXXX
- Telegram: https://t.me/+218XXXXXXXXX
- Facebook: https://facebook.com/username
- Instagram: https://instagram.com/username
- Email: email@example.com
- YouTube: https://youtube.com/@channel
```

### 4. تسجيل الفنان في النظام

افتح ملف `src/utils/artistLoader.js` وأضف اسم المجلد إلى القائمة:

```javascript
const artistFolders = ['khaled', 'alaa', 'ahmed']; // أضف الاسم الجديد هنا
```

---

## مثال كامل

### بنية المجلد
```
public/artists/ahmed/
├── avatar.jpg          (صورة الملف الشخصي)
├── work_1.png         (عمل 1)
├── work_2.png         (عمل 2)
├── work_3.png         (عمل 3)
└── info.md            (معلومات الفنان)
```

### محتوى info.md
```markdown
# م. أحمد محمد | Eng. Ahmed Mohamed

## التخصص | Specialty
تصميم داخلي وديكور | Interior Design & Decoration

## السيرة الذاتية | Bio
مصمم داخلي محترف مع خبرة 10 سنوات في مجال التصميم والإظهار المعماري.

Professional interior designer with 10 years of experience in design and architectural visualization.

## شروط التعاون | Collaboration Terms
نقدم خدمات تصميم متكاملة مع ضمان الجودة والالتزام بالمواعيد.

We provide comprehensive design services with quality assurance and deadline commitment.

## معلومات التواصل | Contact Information
- WhatsApp: https://wa.me/218912345678
- Email: ahmed@example.com
- Instagram: https://instagram.com/ahmed_design
```

---

## ملاحظات مهمة

### أسماء الملفات
- يجب أن تكون أسماء المجلدات بالإنجليزية وبدون مسافات
- استخدم الشرطة السفلية (_) أو الشرطة (-) بدلاً من المسافات
- مثال صحيح: `ahmed_mohamed` أو `ahmed-mohamed`
- مثال خاطئ: `ahmed mohamed` أو `أحمد محمد`

### الصور
- الصورة الشخصية يجب أن تكون بصيغة JPG
- صور الأعمال يمكن أن تكون PNG أو JPG
- يُفضل أن تكون الصور بجودة عالية ولكن بحجم معقول (أقل من 2MB)

### روابط التواصل
المنصات المدعومة:
- WhatsApp
- Telegram
- Facebook
- Instagram
- Email (Gmail أو أي بريد آخر)
- YouTube

يمكنك إضافة أي عدد من الروابط أو حذف ما لا تحتاجه.

---

## استكشاف الأخطاء

### الفنان لا يظهر في الموقع
1. تأكد من إضافة اسم المجلد في `artistFolders` في ملف `artistLoader.js`
2. تأكد من وجود ملف `info.md` في مجلد الفنان
3. تأكد من وجود صورة `avatar.jpg`
4. تحقق من console في المتصفح للأخطاء

### الصور لا تظهر
1. تأكد من أسماء الملفات صحيحة (avatar.jpg, work_1.png, work_2.png, ...)
2. تأكد من أن الصور في المجلد الصحيح
3. جرب مسح الكاش وإعادة تحميل الصفحة

### المعلومات غير صحيحة
1. تحقق من صيغة ملف `info.md`
2. تأكد من وجود الفواصل `|` بين النصوص العربية والإنجليزية
3. تأكد من وجود مسافة بعد `##` في العناوين

---

## التحديثات التلقائية

بمجرد إضافة فنان جديد وتحديث ملف `artistLoader.js`، سيظهر الفنان تلقائياً في:
- الصفحة الرئيسية
- نتائج البحث
- صفحة التفاصيل الخاصة به

لا حاجة لتعديل أي ملفات أخرى! 🎉
