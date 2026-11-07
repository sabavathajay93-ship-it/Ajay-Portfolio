(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#primary-menu');

  if (menuButton && menu) {
    const closeMenu = () => {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation menu');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      menu.classList.toggle('is-open', !isOpen);
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 680) closeMenu(); });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const typed = document.querySelector('[data-words]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typed && !reduceMotion) {
    const words = typed.dataset.words.split('|');
    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;
    const tick = () => {
      const word = words[wordIndex];
      if (deleting) {
        charIndex -= 1;
        typed.textContent = word.slice(0, Math.max(0, charIndex));
        if (charIndex <= 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
        window.setTimeout(tick, 55);
      } else {
        const nextWord = words[wordIndex];
        charIndex += 1;
        typed.textContent = nextWord.slice(0, charIndex);
        if (charIndex >= nextWord.length) { deleting = true; window.setTimeout(tick, 1500); }
        else window.setTimeout(tick, 85);
      }
    };
    window.setTimeout(tick, 1500);
  }
})();
