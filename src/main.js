import './style.css';
import { translations } from './data/artists.js';
import { loadAllArtists } from './utils/artistLoader.js';

const app = document.querySelector('#app');

// State management
let state = {
  page: 'home',
  selectedArtist: null,
  lang: localStorage.getItem('lang') || 'ar',
  theme: localStorage.getItem('theme') || 'dark',
  searchQuery: '',
  loading: true
};

// تحميل الفنانين ديناميكياً
let artists = [];
loadAllArtists().then(loadedArtists => {
  artists = loadedArtists;
  state.loading = false;
  
  // التحقق من URL بعد تحميل الفنانين
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = parseInt(urlParams.get('artist'));
  if (artistId) {
    const artist = artists.find(a => a.id === artistId);
    if (artist) {
      state.page = 'detail';
      state.selectedArtist = artist;
      window.history.replaceState({ page: 'detail', artistId }, '', window.location.href);
    }
  } else {
    window.history.replaceState({ page: 'home', artistId: null }, '', window.location.href);
  }
  
  render();
}).catch(error => {
  console.error('Error loading artists:', error);
  state.loading = false;
  render();
});

// PWA Installation
let deferredPrompt;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

function showInstallButton() {
  const btn = document.getElementById('installBtn');
  if (btn && !isStandalone) {
    btn.classList.remove('hidden');
  }
}

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  document.getElementById('installBtn')?.classList.add('hidden');
});

function setState(newState, pushHistory = true) {
  const oldPage = state.page;
  const oldArtistId = state.selectedArtist?.id;

  state = { ...state, ...newState };
  localStorage.setItem('lang', state.lang);
  localStorage.setItem('theme', state.theme);

  if (pushHistory && (state.page !== oldPage || state.selectedArtist?.id !== oldArtistId)) {
    const path = state.page === 'home' ? '' : `?artist=${state.selectedArtist.id}`;
    window.history.pushState({
      page: state.page,
      artistId: state.selectedArtist?.id
    }, '', window.location.pathname + path);
  }

  updateTheme();
  updateDir();
  render();
}

window.addEventListener('popstate', (event) => {
  if (event.state) {
    const artist = event.state.artistId ? artists.find(a => a.id === event.state.artistId) : null;
    setState({
      page: event.state.page,
      selectedArtist: artist
    }, false);
  } else {
    setState({ page: 'home', selectedArtist: null }, false);
  }
});

function updateTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function updateDir() {
  document.documentElement.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', state.lang);
}

const t = (key) => translations[state.lang][key];

function formatContent(text) {
  if (!text) return '';
  
  // تقسيم النص إلى أسطر
  const lines = text.split('\n').filter(line => line.trim());
  
  return lines.map(line => {
    const trimmed = line.trim();
    
    // إذا كان السطر يبدأ برقم متبوع بنقطة (مثل "1." أو "١.")
    if (/^[\d\u0660-\u0669]+\./.test(trimmed)) {
      return `<div class="list-item">
        <span class="list-number">${trimmed.match(/^[\d\u0660-\u0669]+/)[0]}</span>
        <span class="list-text">${trimmed.replace(/^[\d\u0660-\u0669]+\.\s*/, '')}</span>
      </div>`;
    }
    
    // إذا كان سطر عادي
    return `<div class="text-line">${trimmed}</div>`;
  }).join('');
}

function render() {
  if (state.page === 'home') {
    renderHome();
  } else {
    renderDetail(state.selectedArtist);
  }

  if (isIOS && !isStandalone && !document.getElementById('iosModal')) {
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = getIOSModal();
    document.body.appendChild(modalDiv.firstElementChild);
  }
}

function getNavbar() {
  return `
    <nav>
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <a href="#" class="logo home-link" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
            <img src="./app_icon.png" alt="Logo" style="height: 32px; width: 32px; object-fit: contain;">
            <span>${t('title')}</span>
          </a>
          <span class="nav-subtitle" style="font-weight: 500; font-size: 0.8rem; opacity: 0.7;">${t('subtitle')}</span>
        </div>
        <div class="controls">
          <button id="installBtn" class="install-btn hidden">
            <i class="fas fa-download"></i>
            <span>${t('installApp')}</span>
          </button>
          <button class="theme-toggle" id="themeBtn">
            <i class="fas fa-${state.theme === 'dark' ? 'sun' : 'moon'}"></i>
          </button>
          <button class="lang-toggle" id="langBtn">
            ${t('langName')}
          </button>
        </div>
      </div>
    </nav>
  `;
}

