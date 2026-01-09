import './style.css';
import { artists, translations } from './data/artists.js';

const app = document.querySelector('#app');

// State management
let state = {
  page: 'home',
  selectedArtist: null,
  lang: localStorage.getItem('lang') || 'ar',
  theme: localStorage.getItem('theme') || 'dark',
  searchQuery: ''
};

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

function render() {
  if (state.page === 'home') {
    renderHome();
  } else {
    renderDetail(state.selectedArtist);
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
}

function renderHome() {
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
    const icons = {
      whatsapp: 'fab fa-whatsapp',
      telegram: 'fab fa-telegram-plane',
      facebook: 'fab fa-facebook-f',
      instagram: 'fab fa-instagram',
      gmail: 'far fa-envelope',
      youtube: 'fab fa-youtube'
    };
    return `<a href="${url}" target="_blank" class="social-btn ${platform}"><i class="${icons[platform] || 'fas fa-link'}"></i></a>`;
  }).join('')}
          </div>
        </div>
      </div>
    </header>

    <section class="container fade-in" style="margin-top: 40px;">
      <h2 style="border-bottom: 2px solid var(--primary); display: inline-block; padding-bottom: 5px;">${t('termsTitle')}</h2>
      <p style="margin-top: 15px; background: var(--card-bg); padding: 20px; border-radius: 12px; border-${state.lang === 'ar' ? 'right' : 'left'}: 4px solid var(--primary);">
        ${artist.terms[state.lang]}
      </p>
    </section>

    <section class="container fade-in" style="margin-top: 60px; padding-bottom: 100px;">
      <h2 style="margin-bottom: 30px;">${t('galleryTitle')}</h2>
      <div class="gallery">
        ${artist.works.map(work => `
          <div class="gallery-item">
            <img src="${work}" alt="Project Work">
          </div>
        `).join('')}
      </div>
    </section>
  `;

  attachGlobalListeners();
}

// Initial
const urlParams = new URLSearchParams(window.location.search);
const artistId = parseInt(urlParams.get('artist'));
if (artistId) {
  const artist = artists.find(a => a.id === artistId);
  if (artist) {
    state.page = 'detail';
    state.selectedArtist = artist;
    // Replace current state so back button works correctly from start
    window.history.replaceState({ page: 'detail', artistId }, '', window.location.href);
  }
} else {
  window.history.replaceState({ page: 'home', artistId: null }, '', window.location.href);
}

updateTheme();
updateDir();
render();

// Service Worker Registration with Auto-Update
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swPath = import.meta.env.DEV ? '/sw.js' : 'sw.js';
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
