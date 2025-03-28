// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  setupStickyNav();
  setupScrollFade();
  setupActiveNavLink();
  setupDemoForm();
  setupBurgerMenu();
  setupAutoCloseMenu();
});

function setupStickyNav() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', throttle(() => {
    const isScrolled = window.scrollY > 50;
    nav.style.background = isScrolled ? '#f8f5fc' : 'transparent';
    nav.style.boxShadow = isScrolled ? '0 2px 6px rgba(0,0,0,0.05)' : 'none';
    nav.style.transition = 'background 0.3s ease, box-shadow 0.3s ease';
    nav.querySelectorAll('a').forEach(link => link.style.color = '#1e3a8a');
  }, 100));
}

function setupScrollFade() {
  const faders = document.querySelectorAll('.scroll-fade');
  const appearOptions = { threshold: 0.1 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(el => appearOnScroll.observe(el));
}

function setupActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', throttle(() => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, 100));
}

function setupDemoForm() {
  const demoForm = document.getElementById("demoForm");
  if (!demoForm) return;

  demoForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      nombre: form.nombre.value,
      email: form.email.value,
      telefono: form.telefono.value,
      sector: form.sector.value
    };

    try {
      await fetch("https://hook.eu2.make.com/njsunmcpef6lxssfokhmo8otufmrpod7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      document.getElementById("mensaje-exito").style.display = "block";
      form.reset();
    } catch (error) {
      alert("Hubo un error al enviar el formulario. Inténtalo de nuevo.");
      console.error(error);
    }
  });
}

function setupBurgerMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  if (!menuToggle) return;

  menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });
}

function setupAutoCloseMenu() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    });
  });
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