function attachGlobalListeners() {
  document.getElementById('themeBtn')?.addEventListener('click', () => {
    setState({ theme: state.theme === 'dark' ? 'light' : 'dark' }, false);
  });
  document.getElementById('langBtn')?.addEventListener('click', () => {
    setState({ lang: state.lang === 'ar' ? 'en' : 'ar' }, false);
  });
  document.querySelectorAll('.home-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      setState({ page: 'home', selectedArtist: null });
    });
  });

  // Install button
  const installBtn = document.getElementById('installBtn');
  if (deferredPrompt || (isIOS && !isStandalone)) {
    installBtn?.classList.remove('hidden');
  }

  installBtn?.addEventListener('click', async () => {
    if (isIOS) {
      document.getElementById('iosModal')?.classList.add('show');
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') deferredPrompt = null;
    }
  });

  document.getElementById('closeIosModal')?.addEventListener('click', () => {
    document.getElementById('iosModal')?.classList.remove('show');
  });
}

function getIOSModal() {
  return `
    <div id="iosModal" class="ios-modal">
      <div class="ios-modal-content">
        <div class="ios-modal-title">${t('iosInstallTitle')}</div>
        <div class="ios-step">
          <div class="ios-step-num">1</div>
          <div>${t('iosInstallStep1')}</div>
        </div>
        <div class="ios-step">
          <div class="ios-step-num">2</div>
          <div>${t('iosInstallStep2')}</div>
        </div>
        <button id="closeIosModal" class="close-modal">${t('close')}</button>
      </div>
    </div>
  `;
}

function renderHome() {
  // عرض شاشة التحميل
  if (state.loading) {
    app.innerHTML = `
      ${getNavbar()}
      <div class="container" style="text-align: center; padding: 100px 20px;">
        <div style="font-size: 3rem; color: var(--primary); margin-bottom: 20px;">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p style="color: var(--text-muted); font-size: 1.2rem;">
          ${state.lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
        </p>
      </div>
    `;
    attachGlobalListeners();
    return;
  }

  const renderArtists = (filtered) => {
    return filtered.map(artist => `
      <div class="card fade-in">
        <img src="${artist.avatar}" alt="${artist.name[state.lang]}" class="card-img">
        <div class="card-content">
          <div class="card-title">${artist.name[state.lang]}</div>
          <div class="card-info">${artist.specialty[state.lang]}</div>
          <button class="btn btn-primary view-btn" data-id="${artist.id}" style="width: 100%;">${t('viewProfile')}</button>
        </div>
      </div>
    `).join('') + (filtered.length === 0 ? `<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">${state.lang === 'ar' ? 'لا توجد نتائج' : 'No results found'}</p>` : '');
  };

  const filteredArtists = artists.filter(artist =>
    artist.name[state.lang].toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    artist.name['ar'].toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    artist.name['en'].toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  app.innerHTML = `
    ${getNavbar()}
    <header class="hero container fade-in">
      <h1>${t('heroTitle').replace('الواقعية الخيالية', `<span style="color: var(--primary)">الواقعية الخيالية</span>`)}</h1>
      <p>${t('heroDesc')}</p>
      <div class="search-box" style="margin-top: 25px; max-width: 400px; margin-left: auto; margin-right: auto;">
        <div style="position: relative;">
          <i class="fas fa-search" style="position: absolute; top: 50%; transform: translateY(-50%); ${state.lang === 'ar' ? 'right: 15px' : 'left: 15px'}; color: var(--text-muted);"></i>
          <input 
            type="text" 
            id="searchInput" 
            dir="auto"
            placeholder="${t('searchPlaceholder')}" 
            value="${state.searchQuery}"
            style="width: 100%; padding: 12px 45px; border-radius: 50px; border: 2px solid var(--border-color); background: var(--card-bg); color: var(--text); font-size: 1rem; outline: none; transition: border-color 0.3s; text-align: ${state.lang === 'ar' ? 'right' : 'left'};"
          >
        </div>
      </div>
    </header>

    <main class="container">
      <div class="artist-grid" id="artistGrid">
        ${renderArtists(filteredArtists)}
      </div>
    </main>
  `;

  attachGlobalListeners();

  const attachViewBtnListeners = () => {
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const artist = artists.find(a => a.id === id);
        setState({ page: 'detail', selectedArtist: artist });
      });
    });
  };

  attachViewBtnListeners();

  // Search input listener
  const searchInput = document.getElementById('searchInput');
  const artistGrid = document.getElementById('artistGrid');

  searchInput?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    const newFiltered = artists.filter(artist =>
      artist.name[state.lang].toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      artist.name['ar'].toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      artist.name['en'].toLowerCase().includes(state.searchQuery.toLowerCase())
    );
    if (artistGrid) {
      artistGrid.innerHTML = renderArtists(newFiltered);
      attachViewBtnListeners();
    }
  });
}

