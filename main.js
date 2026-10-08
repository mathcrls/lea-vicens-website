/**
 * LEA VICENS - SITE OFFICIEL MODERNE & RESPONSIVE
 * Logique interactive : Multilingue (FR/ES/EN), Filtrage Agenda, Lightbox Galerie,
 * Modales Chevaux & Articles, Compteurs de statistiques, Menu mobile.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initMultilingual();
  initAgendaFilters();
  initCuadraFilters();
  initModals();
  initGalleryLightbox();
  initStatsCounter();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. NAVBAR STICKY & ACTIVE LINK
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    toggleBtn.classList.add('active');
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', closeDrawer);

  links.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. TRILINGUAL SYSTEM (FR / ES / EN)
   ========================================================================== */
const TRANSLATIONS = {
  fr: {
    nav_home: "Accueil",
    nav_news: "Actualités",
    nav_agenda: "Agenda",
    nav_bio: "Biographie",
    nav_cuadra: "Écurie",
    nav_team: "L'Équipe",
    nav_experience: "Expérience",
    nav_gallery: "Galerie",
    nav_contact: "Contact",
    hero_badge: "N°1 MONDIALE DE L'ESCALAFÓN • REJONEO",
    hero_tagline: "L'élégance équestre, la bravoure et la passion au sommet de la tauromachie mondiale.",
    hero_cta_agenda: "Consulter la Temporada",
    hero_cta_cuadra: "Découvrir la Cuadra",
    stat_corridas: "Corridas toréées",
    stat_ears: "Oreilles coupées",
    stat_tails: "Queues obtenues",
    stat_exits: "Sorties a hombros",
    news_tag: "ACTUALITÉS & RÉCITS",
    news_title: "Derniers Triomphes en Piste",
    news_subtitle: "Suivez les temps forts, les comptes-rendus de corridas et les grandes victoires de Lea Vicens.",
    agenda_tag: "CALENDRIER DE LA TEMPORADA",
    agenda_title: "Agenda & Rendez-vous",
    agenda_subtitle: "Retrouvez les prochaines dates ainsi que l'historique des cartels prestigieux.",
    filter_all: "Tous",
    filter_recent: "Triomphes récents",
    filter_france: "France",
    filter_spain: "Espagne",
    agenda_search_placeholder: "Rechercher une arène, ville...",
    bio_tag: "PARCOURS & VOCATION",
    bio_title: "Du Poney Camarguais au Sommet Mondial",
    bio_subtitle: "Le destin exceptionnel d'une passionnée qui a réinventé la tauromachie à cheval.",
    cuadra_tag: "LES COMPAGNONS DE LÉGENDE",
    cuadra_title: "L'Écurie d'Artistes (La Cuadra)",
    cuadra_subtitle: "Chaque monture est dressée patiemment par Lea pour révéler son génie et sa bravoure face au toro.",
    cuadra_tab_all: "Toute la Cuadra",
    cuadra_tab_salida: "Tercio de Salida",
    cuadra_tab_banderillas: "Tercio de Banderillas",
    cuadra_tab_muerte: "Tercio de Muerte",
    team_tag: "L'ENTOURAGE D'EXCELLENCE",
    team_title: "La Cuadrilla & L'Équipe",
    team_subtitle: "L'engagement et la précision au service de chaque triomphe dans les plus grandes arènes.",
    exp_tag: "IMMERSION EXCLUSIVE",
    exp_title: "L'Expérience Lea Vicens",
    exp_subtitle: "Poussez les portes du domaine andalou et découvrez l'intimité de l'élevage, du dressage et du tentadero.",
    gallery_tag: "MOMENTS FORTS",
    gallery_title: "Galerie Photographique",
    gallery_subtitle: "L'intensité du ruedo, la complicité avec le cheval et la beauté du geste en images.",
    press_title: "Espace Professionnel & Dossier de Presse",
    press_desc: "Téléchargez le dossier de presse officiel de Lea Vicens, biographies détaillées et pack de photos haute résolution libres de droits pour la presse.",
    press_btn: "Télécharger le Dossier (.PDF)",
    contact_tag: "PRENDRE CONTACT",
    contact_title: "Contact & Réservations",
    contact_subtitle: "Pour toute demande d'apoderamiento, de reportage presse ou de renseignements sur les expériences.",
    form_name: "Nom complet",
    form_email: "Adresse e-mail",
    form_subject: "Objet de votre demande",
    form_msg: "Votre message",
    form_submit: "Envoyer le message",
    toast_sent: "Merci ! Votre message a été transmis à l'équipe officielle de Lea Vicens."
  },
  es: {
    nav_home: "Inicio",
    nav_news: "Actualidad",
    nav_agenda: "Agenda",
    nav_bio: "Biografía",
    nav_cuadra: "Cuadra",
    nav_team: "El Equipo",
    nav_experience: "Experiencia",
    nav_gallery: "Galería",
    nav_contact: "Contacto",
    hero_badge: "N°1 MUNDIAL DEL ESCALAFÓN • REJONEO",
    hero_tagline: "Elegancia ecuestre, valor y pasión en la cumbre de la tauromaquia mundial.",
    hero_cta_agenda: "Consultar Temporada",
    hero_cta_cuadra: "Descubrir la Cuadra",
    stat_corridas: "Corridas toreTelecomadas",
    stat_ears: "Orejas cortadas",
    stat_tails: "Rabos conseguidos",
    stat_exits: "Puertas Grandes",
    news_tag: "ACTUALIDAD & TRIUNFOS",
    news_title: "Últimos Triunfos en el Ruedo",
    news_subtitle: "Sigue los momentos más destacados, crónicas y grandes victorias de Lea Vicens.",
    agenda_tag: "CALENDARIO DE LA TEMPORADA",
    agenda_title: "Agenda de Festejos",
    agenda_subtitle: "Consulta las próximas fechas y el historial de carteles de la temporada.",
    filter_all: "Todos",
    filter_recent: "Triunfos recientes",
    filter_france: "Francia",
    filter_spain: "España",
    agenda_search_placeholder: "Buscar plaza, ciudad...",
    bio_tag: "TRAYECTORIA & VOCACIÓN",
    bio_title: "Del Póney Camargués a la Cumbre",
    bio_subtitle: "El destino excepcional de una apasionada que ha renovado el toreo a caballo.",
    cuadra_tag: "COMPAÑEROS DE LEYENDA",
    cuadra_title: "La Cuadra de Caballos Toreros",
    cuadra_subtitle: "Cada caballo es domado personalmente por Lea para desplegar su temple y arte ante el toro.",
    cuadra_tab_all: "Toda la Cuadra",
    cuadra_tab_salida: "Tercio de Salida",
    cuadra_tab_banderillas: "Tercio de Banderillas",
    cuadra_tab_muerte: "Último Tercio",
    team_tag: "ENTORNO DE EXCELENCIA",
    team_title: "La Cuadrilla & El Equipo",
    team_subtitle: "Compromiso y precisión al servicio de cada triunfo en las ferias más importantes.",
    exp_tag: "INMERSIÓN EXCLUSIVA",
    exp_title: "La Experiencia Lea Vicens",
    exp_subtitle: "Lea os recibe en su finca andaluza para mostraros su mundo y secretos en primera persona.",
    gallery_tag: "MOMENTOS DESTACADOS",
    gallery_title: "Galería Fotográfica",
    gallery_subtitle: "La pureza del toreo a caballo, la complicidad equina y la torería en imágenes.",
    press_title: "Área Profesional & Dossier de Prensa",
    press_desc: "Descarga el dossier oficial de Lea Vicens con biografía completa, palmarés y fotografías de alta resolución.",
    press_btn: "Descargar Dossier (.PDF)",
    contact_tag: "CONTACTAR",
    contact_title: "Contacto & Información",
    contact_subtitle: "Para gestiones de apoderamiento, prensa o reservas de visitas a la finca.",
    form_name: "Nombre completo",
    form_email: "Correo electrónico",
    form_subject: "Asunto de la consulta",
    form_msg: "Tu mensaje",
    form_submit: "Enviar mensaje",
    toast_sent: "¡Gracias! Tu mensaje ha sido enviado al equipo oficial de Lea Vicens."
  },
  en: {
    nav_home: "Home",
    nav_news: "News",
    nav_agenda: "Schedule",
    nav_bio: "Biography",
    nav_cuadra: "Horses",
    nav_team: "The Team",
    nav_experience: "Experience",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    hero_badge: "WORLD N°1 IN ESCALAFÓN • REJONEO",
    hero_tagline: "Equestrian grace, courage and passion at the pinnacle of world horseback bullfighting.",
    hero_cta_agenda: "View Season Schedule",
    hero_cta_cuadra: "Discover the Horses",
    stat_corridas: "Bullfights fought",
    stat_ears: "Ears awarded",
    stat_tails: "Tails awarded",
    stat_exits: "Puerta Grande triumphs",
    news_tag: "LATEST NEWS & REPORTS",
    news_title: "Latest Arena Triumphs",
    news_subtitle: "Follow Lea Vicens' highlights, arena chronicles and great victories across Europe.",
    agenda_tag: "SEASON SCHEDULE",
    agenda_title: "Upcoming Dates & Schedule",
    agenda_subtitle: "Discover all scheduled corridas and prestigious cartel appearances.",
    filter_all: "All",
    filter_recent: "Recent triumphs",
    filter_france: "France",
    filter_spain: "Spain",
    agenda_search_placeholder: "Search arena, city...",
    bio_tag: "JOURNEY & DEDICATION",
    bio_title: "From Camargue to the World Peak",
    bio_subtitle: "The outstanding journey of an artist who redefined modern equestrian bullfighting.",
    cuadra_tag: "LEGENDARY COMPANIONS",
    cuadra_title: "The Artist Horses (Cuadra)",
    cuadra_subtitle: "Each horse is personally trained by Lea to reveal boldness, beauty and refined synergy.",
    cuadra_tab_all: "All Horses",
    cuadra_tab_salida: "Opening Act (Salida)",
    cuadra_tab_banderillas: "Banderillas Act",
    cuadra_tab_muerte: "Final Act (Muerte)",
    team_tag: "EXCELLENCE & DEDICATION",
    team_title: "The Cuadrilla & Team",
    team_subtitle: "Mastery and precision behind every grand victory in historic arenas.",
    exp_tag: "EXCLUSIVE IMMERSION",
    exp_title: "The Lea Vicens Experience",
    exp_subtitle: "Visit Lea at her private Andalusian estate to discover training, breeding and tentaderos.",
    gallery_tag: "PHOTO GALLERY",
    gallery_title: "Photographic Collection",
    gallery_subtitle: "The intensity of the arena, trust between horse and rider, and moments of victory.",
    press_title: "Press Center & Media Kit",
    press_desc: "Download the official Lea Vicens press kit, complete statistics and high-resolution photo library.",
    press_btn: "Download Press Kit (.PDF)",
    contact_tag: "GET IN TOUCH",
    contact_title: "Contact & Inquiries",
    contact_subtitle: "For management inquiries, media interviews or private estate booking.",
    form_name: "Full Name",
    form_email: "Email address",
    form_subject: "Subject",
    form_msg: "Your message",
    form_submit: "Send Message",
    toast_sent: "Thank you! Your message has been forwarded to Lea Vicens' official team."
  }
};

