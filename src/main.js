import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ephnkcxkpfxahgnszflc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwaG5rY3hrcGZ4YWhnbnN6ZmxjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTA5NzcyMSwiZXhwIjoyMDY0NjczNzIxfQ.GfaaEchXvkjNjqyn4EMmqjicopXSfMGzP1hVfgcK3Gw');


document.addEventListener("DOMContentLoaded", () => {
  // === Canvas Setup ===
  const canvasTop = document.getElementById('constellation');
  const ctxTop = canvasTop.getContext('2d');
  const canvasFooter = document.getElementById('footer-constellation');
  const ctxFooter = canvasFooter.getContext('2d');

  function resizeCanvas() {
    canvasTop.width = window.innerWidth;
    canvasTop.height = window.innerHeight;
    canvasFooter.width = canvasFooter.offsetWidth;
    canvasFooter.height = canvasFooter.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Top Canvas Stars
  let starsTop = [];
  function createStarsTop(count) {
    starsTop = [];
    for (let i = 0; i < count; i++) {
      starsTop.push({
        x: Math.random() * canvasTop.width,
        y: Math.random() * canvasTop.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.5,
        twinkle: Math.random() * 100
      });
    }
  }

  function drawStarsTop() {
    ctxTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    for (let i = 0; i < starsTop.length; i++) {
      let s = starsTop[i];
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0 || s.x > canvasTop.width) s.vx *= -1;
      if (s.y < 0 || s.y > canvasTop.height) s.vy *= -1;
      s.twinkle += 0.05;
      const alpha = 0.5 + Math.sin(s.twinkle) * 0.5;
      ctxTop.beginPath();
      ctxTop.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctxTop.fillStyle = `rgba(255,255,255,${alpha})`;
      ctxTop.fill();
    }

    for (let i = 0; i < starsTop.length; i++) {
      for (let j = i + 1; j < starsTop.length; j++) {
        let dx = starsTop[i].x - starsTop[j].x;
        let dy = starsTop[i].y - starsTop[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctxTop.beginPath();
          ctxTop.moveTo(starsTop[i].x, starsTop[i].y);
          ctxTop.lineTo(starsTop[j].x, starsTop[j].y);
          ctxTop.strokeStyle = "rgba(255,255,255,0.05)";
          ctxTop.stroke();
        }
      }
    }
  }

  // Footer Canvas Stars
  let starsFooter = [];
  for (let i = 0; i < 50; i++) {
    starsFooter.push({
      x: Math.random() * canvasFooter.width,
      y: Math.random() * canvasFooter.height,
      radius: Math.random() * 1.2,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
    });
  }

  function drawStarsFooter() {
    ctxFooter.clearRect(0, 0, canvasFooter.width, canvasFooter.height);
    starsFooter.forEach((star, i) => {
      star.x += star.dx;
      star.y += star.dy;
      if (star.x < 0 || star.x > canvasFooter.width) star.dx *= -1;
      if (star.y < 0 || star.y > canvasFooter.height) star.dy *= -1;
      ctxFooter.beginPath();
      ctxFooter.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctxFooter.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctxFooter.fill();

      for (let j = i + 1; j < starsFooter.length; j++) {
        const dist = Math.hypot(star.x - starsFooter[j].x, star.y - starsFooter[j].y);
        if (dist < 100) {
          ctxFooter.beginPath();
          ctxFooter.moveTo(star.x, star.y);
          ctxFooter.lineTo(starsFooter[j].x, starsFooter[j].y);
          ctxFooter.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctxFooter.stroke();
        }
      }
    });
  }

  // === Mobile Menu Toggle ===
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".nav-links");

  // Close mobile menu after clicking a nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('active');
      }
    });
  });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove("open");
        menuToggle.classList.remove("active");
      }
    });
  }

  function animate() {
    drawStarsTop();
    drawStarsFooter();
    requestAnimationFrame(animate);
  }

  createStarsTop(120);
  animate();



  // === Easter Egg on Click: Show Random Fun Quote ===
  const quotes = [
    "✨ The universe bends in favor of the bold.",
    "🚀 JazziVerse is built with stardust and code.",
    "🌠 Creativity is the gravity here.",
    "🛸 Solutions travel faster than light in this realm."
  ];

  document.addEventListener("click", (e) => {
    const funQuote = document.createElement("div");
    funQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    funQuote.style.position = "absolute";
    funQuote.style.left = e.clientX + "px";
    funQuote.style.top = e.clientY + "px";
    funQuote.style.color = "#d4af37";
    funQuote.style.fontSize = "0.9rem";
    funQuote.style.opacity = "1";
    funQuote.style.pointerEvents = "none";
    funQuote.style.transition = "all 1.5s ease-out";
    funQuote.style.transform = "translateY(-20px)";
    document.body.appendChild(funQuote);

    setTimeout(() => {
      funQuote.style.opacity = "0";
      funQuote.style.transform = "translateY(-60px)";
    }, 50);

    setTimeout(() => {
      funQuote.remove();
    }, 1600);
  });

  // === Extra Sparkle (Twinkle) for Footer Stars ===
  function addFooterTwinkleEffect(stars) {
    setInterval(() => {
      const twinkle = document.createElement("div");
      twinkle.className = "twinkle";
      twinkle.style.position = "absolute";
      twinkle.style.left = Math.random() * window.innerWidth + "px";
      twinkle.style.top = window.scrollY + Math.random() * 150 + "px";
      twinkle.style.width = "2px";
      twinkle.style.height = "2px";
      twinkle.style.borderRadius = "50%";
      twinkle.style.background = "white";
      twinkle.style.opacity = "0.8";
      twinkle.style.zIndex = "0";
      twinkle.style.boxShadow = "0 0 6px #fff";
      twinkle.style.transition = "opacity 1s ease-out";
      document.body.appendChild(twinkle);

      setTimeout(() => {
        twinkle.style.opacity = "0";
      }, 1000);
      setTimeout(() => {
        twinkle.remove();
      }, 2000);
    }, 800);
  }
  addFooterTwinkleEffect();

  document.querySelectorAll('.card-container').forEach(container => {
    container.addEventListener('click', () => {
      container.classList.toggle('active');
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function activateLink() {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active-link");
        }
      });
    }

    navLinks.forEach(link => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const sectionTop = targetSection.offsetTop;
          const sectionHeight = targetSection.offsetHeight;
          const centerPosition = sectionTop - (window.innerHeight / 2 - sectionHeight / 2);

          window.scrollTo({
            top: centerPosition,
            behavior: "smooth"
          });
        }
      });
    });

    window.addEventListener("scroll", activateLink);
  });

  // === Contact Form Submission ===
  const form = document.querySelector("#contact-form");
  const feedback = document.getElementById("form-feedback");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      feedback.textContent = ""; // clear previous messages
      feedback.className = "mt-2 text-sm";

      const name = form.querySelector('input[placeholder="Your Name"]').value.trim();
      const email = form.querySelector('input[placeholder="Your Email"]').value.trim();
      const message = form.querySelector('textarea[placeholder="Your Message"]').value.trim();

      // Validation
      if (!name || !email || !message) {
        feedback.textContent = "Please fill out all fields.";
        feedback.classList.add("text-red-500");
        return;
      }

      // Save name to localStorage
      localStorage.setItem("jazzi_contact_name", name);

      // Submit to Supabase
      const { error } = await supabase.from("contact_messages").insert([{ name, email, message }]);

      if (error) {
        console.error(error);
        feedback.textContent = "Something went wrong. Please try again.";
        feedback.classList.add("text-red-500");
      } else {
        form.reset();
        feedback.textContent = `Thanks for reaching out, ${name}!`;
        feedback.classList.remove("text-red-500");
        feedback.classList.add("text-green-500");

        // Sparkle 🎇
        launchSparkles();

        // Auto-clear feedback after 4 seconds
        setTimeout(() => {
          feedback.classList.add("fade-out"); // Start fading

          setTimeout(() => {
            feedback.textContent = "";
            feedback.classList.remove("fade-out", "text-green-500", "text-red-500");
          }, 1000); // Wait for fade-out transition to finish
        }, 3000);
      }

    });
  }
  function launchSparkles() {
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.position = "absolute";
      sparkle.style.left = `${form.offsetLeft + form.offsetWidth / 2}px`;
      sparkle.style.top = `${form.offsetTop + 20}px`;
      sparkle.style.width = "6px";
      sparkle.style.height = "6px";
      sparkle.style.borderRadius = "50%";
      sparkle.style.background = "#d4af37";
      sparkle.style.opacity = "1";
      sparkle.style.zIndex = "9999";
      sparkle.style.pointerEvents = "none";
      sparkle.style.transition = "transform 1s ease-out, opacity 1s ease-out";

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100 + 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      document.body.appendChild(sparkle);

      requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${x}px, ${y}px)`;
        sparkle.style.opacity = "0";
      });

      setTimeout(() => sparkle.remove(), 1000);
    }
  }

});