function renderDetail(artist) {
  if (!artist) { setState({ page: 'home' }); return; }

  app.innerHTML = `
    ${getNavbar()}
    <div class="container" style="margin-top: 20px;">
      <a href="#" class="home-link back-link" style="text-decoration: none; color: var(--primary); font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
        <i class="fas fa-arrow-right"></i>
        ${t('backHome')}
      </a>
    </div>
    <header class="container fade-in" style="margin-top: 20px;">
      <div class="detail-header">
        <img src="${artist.avatar}" alt="${artist.name[state.lang]}" class="artist-avatar">
        <div style="flex: 1;">
          <h1 style="margin-bottom: 0.5rem;">${artist.name[state.lang]}</h1>
          <p style="color: var(--primary); font-weight: 600; font-size: 1.2rem;">${artist.specialty[state.lang]}</p>
          <p style="color: var(--text-muted); margin-top: 1rem;">${artist.bio[state.lang]}</p>
          
          <div class="social-links">
            ${Object.entries(artist.socials).map(([platform, url]) => {
    const socialConfig = {
      whatsapp: { icon: 'fab fa-whatsapp', color: '#25D366' },
      telegram: { icon: 'fab fa-telegram-plane', color: '#0088cc' },
      facebook: { icon: 'fab fa-facebook-f', color: '#1877f2' },
      instagram: { icon: 'fab fa-instagram', color: '#E4405F' },
      behance: { icon: 'fab fa-behance', color: '#1769ff' },
      gmail: { icon: 'far fa-envelope', color: '#ea4335' },
      email: { icon: 'far fa-envelope', color: '#ea4335' },
      youtube: { icon: 'fab fa-youtube', color: '#ff0000' }
    };
    const config = socialConfig[platform] || { icon: 'fas fa-link', color: 'var(--primary)' };
    
    // تحويل جميع الإيميلات إلى رابط Gmail
    let finalUrl = url;
    if (platform === 'email' || platform === 'gmail') {
      const emailAddress = url.replace('mailto:', '').trim();
      // استخدام Gmail لجميع الإيميلات
      finalUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
    }
    
    return `<a href="${finalUrl}" target="_blank" class="social-btn ${platform}"><i class="${config.icon}" style="color: ${config.color};"></i></a>`;
  }).join('')}
          </div>
        </div>
      </div>
    </header>

    ${artist.process && artist.process[state.lang] ? `
    <section class="container fade-in" style="margin-top: 40px;">
      <h2 style="border-bottom: 2px solid var(--primary); display: inline-block; padding-bottom: 5px;">${state.lang === 'ar' ? 'طريقة التعاون' : 'Collaboration Process'}</h2>
      <div class="process-content">
        ${formatContent(artist.process[state.lang])}
      </div>
    </section>
    ` : ''}

    <section class="container fade-in" style="margin-top: 40px;">
      <h2 style="border-bottom: 2px solid var(--primary); display: inline-block; padding-bottom: 5px;">${t('termsTitle')}</h2>
      <div class="terms-content">
        ${formatContent(artist.terms[state.lang])}
      </div>
    </section>

    <section class="container fade-in" style="margin-top: 60px; padding-bottom: 100px;">
      <h2 style="margin-bottom: 30px;">${t('galleryTitle')}</h2>
      ${artist.works && artist.works.length > 0 ? `
        <div class="gallery">
          ${artist.works.map((work, idx) => `
            <div class="gallery-item" data-index="${idx}">
              <img src="${work}" alt="Project Work" loading="lazy">
            </div>
          `).join('')}
        </div>
      ` : `
        <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <i class="fas fa-images" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3;"></i>
          <p>${state.lang === 'ar' ? 'لا توجد أعمال متاحة حالياً' : 'No works available at the moment'}</p>
        </div>
      `}
    </section>
    
    <!-- Image Lightbox -->
    <div id="lightbox" class="lightbox">
      <button class="lightbox-close" id="lightboxClose">
        <i class="fas fa-times"></i>
      </button>
      <button class="lightbox-nav lightbox-prev" id="lightboxPrev">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="lightbox-nav lightbox-next" id="lightboxNext">
        <i class="fas fa-chevron-right"></i>
      </button>
      <div class="lightbox-content">
        <img id="lightboxImage" src="" alt="Full size image">
      </div>
      <div class="lightbox-info">
        <div class="lightbox-counter" id="lightboxCounter"></div>
        <div class="lightbox-description" id="lightboxDescription"></div>
      </div>
    </div>
  `;

  attachGlobalListeners();
  attachLightboxListeners(artist.works, artist.imageDescriptions || { ar: [], en: [] });
}