let currentLang = 'fr';

function initMultilingual() {
  const langButtons = document.querySelectorAll('.lang-btn');
  const savedLang = localStorage.getItem('lv_lang');

  if (savedLang && TRANSLATIONS[savedLang]) {
    setLanguage(savedLang);
  } else {
    setLanguage('fr');
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.target.getAttribute('data-lang');
      if (selected && TRANSLATIONS[selected]) {
        setLanguage(selected);
      }
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lv_lang', lang);

  // Update button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Replace text for elements with data-i18n
  const dict = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', dict[key]);
      } else {
        el.textContent = dict[key];
      }
    }
  });
}

/* ==========================================================================
   4. AGENDA FILTERING & SEARCH
   ========================================================================== */
function initAgendaFilters() {
  const filterBtns = document.querySelectorAll('.agenda-filters .filter-btn');
  const searchInput = document.querySelector('#agendaSearchInput');
  const cards = document.querySelectorAll('.agenda-card');

  function applyFilter() {
    const activeFilter = document.querySelector('.agenda-filters .filter-btn.active')?.getAttribute('data-filter') || 'all';
    const searchTerm = (searchInput?.value || '').toLowerCase().trim();

    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const text = card.textContent.toLowerCase();

      const matchesCategory = (activeFilter === 'all') || (category.includes(activeFilter));
      const matchesSearch = !searchTerm || text.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'grid';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  // Handle "Ajouter au calendrier (.ics)" buttons
  document.querySelectorAll('.btn-add-cal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.agenda-card');
      const city = card.querySelector('.agenda-city')?.textContent.trim() || 'Corrida';
      const cartel = card.querySelector('.agenda-cartel')?.textContent.trim() || '';
      downloadIcs(city, cartel);
    });
  });
}

