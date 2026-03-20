(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(o){if(o.ep)return;o.ep=!0;const c=t(o);fetch(o.href,c)}})();const z={ar:{title:"Render Hub",subtitle:"منصة فنانين الرندر",heroTitle:"استكشف عالم الواقعية الخيالية",heroDesc:"اكتشف أفضل فنانين الرندر في الوطن العربي وشاهد أعمالهم وتواصل معهم مباشرة لمشاريعك القادمة.",viewProfile:"عرض ملف الفنان",backHome:"← العودة للرئيسية",termsTitle:"شروط التعاون",galleryTitle:"معرض الأعمال",lightMode:"وضع فاتح",darkMode:"وضع مظلم",langName:"EN",specialty:"التخصص",bio:"السيرة الذاتية",searchPlaceholder:"ابحث عن فنان...",installApp:"تثبيت التطبيق",iosInstallTitle:"تثبيت على iPhone",iosInstallStep1:"اضغط على زر المشاركة في الأسفل <i class='far fa-share-square' style='color: #007aff; margin: 0 5px;'></i>",iosInstallStep2:"اختر 'إضافة إلى الشاشة الرئيسية' <i class='far fa-plus-square' style='color: #333; margin: 0 5px;'></i>",close:"إغلاق"},en:{title:"Render Hub",subtitle:"Artist Platform",heroTitle:"Explore the World of Unreal Realism",heroDesc:"Discover the best render artists in the region, view their portfolios, and contact them directly for your next project.",viewProfile:"View Profile",backHome:"← Back Home",termsTitle:"Collaboration Terms",galleryTitle:"Work Gallery",lightMode:"Light Mode",darkMode:"Dark Mode",langName:"عربي",specialty:"Specialty",bio:"Bio",searchPlaceholder:"Search for an artist...",installApp:"Install App",iosInstallTitle:"Install on iPhone",iosInstallStep1:"Tap the share button below <i class='far fa-share-square' style='color: #007aff; margin: 0 5px;'></i>",iosInstallStep2:"Select 'Add to Home Screen' <i class='far fa-plus-square' style='color: #333; margin: 0 5px;'></i>",close:"Close"}},F=["khaled","alaa"];function R(e){const l=e.split(`
`),t={name:{ar:"",en:""},specialty:{ar:"",en:""},bio:{ar:"",en:""},terms:{ar:"",en:""},process:{ar:"",en:""},socials:{}};let s="",o=null;for(let c=0;c<l.length;c++){const i=l[c].trim();if(i.includes('<a name="english"></a>')){o="en";continue}else if(i.includes('<a name="arabic"></a>')){o="ar";continue}if(i.startsWith("# ")&&o){const r=i.substring(2).trim();o==="en"&&!t.name.en?t.name.en=r:o==="ar"&&!t.name.ar&&(t.name.ar=r);continue}if(i.startsWith("## ")){const r=i.substring(3).toLowerCase();r.includes("تخصص")||r.includes("specialty")?s="specialty":r.includes("سيرة")||r.includes("bio")?s="bio":r.includes("شروط")||r.includes("terms")?s="terms":r.includes("طريقة")||r.includes("process")||r.includes("workflow")?s="process":r.includes("تواصل")||r.includes("contact")?s="contact":!r.includes("english")&&!r.includes("arabic")&&(s="");continue}if(s==="contact"&&i.startsWith("- ")){const r=i.match(/- (\w+):\s*(.+)/);if(r){const m=r[1].toLowerCase(),d=r[2].trim();t.socials[m]=d}continue}i&&!i.startsWith("#")&&!i.startsWith("-")&&!i.startsWith("<")&&!i.startsWith("[")&&s&&o&&s!=="contact"&&(o==="en"?t[s].en?t[s].en+=`
`+i:t[s].en=i:o==="ar"&&(t[s].ar?t[s].ar+=`
`+i:t[s].ar=i))}return t}async function G(e,l){try{const t="/rendergroup/",s=`${t}artists/${e}/info.md`,o=await fetch(s);if(!o.ok)return console.error(`Failed to load info.md for ${e}`),null;const c=await o.text(),i=R(c),r=`${t}artists/${e}/avatar.jpg`,m=[];for(let d=1;d<=100;d++){const x=`${t}artists/${e}/${d}.png`,L=`${t}artists/${e}/${d}.jpg`;let y=!1;try{const p=await fetch(x);if(p.ok&&p.headers.get("content-type")?.includes("image")){m.push(x),y=!0;continue}}catch{}if(!y)try{const p=await fetch(L);if(p.ok&&p.headers.get("content-type")?.includes("image")){m.push(L),y=!0;continue}}catch{}if(!y)break}return{id:l+1,folder:e,name:i.name,specialty:i.specialty,bio:i.bio,avatar:r,works:m,terms:i.terms,process:i.process,socials:i.socials}}catch(t){return console.error(`Error loading artist ${e}:`,t),null}}async function _(){const e=F.map((t,s)=>G(t,s));return(await Promise.all(e)).filter(t=>t!==null)}const P=document.querySelector("#app");let n={page:"home",selectedArtist:null,lang:localStorage.getItem("lang")||"ar",theme:localStorage.getItem("theme")||"dark",searchQuery:"",loading:!0},w=[];_().then(e=>{w=e,n.loading=!1;const l=new URLSearchParams(window.location.search),t=parseInt(l.get("artist"));if(t){const s=w.find(o=>o.id===t);s&&(n.page="detail",n.selectedArtist=s,window.history.replaceState({page:"detail",artistId:t},"",window.location.href))}else window.history.replaceState({page:"home",artistId:null},"",window.location.href);I()}).catch(e=>{console.error("Error loading artists:",e),n.loading=!1,I()});let f;const A=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,M=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),f=e,K()});function K(){const e=document.getElementById("installBtn");e&&!M&&e.classList.remove("hidden")}window.addEventListener("appinstalled",()=>{f=null,document.getElementById("installBtn")?.classList.add("hidden")});function v(e,l=!0){const t=n.page,s=n.selectedArtist?.id;if(n={...n,...e},localStorage.setItem("lang",n.lang),localStorage.setItem("theme",n.theme),l&&(n.page!==t||n.selectedArtist?.id!==s)){const o=n.page==="home"?"":`?artist=${n.selectedArtist.id}`;window.history.pushState({page:n.page,artistId:n.selectedArtist?.id},"",window.location.pathname+o)}N(),O(),I()}window.addEventListener("popstate",e=>{if(e.state){const l=e.state.artistId?w.find(t=>t.id===e.state.artistId):null;v({page:e.state.page,selectedArtist:l},!1)}else v({page:"home",selectedArtist:null},!1)});function N(){document.documentElement.setAttribute("data-theme",n.theme)}function O(){document.documentElement.setAttribute("dir",n.lang==="ar"?"rtl":"ltr"),document.documentElement.setAttribute("lang",n.lang)}const u=e=>z[n.lang][e];function q(e){return e?e.split(`
`).filter(t=>t.trim()).map(t=>{const s=t.trim();return/^[\d\u0660-\u0669]+\./.test(s)?`<div class="list-item">
        <span class="list-number">${s.match(/^[\d\u0660-\u0669]+/)[0]}</span>
        <span class="list-text">${s.replace(/^[\d\u0660-\u0669]+\.\s*/,"")}</span>
      </div>`:`<div class="text-line">${s}</div>`}).join(""):""}function I(){if(n.page==="home"?V():J(n.selectedArtist),A&&!M&&!document.getElementById("iosModal")){const e=document.createElement("div");e.innerHTML=U(),document.body.appendChild(e.firstElementChild)}}function C(){return`
    <nav>
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <a href="#" class="logo home-link" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
            <img src="./app_icon.png" alt="Logo" style="height: 32px; width: 32px; object-fit: contain;">
            <span>${u("title")}</span>
          </a>
          <span class="nav-subtitle" style="font-weight: 500; font-size: 0.8rem; opacity: 0.7;">${u("subtitle")}</span>
        </div>
        <div class="controls">
          <button id="installBtn" class="install-btn hidden">
            <i class="fas fa-download"></i>
            <span>${u("installApp")}</span>
          </button>
          <button class="theme-toggle" id="themeBtn">
            <i class="fas fa-${n.theme==="dark"?"sun":"moon"}"></i>
          </button>
          <button class="lang-toggle" id="langBtn">
            ${u("langName")}
          </button>
        </div>
      </div>
    </nav>
  `}function B(){document.getElementById("themeBtn")?.addEventListener("click",()=>{v({theme:n.theme==="dark"?"light":"dark"},!1)}),document.getElementById("langBtn")?.addEventListener("click",()=>{v({lang:n.lang==="ar"?"en":"ar"},!1)}),document.querySelectorAll(".home-link").forEach(l=>{l.addEventListener("click",t=>{t.preventDefault(),v({page:"home",selectedArtist:null})})});const e=document.getElementById("installBtn");(f||A&&!M)&&e?.classList.remove("hidden"),e?.addEventListener("click",async()=>{if(A)document.getElementById("iosModal")?.classList.add("show");else if(f){f.prompt();const{outcome:l}=await f.userChoice;l==="accepted"&&(f=null)}}),document.getElementById("closeIosModal")?.addEventListener("click",()=>{document.getElementById("iosModal")?.classList.remove("show")})}function U(){return`
    <div id="iosModal" class="ios-modal">
      <div class="ios-modal-content">
        <div class="ios-modal-title">${u("iosInstallTitle")}</div>
        <div class="ios-step">
          <div class="ios-step-num">1</div>
          <div>${u("iosInstallStep1")}</div>
        </div>
        <div class="ios-step">
          <div class="ios-step-num">2</div>
          <div>${u("iosInstallStep2")}</div>
        </div>
        <button id="closeIosModal" class="close-modal">${u("close")}</button>
      </div>
    </div>
  `}function V(){if(n.loading){P.innerHTML=`
      ${C()}
      <div class="container" style="text-align: center; padding: 100px 20px;">
        <div style="font-size: 3rem; color: var(--primary); margin-bottom: 20px;">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p style="color: var(--text-muted); font-size: 1.2rem;">
          ${n.lang==="ar"?"جاري التحميل...":"Loading..."}
        </p>
      </div>
    `,B();return}const e=c=>c.map(i=>`
      <div class="card fade-in">
        <img src="${i.avatar}" alt="${i.name[n.lang]}" class="card-img">
        <div class="card-content">
          <div class="card-title">${i.name[n.lang]}</div>
          <div class="card-info">${i.specialty[n.lang]}</div>
          <button class="btn btn-primary view-btn" data-id="${i.id}" style="width: 100%;">${u("viewProfile")}</button>
        </div>
      </div>
    `).join("")+(c.length===0?`<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">${n.lang==="ar"?"لا توجد نتائج":"No results found"}</p>`:""),l=w.filter(c=>c.name[n.lang].toLowerCase().includes(n.searchQuery.toLowerCase())||c.name.ar.toLowerCase().includes(n.searchQuery.toLowerCase())||c.name.en.toLowerCase().includes(n.searchQuery.toLowerCase()));P.innerHTML=`
    ${C()}
    <header class="hero container fade-in">
      <h1>${u("heroTitle").replace("الواقعية الخيالية",'<span style="color: var(--primary)">الواقعية الخيالية</span>')}</h1>
      <p>${u("heroDesc")}</p>
      <div class="search-box" style="margin-top: 25px; max-width: 400px; margin-left: auto; margin-right: auto;">
        <div style="position: relative;">
          <i class="fas fa-search" style="position: absolute; top: 50%; transform: translateY(-50%); ${n.lang==="ar"?"right: 15px":"left: 15px"}; color: var(--text-muted);"></i>
          <input 
            type="text" 
            id="searchInput" 
            dir="auto"
            placeholder="${u("searchPlaceholder")}" 
            value="${n.searchQuery}"
            style="width: 100%; padding: 12px 45px; border-radius: 50px; border: 2px solid var(--border-color); background: var(--card-bg); color: var(--text); font-size: 1rem; outline: none; transition: border-color 0.3s; text-align: ${n.lang==="ar"?"right":"left"};"
          >
        </div>
      </div>
    </header>

    <main class="container">
      <div class="artist-grid" id="artistGrid">
        ${e(l)}
      </div>
    </main>
  `,B();const t=()=>{document.querySelectorAll(".view-btn").forEach(c=>{c.addEventListener("click",i=>{const r=parseInt(i.target.dataset.id),m=w.find(d=>d.id===r);v({page:"detail",selectedArtist:m})})})};t();const s=document.getElementById("searchInput"),o=document.getElementById("artistGrid");s?.addEventListener("input",c=>{n.searchQuery=c.target.value;const i=w.filter(r=>r.name[n.lang].toLowerCase().includes(n.searchQuery.toLowerCase())||r.name.ar.toLowerCase().includes(n.searchQuery.toLowerCase())||r.name.en.toLowerCase().includes(n.searchQuery.toLowerCase()));o&&(o.innerHTML=e(i),t())})}function J(e){if(!e){v({page:"home"});return}P.innerHTML=`
    ${C()}
    <div class="container" style="margin-top: 20px;">
      <a href="#" class="home-link back-link" style="text-decoration: none; color: var(--primary); font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
        <i class="fas fa-arrow-right"></i>
        ${u("backHome")}
      </a>
    </div>
    <header class="container fade-in" style="margin-top: 20px;">
      <div class="detail-header">
        <img src="${e.avatar}" alt="${e.name[n.lang]}" class="artist-avatar">
        <div style="flex: 1;">
          <h1 style="margin-bottom: 0.5rem;">${e.name[n.lang]}</h1>
          <p style="color: var(--primary); font-weight: 600; font-size: 1.2rem;">${e.specialty[n.lang]}</p>
          <p style="color: var(--text-muted); margin-top: 1rem;">${e.bio[n.lang]}</p>
          
          <div class="social-links">
            ${Object.entries(e.socials).map(([l,t])=>{const o={whatsapp:{icon:"fab fa-whatsapp",color:"#25D366"},telegram:{icon:"fab fa-telegram-plane",color:"#0088cc"},facebook:{icon:"fab fa-facebook-f",color:"#1877f2"},instagram:{icon:"fab fa-instagram",color:"#E4405F"},gmail:{icon:"far fa-envelope",color:"#ea4335"},email:{icon:"far fa-envelope",color:"#ea4335"},youtube:{icon:"fab fa-youtube",color:"#ff0000"}}[l]||{icon:"fas fa-link",color:"var(--primary)"};return`<a href="${t}" target="_blank" class="social-btn ${l}"><i class="${o.icon}" style="color: ${o.color};"></i></a>`}).join("")}
          </div>
        </div>
      </div>
    </header>

    <section class="container fade-in" style="margin-top: 40px;">
      <h2 style="border-bottom: 2px solid var(--primary); display: inline-block; padding-bottom: 5px;">${u("termsTitle")}</h2>
      <div class="terms-content">
        ${q(e.terms[n.lang])}
      </div>
    </section>

    ${e.process&&e.process[n.lang]?`
    <section class="container fade-in" style="margin-top: 40px;">
      <h2 style="border-bottom: 2px solid var(--primary); display: inline-block; padding-bottom: 5px;">${n.lang==="ar"?"طريقة التعاون":"Collaboration Process"}</h2>
      <div class="process-content">
        ${q(e.process[n.lang])}
      </div>
    </section>
    `:""}

    <section class="container fade-in" style="margin-top: 60px; padding-bottom: 100px;">
      <h2 style="margin-bottom: 30px;">${u("galleryTitle")}</h2>
      ${e.works&&e.works.length>0?`
        <div class="gallery">
          ${e.works.map((l,t)=>`
            <div class="gallery-item" data-index="${t}">
              <img src="${l}" alt="Project Work" loading="lazy">
            </div>
          `).join("")}
        </div>
      `:`
        <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <i class="fas fa-images" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3;"></i>
          <p>${n.lang==="ar"?"لا توجد أعمال متاحة حالياً":"No works available at the moment"}</p>
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
      <div class="lightbox-counter" id="lightboxCounter"></div>
    </div>
  `,B(),Z(e.works)}function Z(e){if(!e||e.length===0)return;let l=0,t=1,s=!1,o=0,c=0,i=0,r=0;const m=document.getElementById("lightbox"),d=document.getElementById("lightboxImage"),x=document.getElementById("lightboxClose"),L=document.getElementById("lightboxPrev"),y=document.getElementById("lightboxNext"),p=document.getElementById("lightboxCounter"),Q=document.querySelectorAll(".gallery-item");function E(a){l=a;const g=e[a];d.style.opacity="0.5";const h=new Image;h.onload=()=>{if(d.src=g,d.style.opacity="1",p.textContent=`${a+1} / ${e.length}`,m.classList.add("active"),document.body.style.overflow="hidden",$(),e[a+1]){const S=new Image;S.src=e[a+1]}if(e[a-1]){const S=new Image;S.src=e[a-1]}},h.onerror=()=>{console.error("Failed to load image:",g),d.style.opacity="1",d.src=g,p.textContent=`${a+1} / ${e.length}`,m.classList.add("active"),document.body.style.overflow="hidden",$()},h.src=g}function $(){t=1,i=0,r=0,b()}function b(){d.style.transform=`translate(${i}px, ${r}px) scale(${t})`}function k(){m.classList.remove("active"),document.body.style.overflow="",$()}function T(){l=(l+1)%e.length,E(l)}function D(){l=(l-1+e.length)%e.length,E(l)}Q.forEach((a,g)=>{a.addEventListener("click",()=>{const h=a.querySelector("img");h&&h.src&&E(g)})}),x.addEventListener("click",k),y.addEventListener("click",T),L.addEventListener("click",D),m.addEventListener("click",a=>{a.target===m&&k()}),document.addEventListener("keydown",a=>{m.classList.contains("active")&&(a.key==="Escape"&&k(),a.key==="ArrowRight"&&T(),a.key==="ArrowLeft"&&D())}),d.addEventListener("wheel",a=>{a.preventDefault();const g=a.deltaY>0?-.1:.1;t=Math.min(Math.max(1,t+g),5),b()}),d.addEventListener("mousedown",a=>{t>1&&(s=!0,o=a.clientX-i,c=a.clientY-r,d.style.cursor="grabbing")}),document.addEventListener("mousemove",a=>{s&&(i=a.clientX-o,r=a.clientY-c,b())}),document.addEventListener("mouseup",()=>{s=!1,d.style.cursor=t>1?"grab":"default"});let W=0,j=1,H=0,Y=0;d.addEventListener("touchstart",a=>{a.touches.length===2?(a.preventDefault(),W=Math.hypot(a.touches[0].clientX-a.touches[1].clientX,a.touches[0].clientY-a.touches[1].clientY),j=t):a.touches.length===1&&t>1&&(a.preventDefault(),s=!0,H=a.touches[0].clientX-i,Y=a.touches[0].clientY-r)},{passive:!1}),d.addEventListener("touchmove",a=>{if(a.touches.length===2){a.preventDefault();const g=Math.hypot(a.touches[0].clientX-a.touches[1].clientX,a.touches[0].clientY-a.touches[1].clientY);t=Math.min(Math.max(1,j*(g/W)),5),b()}else s&&a.touches.length===1&&(a.preventDefault(),i=a.touches[0].clientX-H,r=a.touches[0].clientY-Y,b())},{passive:!1}),d.addEventListener("touchend",a=>{s=!1});let X=0;d.addEventListener("touchend",a=>{const g=new Date().getTime(),h=g-X;h<300&&h>0&&(a.preventDefault(),t===1?t=2.5:$(),b()),X=g})}N();O();I();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").then(t=>{console.log("SW Registered"),setInterval(()=>{t.update()},60*1e3),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&t.update()}),t.onupdatefound=()=>{const s=t.installing;s.onstatechange=()=>{s.state==="installed"&&navigator.serviceWorker.controller&&(console.log("New content available, refreshing..."),s.postMessage({type:"SKIP_WAITING"}))}}}).catch(t=>console.error("SW Registration Failed",t));let l=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{l||(l=!0,window.location.reload())})});
