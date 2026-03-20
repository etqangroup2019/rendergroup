#!/usr/bin/env node

/**
 * سكريبت مساعد لإضافة فنان جديد
 * Helper script to add a new artist
 * 
 * Usage: node scripts/add-artist.js [artist-folder-name]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const artistName = process.argv[2];

if (!artistName) {
  console.error('❌ يرجى تحديد اسم المجلد للفنان');
  console.error('❌ Please provide the artist folder name');
  console.log('\nUsage: node scripts/add-artist.js [artist-folder-name]');
  console.log('Example: node scripts/add-artist.js mohamed');
  process.exit(1);
}

// التحقق من صحة اسم المجلد
if (!/^[a-z0-9_-]+$/.test(artistName)) {
  console.error('❌ اسم المجلد يجب أن يحتوي فقط على حروف إنجليزية صغيرة وأرقام و _ و -');
  console.error('❌ Folder name must contain only lowercase letters, numbers, _ and -');
  process.exit(1);
}

const projectRoot = path.join(__dirname, '..');
const artistsDir = path.join(projectRoot, 'public', 'artists');
const artistDir = path.join(artistsDir, artistName);

// التحقق من وجود المجلد
if (fs.existsSync(artistDir)) {
  console.error(`❌ المجلد ${artistName} موجود بالفعل`);
  console.error(`❌ Folder ${artistName} already exists`);
  process.exit(1);
}

// إنشاء المجلد
console.log(`📁 إنشاء مجلد: ${artistName}`);
console.log(`📁 Creating folder: ${artistName}`);
fs.mkdirSync(artistDir, { recursive: true });

// إنشاء ملف info.md
const infoTemplate = `# اسم الفنان بالعربي | Artist Name in English

## التخصص | Specialty
التخصص بالعربي | Specialty in English

## السيرة الذاتية | Bio
السيرة الذاتية بالعربي - اكتب هنا نبذة عن الفنان وخبراته.

Bio in English - Write here about the artist and their experience.

## شروط التعاون | Collaboration Terms
شروط التعاون والعمل بالعربي - اكتب هنا الشروط والأسعار إن وجدت.

Collaboration terms and conditions in English - Write here the terms and pricing if any.

## معلومات التواصل | Contact Information
- WhatsApp: https://wa.me/218XXXXXXXXX
- Telegram: https://t.me/username
- Facebook: https://facebook.com/username
- Instagram: https://instagram.com/username
- Email: email@example.com
- YouTube: https://youtube.com/@channel
`;

const infoPath = path.join(artistDir, 'info.md');
fs.writeFileSync(infoPath, infoTemplate, 'utf8');
console.log(`✅ تم إنشاء ملف info.md`);
console.log(`✅ Created info.md file`);

// تحديث artistLoader.js
const loaderPath = path.join(projectRoot, 'src', 'utils', 'artistLoader.js');
let loaderContent = fs.readFileSync(loaderPath, 'utf8');

// البحث عن السطر الذي يحتوي على artistFolders
const folderLineRegex = /const artistFolders = \[(.*?)\];/s;
const match = loaderContent.match(folderLineRegex);

if (match) {
  const currentFolders = match[1]
    .split(',')
    .map(f => f.trim().replace(/['"]/g, ''))
    .filter(f => f);
  
  if (!currentFolders.includes(artistName)) {
    currentFolders.push(artistName);
    const newFoldersLine = `const artistFolders = [${currentFolders.map(f => `'${f}'`).join(', ')}];`;
    loaderContent = loaderContent.replace(folderLineRegex, newFoldersLine);
    fs.writeFileSync(loaderPath, loaderContent, 'utf8');
    console.log(`✅ تم تحديث artistLoader.js`);
    console.log(`✅ Updated artistLoader.js`);
  }
}

console.log('\n✨ تم إنشاء الفنان بنجاح! | Artist created successfully!');
console.log('\n📝 الخطوات التالية | Next steps:');
console.log(`1. أضف صورة الملف الشخصي: public/artists/${artistName}/avatar.jpg`);
console.log(`   Add profile picture: public/artists/${artistName}/avatar.jpg`);
console.log(`2. أضف صور الأعمال: public/artists/${artistName}/work_1.png, work_2.png, ...`);
console.log(`   Add work images: public/artists/${artistName}/work_1.png, work_2.png, ...`);
console.log(`3. عدّل ملف المعلومات: public/artists/${artistName}/info.md`);
console.log(`   Edit info file: public/artists/${artistName}/info.md`);
console.log('\n🚀 ثم قم بتشغيل: npm run dev');
console.log('🚀 Then run: npm run dev');