function downloadIcs(city, cartel) {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Lea Vicens Officiel//FR
BEGIN:VEVENT
SUMMARY:Corrida de Rejoneo - ${city} | Lea Vicens
DESCRIPTION:${cartel}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Lea_Vicens_${city.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==========================================================================
   5. CUADRA / HORSES TABS FILTER
   ========================================================================== */
function initCuadraFilters() {
  const tabs = document.querySelectorAll('.cuadra-tab-btn');
  const cards = document.querySelectorAll('.horse-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-tab');

      cards.forEach(card => {
        const tercio = card.getAttribute('data-tercio');
        if (filter === 'all' || tercio === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. ARTICLE & HORSE MODAL SYSTEM
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.querySelector('#globalModal');
  const modalCloseBtn = document.querySelector('#modalCloseBtn');
  const modalImg = document.querySelector('#modalImg');
  const modalTitle = document.querySelector('#modalTitle');
  const modalSubtitle = document.querySelector('#modalSubtitle');
  const modalBody = document.querySelector('#modalBodyText');

  if (!modalBackdrop) return;

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openModal(data) {
    if (modalImg) modalImg.src = data.img || '';
    if (modalTitle) modalTitle.textContent = data.title || '';
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle || '';
    if (modalBody) modalBody.innerHTML = data.content || '';

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach to news "Lire le récit"
  document.querySelectorAll('.news-read-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.news-card');
      const img = card.querySelector('.news-img')?.getAttribute('src');
      const title = card.querySelector('.news-card-title')?.textContent;
      const date = card.querySelector('.news-badge-date')?.textContent;
      const tag = card.querySelector('.news-tag')?.textContent;
      const fullText = card.getAttribute('data-fulltext') || card.querySelector('.news-card-excerpt')?.textContent;

      openModal({
        img: img,
        title: title,
        subtitle: `${date} • ${tag}`,
        content: `<p style="font-size:1.05rem;line-height:1.8;color:#2c2e35;">${fullText}</p><p style="margin-top:16px;color:#6b7280;font-size:0.9rem;"><em>Triomphe consigné dans le bilan officiel de la temporada Lea Vicens.</em></p>`
      });
    });
  });

  // Attach to Horse cards
  document.querySelectorAll('.horse-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.horse-img')?.getAttribute('src');
      const name = card.querySelector('.horse-name')?.textContent;
      const tercio = card.querySelector('.horse-tercio-badge')?.textContent;
      const meta = card.querySelector('.horse-meta-list')?.innerHTML || '';
      const desc = card.querySelector('.horse-desc')?.textContent;

      openModal({
        img: img,
        title: name,
        subtitle: `Cheval d'exception • ${tercio}`,
        content: `
          <div style="margin-bottom:20px;padding:16px;background:#fbfaf8;border-radius:8px;border-left:3px solid var(--gold);">
            ${meta}
          </div>
          <p style="font-size:1.02rem;line-height:1.8;color:#333;">${desc}</p>
          <p style="margin-top:18px;font-style:italic;color:#666;font-size:0.9rem;">
            "Chaque cheval de ma cuadrilla est façonné avec respect, patience et amour au domaine andalou. En piste, il devient le prolongement de mon âme et de mon équitation." — Lea Vicens
          </p>
        `
      });
    });
  });
}

