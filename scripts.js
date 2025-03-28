// scripts.js

const App = {
  init() {
    this.setupStickyNav();
    this.setupScrollFade();
    this.setupActiveNavLink();
    this.setupDemoForm();
    this.setupBurgerMenu();
  },

  setupStickyNav() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', this.throttle(() => {
      const isScrolled = window.scrollY > 50;
      nav.classList.toggle('scrolled', isScrolled);
    }, 100));
  },

  setupScrollFade() {
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
  },

  setupActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    window.addEventListener('scroll', this.throttle(() => {
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
  },

  setupDemoForm() {
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

        const successMessage = document.getElementById("mensaje-exito");
        successMessage.classList.add("visible");
        form.reset();
      } catch (error) {
        const errorMessage = document.getElementById("mensaje-error");
        if (errorMessage) {
          errorMessage.classList.add("visible");
        } else {
          alert("Hubo un error al enviar el formulario. Inténtalo de nuevo.");
        }
        console.error(error);
      }
    });
  },

  setupBurgerMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) return;
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  },

  throttle(func, limit) {
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
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
