const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll("a, button, .project, .service, .frame").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
}

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
  revealObserver.observe(el);
});

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const rect = button.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.16;
    button.style.transform = `translate(${x}px, ${y}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0,0)";
  });
});

const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements.name.value.trim() || "there";
  const email = form.elements.email.value.trim();
  const project = form.elements.project.value.trim();
  const body = form.elements.message.value.trim();

  const subject = encodeURIComponent(`Project enquiry${project ? `: ${project}` : ""}`);
  const mailBody = encodeURIComponent(
    `Hi Nazeem,\n\nName: ${name}\nEmail: ${email}\nProject: ${project}\n\n${body}`
  );

  window.location.href = `mailto:nazeem@example.com?subject=${subject}&body=${mailBody}`;
  message.textContent = "Opening your email app...";
});

const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("mobile-open");
  menuButton.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("mobile-open"));
});

const parallaxFrames = document.querySelectorAll(".frame");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (window.innerWidth > 800) {
    parallaxFrames.forEach((frame, i) => {
      const speed = [0.035, -0.025, 0.018, -0.015][i] || 0.02;
      frame.style.translate = `0 ${y * speed}px`;
    });
  }
}, { passive: true });