function attachLightboxListeners(works, descriptions) {
  if (!works || works.length === 0) return;

  let currentIndex = 0;
  let scale = 1;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxDescription = document.getElementById('lightboxDescription');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function showImage(index) {
    currentIndex = index;
    const imgSrc = works[index];
    
    // Show loading state
    lightboxImage.style.opacity = '0.5';
    
    // Create a new image to test loading
    const testImg = new Image();
    testImg.onload = () => {
      lightboxImage.src = imgSrc;
      lightboxImage.style.opacity = '1';
      lightboxCounter.textContent = `${index + 1} / ${works.length}`;
      
      // Show description if available (use current language)
      const currentDescriptions = descriptions[state.lang] || descriptions.ar || [];
      if (currentDescriptions && currentDescriptions[index]) {
        lightboxDescription.textContent = currentDescriptions[index];
        lightboxDescription.style.display = 'block';
      } else {
        lightboxDescription.style.display = 'none';
      }
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      resetTransform();
      
      // Preload next and previous images
      if (works[index + 1]) {
        const nextImg = new Image();
        nextImg.src = works[index + 1];
      }
      if (works[index - 1]) {
        const prevImg = new Image();
        prevImg.src = works[index - 1];
      }
    };
    testImg.onerror = () => {
      console.error('Failed to load image:', imgSrc);
      lightboxImage.style.opacity = '1';
      // Try to show anyway
      lightboxImage.src = imgSrc;
      lightboxCounter.textContent = `${index + 1} / ${works.length}`;
      
      // Show description if available (use current language)
      const currentDescriptions = descriptions[state.lang] || descriptions.ar || [];
      if (currentDescriptions && currentDescriptions[index]) {
        lightboxDescription.textContent = currentDescriptions[index];
        lightboxDescription.style.display = 'block';
      } else {
        lightboxDescription.style.display = 'none';
      }
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      resetTransform();
    };
    testImg.src = imgSrc;
  }

  function resetTransform() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  }

  function updateTransform() {
    lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    resetTransform();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % works.length;
    showImage(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + works.length) % works.length;
    showImage(currentIndex);
  }

  // Gallery item clicks
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Get the actual image src from the gallery item
      const imgElement = item.querySelector('img');
      if (imgElement && imgElement.src) {
        showImage(index);
      }
    });
  });

  // Close button
  lightboxClose.addEventListener('click', closeLightbox);

  // Navigation buttons
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Zoom with mouse wheel
  lightboxImage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.min(Math.max(1, scale + delta), 5);
    updateTransform();
  });

  // Drag to pan when zoomed
  lightboxImage.addEventListener('mousedown', (e) => {
    if (scale > 1) {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      lightboxImage.style.cursor = 'grabbing';
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    lightboxImage.style.cursor = scale > 1 ? 'grab' : 'default';
  });

  // Touch support for mobile
  let touchStartDistance = 0;
  let initialScale = 1;
  let touchStartX = 0;
  let touchStartY = 0;

  lightboxImage.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      // Pinch to zoom
      e.preventDefault();
      touchStartDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan when zoomed
      e.preventDefault();
      isDragging = true;
      touchStartX = e.touches[0].clientX - translateX;
      touchStartY = e.touches[0].clientY - translateY;
    }
  }, { passive: false });

  lightboxImage.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      scale = Math.min(Math.max(1, initialScale * (distance / touchStartDistance)), 5);
      updateTransform();
    } else if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      translateX = e.touches[0].clientX - touchStartX;
      translateY = e.touches[0].clientY - touchStartY;
      updateTransform();
    }
  }, { passive: false });

  lightboxImage.addEventListener('touchend', (e) => {
    isDragging = false;
  });

  // Double tap to zoom
  let lastTap = 0;
  lightboxImage.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      e.preventDefault();
      if (scale === 1) {
        scale = 2.5;
      } else {
        resetTransform();
      }
      updateTransform();
    }
    lastTap = currentTime;
  });
}

// Initial
updateTheme();
updateDir();
render();

// Service Worker Registration with Auto-Update
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const swPath = 'sw.js';
    navigator.serviceWorker.register(swPath)
      .then(reg => {
        console.log('SW Registered');

        // Check for updates every 60 seconds
        setInterval(() => {
          reg.update();
        }, 60 * 1000);

        // Check for updates on page focus
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            reg.update();
          }
        });

        // Handle updates
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content available - notify user or auto-refresh
                console.log('New content available, refreshing...');
                // Tell SW to skip waiting
                installingWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            }
          };
        };
      })
      .catch(err => console.error('SW Registration Failed', err));

    // Reload page when new SW takes control
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}
