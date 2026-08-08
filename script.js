/* ==========================================================================
   Dharshini K — Spatial 3D Light Theme Interactive Behaviors & Physics
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. Spatial 3D Card Perspective Tilt Engine
     ------------------------------------------------------------------------ */
  const tiltCards = document.querySelectorAll('.glass-card, .tilt-3d');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate tilt degrees (max 10deg for subtle sophisticated 3D depth)
      const rotateX = (-y / (rect.height / 2)) * 8;
      const rotateY = (x / (rect.width / 2)) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  /* ------------------------------------------------------------------------
     2. Ambient Cursor Light Halo Follower
     ------------------------------------------------------------------------ */
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      if (cursorGlow) {
        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;
      }
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  /* ------------------------------------------------------------------------
     3. Sticky Navbar & Active Section ScrollSpy Tracking
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  /* ------------------------------------------------------------------------
     4. Mobile Drawer Navigation Toggle
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. Scroll-Reveal IntersectionObserver
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------------
     6. Animated Hero "Learn → Build → Improve" Step Flow Cycle
     ------------------------------------------------------------------------ */
  const flowSteps = document.querySelectorAll('.flow-step');
  const flowProgress = document.getElementById('flow-progress');
  let currentStepIndex = 0;

  function updateFlowCycle() {
    flowSteps.forEach((step, index) => {
      if (index === currentStepIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    if (flowProgress) {
      const progressWidths = ['0%', '50%', '100%'];
      flowProgress.style.width = progressWidths[currentStepIndex];
    }

    currentStepIndex = (currentStepIndex + 1) % flowSteps.length;
  }

  setInterval(updateFlowCycle, 2800);

  /* ------------------------------------------------------------------------
     7. QUINTO Interactive Web App Widget Light Mode Logic
     ------------------------------------------------------------------------ */
  const moodBtns = document.querySelectorAll('.mood-btn');
  const quintoPrompt = document.getElementById('quinto-prompt');
  const quintoInput = document.getElementById('quinto-input');
  const quintoCharCount = document.getElementById('quinto-char-count');

  const moodPrompts = {
    calm: '"What is one quiet moment today that brought you inner peace?"',
    happy: '"What is one positive moment that made you smile today?"',
    focused: '"What meaningful goal did you move closer to achieving today?"',
    inspired: '"What new idea or technology sparked your curiosity recently?"',
    reflective: '"What lesson did you learn from a challenge faced today?"'
  };

  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const mood = btn.getAttribute('data-mood');
      if (quintoPrompt && moodPrompts[mood]) {
        quintoPrompt.style.opacity = '0';
        setTimeout(() => {
          quintoPrompt.textContent = moodPrompts[mood];
          quintoPrompt.style.opacity = '1';
        }, 180);
      }
    });
  });

  if (quintoInput && quintoCharCount) {
    quintoInput.addEventListener('input', (e) => {
      const len = e.target.value.length;
      quintoCharCount.textContent = `${len} character${len === 1 ? '' : 's'}`;
    });
  }

  /* ------------------------------------------------------------------------
     8. Copy Email Toast & Form Submissions
     ------------------------------------------------------------------------ */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'dharshininivetha54@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Direct Mailto: dharshininivetha54@gmail.com');
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('form-name');
      const name = nameInput ? nameInput.value : 'Friend';
      
      showToast(`Thank you, ${name}! Your message has been sent.`);
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     9. Modal Component Logic
     ------------------------------------------------------------------------ */
  const modalTriggers = document.querySelectorAll('.btn-modal-trigger');
  const infoModal = document.getElementById('info-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-modal');
      if (type === 'github') {
        modalTitle.textContent = 'QUINTO Source Code Repository';
        modalBody.textContent = 'QUINTO is currently in active development. The GitHub repository will be made public once the initial MVP milestone is completed!';
      } else {
        modalTitle.textContent = 'QUINTO Interactive Live Preview';
        modalBody.textContent = 'You can interact with the live Quinto web app interface directly right here in the project showcase box on this page!';
      }
      infoModal.classList.add('active');
    });
  });

  if (closeModalBtn && infoModal) {
    closeModalBtn.addEventListener('click', () => {
      infoModal.classList.remove('active');
    });

    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) {
        infoModal.classList.remove('active');
      }
    });
  }

});