/* ==========================================================================
   7. GALERIE PHOTO & LIGHTBOX RESPONSIVE
   ========================================================================== */
function initGalleryLightbox() {
  const lightbox = document.querySelector('#lightbox');
  const lightboxImg = document.querySelector('#lightboxImg');
  const lightboxCaption = document.querySelector('#lightboxCaption');
  const lightboxCounter = document.querySelector('#lightboxCounter');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!lightbox) return;

  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentIndex = index;

    const item = galleryItems[currentIndex];
    const src = item.getAttribute('data-full-img') || item.querySelector('img')?.getAttribute('src');
    const caption = item.getAttribute('data-caption') || item.querySelector('.gallery-caption')?.textContent || 'Lea Vicens';

    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
    }
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      showImage(currentIndex + 1); // swipe left -> next
    } else if (touchEndX - touchStartX > 50) {
      showImage(currentIndex - 1); // swipe right -> prev
    }
  }, { passive: true });
}

/* ==========================================================================
   8. ANIMATED STATS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statSection = document.querySelector('.section-stats');
  if (!statSection) return;

  let hasAnimated = false;
  const numbers = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        numbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-count'), 10);
          const prefix = num.getAttribute('data-prefix') || '';
          const suffix = num.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              num.innerHTML = `${prefix}${target}${suffix ? `<span>${suffix}</span>` : ''}`;
              clearInterval(timer);
            } else {
              num.innerHTML = `${prefix}${Math.floor(count)}${suffix ? `<span>${suffix}</span>` : ''}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statSection);
}

/* ==========================================================================
   9. CONTACT FORM VALIDATION & NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('#contactForm');
  const toast = document.querySelector('#toastNotice');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Envoi en cours...`;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();

      // Show toast
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      }
    }, 1200);
  });
}

/* ==========================================================================
   10. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.querySelector('#backToTopBtn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
