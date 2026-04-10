/* ============================================
   INFINITY INKED — JavaScript Vanilla
   ============================================ */

(function () {
  'use strict';

  /* --- Burger menu --- */
  const burger = document.querySelector('.nav__burger');
  const mobileNav = document.querySelector('.nav__mobile');

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      const isOpen = this.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      this.setAttribute('aria-expanded', isOpen);
    });

    // Fermer sur clic lien
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Marquer le lien actif --- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* --- Filtres portfolio --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Mettre à jour bouton actif
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        const filter = this.dataset.filter;

        galleryItems.forEach(function (item) {
          if (filter === 'all' || item.dataset.style === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* --- Formulaire de contact --- */
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      const nom    = form.querySelector('#nom').value.trim();
      const email  = form.querySelector('#email').value.trim();
      const tel    = form.querySelector('#tel').value.trim();
      const style  = form.querySelector('#style').value;
      const msg    = form.querySelector('#message').value.trim();

      // Validation simple
      if (!nom || !email || !style) {
        showFormMessage('Merci de remplir les champs obligatoires.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage('Adresse e-mail invalide.', 'error');
        return;
      }

      // Simuler envoi
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = 'Message envoyé';
        showFormMessage(
          'Votre message a bien été reçu. Sandra vous répondra dans les meilleurs délais.',
          'success'
        );
        form.reset();
        setTimeout(function () {
          btn.textContent = 'Envoyer le message';
          btn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  function showFormMessage(text, type) {
    let msg = document.querySelector('.form-feedback');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'form-feedback';
      const form = document.querySelector('.contact-form');
      form.appendChild(msg);
    }
    msg.textContent = text;
    msg.style.cssText = [
      'font-size: 0.8rem',
      'font-weight: 600',
      'letter-spacing: 0.08em',
      'text-transform: uppercase',
      'padding: 0.75rem 1rem',
      'margin-top: 1rem',
      'border: 2px solid ' + (type === 'success' ? '#0A0A0A' : '#C41E3A'),
      'color: ' + (type === 'success' ? '#0A0A0A' : '#C41E3A')
    ].join(';');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* --- Scroll nav shadow --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 4) {
        nav.style.boxShadow = '0 4px 0 #0A0A0A';
      } else {
        nav.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

})();
