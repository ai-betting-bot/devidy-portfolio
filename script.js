
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const typedText = document.getElementById("typedText");
const progressBar = document.getElementById("progressBar");
const year = document.getElementById("year");

// Automatically update the copyright year.
year.textContent = new Date().getFullYear();

// Mobile navigation menu.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after selecting a section.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Animated professional titles.
const titles = [
  "Mathematics Educator",
  "IT Professional",
  "Aspiring Software Developer",
  "Data Analysis Enthusiast"
];

let titleIndex = 0;
let characterIndex = 0;
let deleting = false;

function animateTitle() {
  const currentTitle = titles[titleIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typedText.textContent = currentTitle.slice(0, characterIndex);

  let delay = deleting ? 40 : 85;

  if (!deleting && characterIndex === currentTitle.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 350;
  }

  window.setTimeout(animateTitle, delay);
}

animateTitle();

// Reveal cards and sections as they enter the screen.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Scroll progress indicator.
function updateProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
