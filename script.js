// ─── Mobile Menu Toggle ───────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

// ─── Typing Animation ─────────────────────────────────────
const typingText = document.querySelector('.typing-text');
const words = ['Full Stack Developer', 'Software Engineer', 'Problem Solver', 'Backend Developer'];
let wordIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

function type() {
    if (!typingText) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, --charIndex);
        typeSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, ++charIndex);
        typeSpeed = 100;
    }
    if (!isDeleting && charIndex === currentWord.length) { typeSpeed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 1000));

// ─── Scroll Reveal (all variants) ────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-right, .reveal-left, .reveal-scale');
const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
    });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// Safety fallback: if elements still hidden after 2.5s, force show them all
setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-right, .reveal-left, .reveal-scale').forEach(el => {
        el.classList.add('active');
    });
}, 2500);

// ─── Active Nav link on scroll ────────────────────────────
const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
    });
    navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').substring(1) === current) a.classList.add('active');
    });
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(8,10,16,0.97)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
    } else {
        navbar.style.background = 'rgba(8,10,16,0.75)';
        navbar.style.boxShadow = 'none';
    }
});

// ─── Floating Particles ───────────────────────────────────
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); spawnParticles(); });

    const COLORS = ['rgba(79,142,247,', 'rgba(168,85,247,', 'rgba(6,182,212,'];

    function makeParticle() {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5 + 0.4,
            alpha: Math.random() * 0.35 + 0.05,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            color
        };
    }

    function spawnParticles() {
        const count = Math.floor((W * H) / 12000);
        particles = Array.from({ length: Math.min(count, 100) }, makeParticle);
    }
    spawnParticles();

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();
        });
        // Draw faint connecting lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(79,142,247,${0.06 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ─── Magnetic hover effect on buttons ────────────────────
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ─── Skill tag stagger hover ──────────────────────────────
document.querySelectorAll('.skill-tags span').forEach((span, i) => {
    span.style.transitionDelay = `${i * 20}ms`;
});
