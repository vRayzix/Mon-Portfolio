/* ================================================================
   LUCAS CARRIAT — PORTFOLIO V2
   Core Interactivity + Cyberpunk Animations
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. MOBILE NAVIGATION
    ---------------------------------------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const navLinks  = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ----------------------------------------------------------
       2. ACTIVE NAV LINK ON SCROLL
    ---------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav__link');

    const activateNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', activateNav, { passive: true });

    /* ----------------------------------------------------------
       3. SCROLL REVEAL (IntersectionObserver)
    ---------------------------------------------------------- */
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    /* ----------------------------------------------------------
       4. PROJECT FILTER
    ---------------------------------------------------------- */
    const filterBtns  = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ----------------------------------------------------------
       5. MODALS
    ---------------------------------------------------------- */
    const allModals = document.querySelectorAll('.modal');

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        const closeBtn = modal.querySelector('.modal__close');
        if (closeBtn) closeBtn.focus();
    };

    const closeModal = (modal) => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.dataset.modal;
            if (modalId) openModal(modalId);
        });
    });

    allModals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal__close');
        const overlay  = modal.querySelector('.modal__overlay');

        if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
        if (overlay) overlay.addEventListener('click', () => closeModal(modal));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            allModals.forEach(modal => {
                if (modal.classList.contains('open')) closeModal(modal);
            });
        }
    });

    /* ----------------------------------------------------------
       6. NAV BACKGROUND ON SCROLL
    ---------------------------------------------------------- */
    const nav = document.getElementById('nav');

    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 7, 16, 0.95)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(10, 7, 16, 0.85)';
            nav.style.boxShadow = 'none';
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    /* ==========================================================
       --- NOUVELLES ANIMATIONS CYBERPUNK ---
    ========================================================== */

    /* ----------------------------------------------------------
       7. TERMINAL DECRYPT (HERO TITLE)
    ---------------------------------------------------------- */
    const decryptTarget = document.querySelector('[data-decrypt]');
    if (decryptTarget) {
        const originalText = decryptTarget.innerText;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
        let iterations = 0;
        
        setTimeout(() => {
            const interval = setInterval(() => {
                decryptTarget.innerText = originalText.split('')
                    .map((letter, index) => {
                        if(index < iterations) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');
                
                if(iterations >= originalText.length) clearInterval(interval);
                iterations += 1 / 3; 
            }, 30);
        }, 500);
    }

   /* ----------------------------------------------------------
       8. NEON PROXIMITY (OPTIMISÉ)
    ---------------------------------------------------------- */
    if (window.matchMedia("(pointer: fine)").matches) {
        document.querySelectorAll('.project-card, .skill-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                // requestAnimationFrame empêche le lag en synchronisant avec l'écran
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(176, 38, 255, 0.15) 0%, rgba(16, 10, 30, 0.6) 40%)`;
                    card.style.borderColor = 'rgba(176, 38, 255, 0.3)';
                });
            });

            card.addEventListener('mouseleave', () => {
                card.style.background = '';
                card.style.borderColor = '';
            });
        });
    }

    /* ----------------------------------------------------------
       9. PARTICLES BACKGROUND
    ---------------------------------------------------------- */
    const canvasContainer = document.getElementById('particles-bg');
    if(canvasContainer) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvasContainer.appendChild(canvas);

        let width, height, particles;

        function initParticles() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            const particleCount = window.innerWidth < 768 ? 20 : 40;

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.5)'; 
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(drawParticles);
        }

        initParticles();
        drawParticles();
        window.addEventListener('resize', initParticles);
    }

});