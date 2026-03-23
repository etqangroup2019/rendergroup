/**
 * Dynamic Artist Loader
 * يقوم بقراءة مجلدات الفنانين تلقائياً من public/artists
 */

// قائمة الفنانين - يتم تحديثها يدوياً عند إضافة فنان جديد
const artistFolders = ['khaled', 'alaa'];

/**
 * تحليل ملف MD واستخراج المعلومات
 */
function parseMD(content) {
  const lines = content.split('\n');
  const data = {
    name: { ar: '', en: '' },
    specialty: { ar: '', en: '' },
    bio: { ar: '', en: '' },
    terms: { ar: '', en: '' },
    process: { ar: '', en: '' },
    socials: {},
    imageDescriptions: { ar: [], en: [] }
  };

  let currentSection = '';
  let currentLang = null; // null, 'en', or 'ar'
  let inImageDescriptions = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // تحديد اللغة الحالية من الأقسام
    if (line.includes('<a name="english"></a>')) {
      currentLang = 'en';
      inImageDescriptions = false;
      continue;
    } else if (line.includes('<a name="arabic"></a>')) {
      currentLang = 'ar';
      inImageDescriptions = false;
      continue;
    }

    // استخراج العنوان الرئيسي (الاسم) حسب اللغة الحالية
    if (line.startsWith('# ') && currentLang) {
      const name = line.substring(2).trim();
      if (currentLang === 'en' && !data.name.en) {
        data.name.en = name;
      } else if (currentLang === 'ar' && !data.name.ar) {
        data.name.ar = name;
      }
      continue;
    }

    // تحديد القسم الحالي
    if (line.startsWith('## ')) {
      const sectionTitle = line.substring(3).toLowerCase();
      if (sectionTitle.includes('تخصص') || sectionTitle.includes('specialty')) {
        currentSection = 'specialty';
        inImageDescriptions = false;
      } else if (sectionTitle.includes('سيرة') || sectionTitle.includes('bio')) {
        currentSection = 'bio';
        inImageDescriptions = false;
      } else if (sectionTitle.includes('شروط') || sectionTitle.includes('terms')) {
        currentSection = 'terms';
        inImageDescriptions = false;
      } else if (sectionTitle.includes('طريقة') || sectionTitle.includes('process') || sectionTitle.includes('workflow')) {
        currentSection = 'process';
        inImageDescriptions = false;
      } else if (sectionTitle.includes('تواصل') || sectionTitle.includes('contact')) {
        currentSection = 'contact';
        inImageDescriptions = false;
      } else if (sectionTitle.includes('وصف الصور') || sectionTitle.includes('image descriptions')) {
        currentSection = 'imageDescriptions';
        inImageDescriptions = true;
      } else {
        // إذا كان قسم غير معروف، نعيد تعيين القسم
        if (!sectionTitle.includes('english') && !sectionTitle.includes('arabic')) {
          currentSection = '';
          inImageDescriptions = false;
        }
      }
      continue;
    }

    // استخراج روابط التواصل (من أي لغة)
    if (currentSection === 'contact' && line.startsWith('- ')) {
      const match = line.match(/- (\w+):\s*(.+)/);
      if (match) {
        const platform = match[1].toLowerCase();
        const url = match[2].trim();
        data.socials[platform] = url;
      }
      continue;
    }

    // استخراج أوصاف الصور حسب اللغة
    if (inImageDescriptions && currentLang && line.match(/^\d+\./)) {
      const description = line.replace(/^\d+\.\s*/, '').trim();
      if (currentLang === 'ar') {
        data.imageDescriptions.ar.push(description);
      } else if (currentLang === 'en') {
        data.imageDescriptions.en.push(description);
      }
      continue;
    }

    // استخراج المحتوى النصي حسب اللغة الحالية (دعم أسطر متعددة)
    if (line && !line.startsWith('#') && !line.startsWith('-') && !line.startsWith('<') && !line.startsWith('[') && currentSection && currentLang) {
      if (currentSection !== 'contact' && currentSection !== 'imageDescriptions') {
        if (currentLang === 'en') {
          // إضافة النص مع فاصل سطر إذا كان هناك محتوى سابق
          if (data[currentSection].en) {
            data[currentSection].en += '\n' + line;
          } else {
            data[currentSection].en = line;
          }
        } else if (currentLang === 'ar') {
          // إضافة النص مع فاصل سطر إذا كان هناك محتوى سابق
          if (data[currentSection].ar) {
            data[currentSection].ar += '\n' + line;
          } else {
            data[currentSection].ar = line;
          }
        }
      }
    }
  }

  return data;
}

