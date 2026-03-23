/**
 * Dynamic Artist Loader
 * يقوم بقراءة مجلدات الفنانين تلقائياً من public/artists
 */

// قائمة الفنانين - يتم تحديثها يدوياً عند إضافة فنان جديد
const artistFolders = ['khaled', 'alaa', 'elmo_altagore', 'ehab_hassn'];

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

    // البحث عن صورة الأفاتار بجميع الامتدادات الممكنة
    let avatar = `${basePath}artists/${folderName}/avatar.jpg`;
    const avatarExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    for (const ext of avatarExtensions) {
      const testPath = `${basePath}artists/${folderName}/avatar.${ext}`;
      try {
        const response = await fetch(testPath, { method: 'HEAD' });
        if (response.ok) {
          avatar = testPath;
          break;
        }
      } catch (e) {}
    }
    
    const works = [];
    
    // إذا كنت نريد التفاصيل الكاملة، نبحث عن صور الأعمال
    if (!summaryOnly) {
      const extensions = ['webp', 'png', 'jpg', 'jpeg'];
      let i = 1;
      const CHUNK_SIZE = 4; // فحص 4 صور متوازية في كل مرة (كل صورة تجربة 4 صيغ)
      
      while (i <= 100) {
        const chunkPromises = [];
        
        // تجهيز مجموعة من الطلبات المتوازية
        for (let j = 0; j < CHUNK_SIZE; j++) {
          const currentIndex = i + j;
          chunkPromises.push((async () => {
            // تجربة جميع الصيغ لهذه الصورة بالتوازي
            const extPromises = extensions.map(async (ext) => {
              const path = `${basePath}artists/${folderName}/${currentIndex}.${ext}`;
              try {
                const response = await fetch(path, { method: 'HEAD' });
                if (response.ok) {
                  const contentType = response.headers.get('content-type');
                  if (contentType && contentType.includes('image')) {
                    return path;
                  }
                }
              } catch (e) {}
              return null;
            });
            
            const paths = await Promise.all(extPromises);
            return paths.find(p => p !== null); // إرجاع أول صيغة ناجحة
          })());
        }
        
        const chunkResults = await Promise.all(chunkPromises);
        
        let foundAnyInChunk = false;
        for (const path of chunkResults) {
          if (path) {
            works.push(path);
            foundAnyInChunk = true;
          } else {
            // توقف عند أول صورة مفقودة لضمان الترتيب
            i = 101; // لكسر الـ while
            foundAnyInChunk = false;
            break;
          }
        }
        
        if (!foundAnyInChunk) break;
        i += CHUNK_SIZE;
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
  const validArtists = results.filter(artist => artist !== null);
  
  // ترتيب الفنانين أبجدياً حسب الاسم العربي
  validArtists.sort((a, b) => {
    const nameA = a.name.ar || '';
    const nameB = b.name.ar || '';
    return nameA.localeCompare(nameB, 'ar');
  });
  
  return validArtists;
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
