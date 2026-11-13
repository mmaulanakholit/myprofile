/**
 * Logika JavaScript Utama - Portofolio Kholit
 * Menangani navigasi seluler, animasi scroll reveal, dan highlight menu navigasi.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Inisialisasi Elemen Navigasi & Hamburger Menu
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (navToggle && navMenu) {
    // Fungsi untuk membuka/menutup menu navigasi
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Menutup menu saat salah satu tautan diklik
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navToggle.classList.remove('open');
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. Animasi Muncul Halus Menggunakan IntersectionObserver (.reveal -> .visible)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Hentikan pengamatan setelah elemen muncul
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback jika peramban tidak mendukung IntersectionObserver
    revealElements.forEach((el) => {
      el.classList.add('visible');
    });
  }

  // --------------------------------------------------------------------------
  // 3. Highlight Tautan Navbar Sesuai Section yang Terlihat
  // --------------------------------------------------------------------------
  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Penanganan tambahan saat scroll berada di paling atas atau paling bawah halaman
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition <= 50) {
      setActiveLink('beranda');
    } else if (windowHeight + scrollPosition >= documentHeight - 30) {
      setActiveLink('kontak');
    }
  }, { passive: true });
});