/**
 * تحميل معلومات فنان واحد
 * summaryOnly: إذا كان صحيحاً، سيتم تحميل المعلومات الأساسية فقط (بدون البحث عن جميع صور الأعمال)
 */
async function loadArtist(folderName, index, summaryOnly = false) {
  try {
    // الحصول على base path من vite config
    const basePath = import.meta.env.BASE_URL || '/';
    
    // قراءة ملف MD
    const mdPath = `${basePath}artists/${folderName}/info.md`;
    const mdResponse = await fetch(mdPath);
    if (!mdResponse.ok) {
      console.error(`Failed to load info.md for ${folderName}`);
      return null;
    }
    const mdContent = await mdResponse.text();
    const artistData = parseMD(mdContent);

    // البحث عن الصور في المجلد
    const avatar = `${basePath}artists/${folderName}/avatar.jpg`;
    const works = [];
    
    // إذا كنت نريد التفاصيل الكاملة، نبحث عن صور الأعمال
    if (!summaryOnly) {
      // محاولة تحميل صور الأعمال - نحاول فقط حتى نفشل
      for (let i = 1; i <= 100; i++) {
        // جرب التنسيقات المدعومة (الترتيب يمثل الأفضلية)
        const extensions = ['webp', 'png', 'jpg', 'jpeg'];
        let foundImage = false;
        
        for (const ext of extensions) {
          const path = `${basePath}artists/${folderName}/${i}.${ext}`;
          try {
            const response = await fetch(path);
            if (response.ok) {
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.includes('image')) {
                works.push(path);
                foundImage = true;
                break;
              }
            }
          } catch (e) {
            // تجاهل أخطاء الشبكة
          }
        }
        
        // إذا لم نجد أي صورة لهذا الرقم، نتوقف عن البحث
        if (!foundImage) break;
      }
    }

    return {
      id: index + 1,
      folder: folderName,
      name: artistData.name,
      specialty: artistData.specialty,
      bio: artistData.bio,
      avatar: avatar,
      works: works,
      terms: artistData.terms,
      process: artistData.process,
      socials: artistData.socials,
      imageDescriptions: artistData.imageDescriptions,
      isFullData: !summaryOnly
    };
  } catch (error) {
    console.error(`Error loading artist ${folderName}:`, error);
    return null;
  }
}

/**
 * تحميل جميع الفنانين (المعلومات الأساسية فقط)
 */
export async function loadAllArtists() {
  const promises = artistFolders.map((folder, index) => loadArtist(folder, index, true));
  const results = await Promise.all(promises);
  return results.filter(artist => artist !== null);
}

/**
 * تحميل التفاصيل الكاملة لفنان (بما في ذلك قائمة الأعمال)
 */
export async function loadArtistFull(artist) {
  if (artist.isFullData) return artist;
  const index = artistFolders.indexOf(artist.folder);
  return await loadArtist(artist.folder, index, false);
}

/**
 * إضافة فنان جديد إلى القائمة
 * يجب استدعاء هذه الدالة عند إضافة مجلد فنان جديد
 */
export function registerArtist(folderName) {
  if (!artistFolders.includes(folderName)) {
    artistFolders.push(folderName);
  }
}

/**
 * الحصول على قائمة مجلدات الفنانين
 */
export function getArtistFolders() {
  return [...artistFolders];
}
