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


/* ==============================================================
   10. EASTER EGG — INTERACTIVE TERMINAL (isolated IIFE)
   ============================================================== */
(function () {
    const terminal   = document.getElementById('terminal');
    const backdrop   = document.getElementById('terminal-backdrop');
    const output     = document.getElementById('terminal-output');
    const input      = document.getElementById('terminal-input');
    const titlebar   = document.getElementById('terminal-titlebar');
    const closeBtn   = document.getElementById('terminal-close');
    const trigger    = document.getElementById('terminal-trigger');

    if (!terminal || !input) return;

    let cmdHistory = [];
    let histIdx    = -1;
    let isOpen     = false;

    /* --- Open / Close --- */
    function open() {
        isOpen = true;
        terminal.classList.add('open');
        terminal.setAttribute('aria-hidden', 'false');
        backdrop.classList.add('open');
        input.focus();
        if (output.children.length === 0) welcome();
    }

    function close() {
        isOpen = false;
        terminal.classList.remove('open');
        terminal.setAttribute('aria-hidden', 'true');
        backdrop.classList.remove('open');
        // Reset position if it was dragged
        terminal.style.left = '';
        terminal.style.top  = '';
        terminal.style.transform = '';
    }

    function toggle() { isOpen ? close() : open(); }

    /* --- Keyboard shortcuts --- */
    document.addEventListener('keydown', (e) => {
        // Ctrl + Alt + T
        if (e.ctrlKey && e.altKey && (e.key === 't' || e.key === 'T')) {
            e.preventDefault();
            toggle();
            return;
        }
        // Backtick / tilde — only when not inside any input field
        if (e.code === 'Backquote' &&
            !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) &&
            !document.activeElement.isContentEditable) {
            e.preventDefault();
            toggle();
        }
    });

    if (trigger) trigger.addEventListener('click', toggle);
    const heroTrigger = document.getElementById('hero-terminal-trigger');
    if (heroTrigger) heroTrigger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);

    /* --- Print helpers --- */
    function print(text, type) {
        const el = document.createElement('div');
        el.className = 'terminal__line' + (type ? ' terminal__line--' + type : '');
        el.textContent = text;
        output.appendChild(el);
        scrollBottom();
    }

    function printBlank() { print(''); }

    function scrollBottom() {
        const body = terminal.querySelector('.terminal__body');
        body.scrollTop = body.scrollHeight;
    }

    function welcome() {
        print('╔══════════════════════════════════════════════╗');
        print('║     CyberTerm v1.0 — Portfolio Terminal      ║');
        print('╚══════════════════════════════════════════════╝');
        printBlank();
        print('  Bienvenue dans mon terminal interactif.', 'dim');
        print('  Tapez "help" pour la liste des commandes.', 'dim');
        printBlank();
    }

    /* --- Input handling --- */
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            if (cmd) {
                cmdHistory.push(cmd);
                histIdx = cmdHistory.length;
                print('lucas@portfolio:~$ ' + cmd, 'prompt');
                exec(cmd);
            }
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (histIdx > 0) { histIdx--; input.value = cmdHistory[histIdx]; }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (histIdx < cmdHistory.length - 1) { histIdx++; input.value = cmdHistory[histIdx]; }
            else { histIdx = cmdHistory.length; input.value = ''; }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const v = input.value.trim();
            if (v) {
                const match = CMDS.find(c => c.startsWith(v));
                if (match) input.value = match;
            }
        }
    });

    // Keep focus inside terminal
    terminal.addEventListener('click', () => input.focus());

    const CMDS = ['help','whoami','ls','cat','clear','exit','neofetch','ping','nmap','history','sudo','pwd','date','echo'];

    /* --- Command router --- */
    function exec(raw) {
        const parts = raw.trim().split(/\s+/);
        const cmd   = parts[0].toLowerCase();
        const args  = parts.slice(1).join(' ');

        switch (cmd) {
            case 'help':     cmdHelp(); break;
            case 'whoami':   cmdWhoami(); break;
            case 'ls':       cmdLs(); break;
            case 'cat':      cmdCat(args); break;
            case 'clear':    output.innerHTML = ''; return;
            case 'exit':     close(); return;
            case 'neofetch': cmdNeofetch(); break;
            case 'ping':     cmdPing(args); break;
            case 'nmap':     cmdNmap(args); break;
            case 'history':  cmdHistory2(); break;
            case 'sudo':     cmdSudo(args); break;
            case 'pwd':      print('/home/lucas/portfolio'); break;
            case 'date':     print(new Date().toLocaleString('fr-FR')); break;
            case 'echo':     print(parts.slice(1).join(' ')); break;
            case 'cd':       print('Permission denied: restricted shell.', 'error'); break;
            case 'rm':       print('Permission denied. Nice try.', 'error'); break;
            default:
                print('bash: ' + cmd + ': command not found', 'error');
                print('Tapez "help" pour voir les commandes disponibles.', 'dim');
        }
        printBlank();
    }

    /* --- Command implementations --- */

    function cmdHelp() {
        print('Commandes disponibles :', 'accent');
        printBlank();
        var list = [
            ['help',            'Affiche cette aide'],
            ['whoami',          'Qui suis-je ?'],
            ['ls',              'Liste les fichiers'],
            ['cat skills.txt',  'Mes compétences techniques'],
            ['cat cv.txt',      'Mon parcours condensé'],
            ['neofetch',        'Informations système'],
            ['ping <host>',     'Ping un hôte'],
            ['nmap localhost',  'Scan des ports locaux'],
            ['history',         'Historique des commandes'],
            ['clear',           'Efface le terminal'],
            ['exit',            'Ferme le terminal'],
        ];
        list.forEach(function (r) { print('  ' + r[0].padEnd(18) + ' ' + r[1]); });
        printBlank();
        print('Essayez aussi : sudo rm -rf /  ;)', 'dim');
    }

    function cmdWhoami() {
        print('lucas_carriat [ROOT]', 'success');
        print('Étudiant Cybersécurité & Réseaux — Futur Analyste SOC', 'dim');
    }

    function cmdLs() {
        print('drwxr-xr-x  lucas lucas  4096  skills.txt');
        print('drwxr-xr-x  lucas lucas  2048  cv.txt');
        print('-rw-r--r--  lucas lucas  1337  flag.txt');
        print('drwxr-xr-x  lucas lucas  4096  projets/');
        print('-rw-------  lucas lucas   512  .secret');
    }

    function cmdCat(args) {
        var a = args.toLowerCase();
        if (a === 'skills.txt') {
            print('═══ COMPÉTENCES TECHNIQUES ═══', 'accent');
            printBlank();
            print('[ RÉSEAUX ]', 'accent');
            print('  > VLANs, OSPF, NAT, DHCP/DNS');
            print('  > CLI Cisco (IOS), EVE-NG, GNS3');
            print('  > Câblage Cat 7 (TIA-568B)');
            printBlank();
            print('[ SYSTÈMES ]', 'accent');
            print('  > Windows Server (AD DS, GPO)');
            print('  > Linux (Ubuntu Server, Bash)');
            print('  > PowerShell & Python');
            printBlank();
            print('[ CYBERSÉCURITÉ ]', 'accent');
            print('  > IDS Suricata, analyse de menaces');
            print('  > Pentesting & Blue Team');
            print('  > Docker & conteneurisation');
            print('  > CTF: Rhinotec 2025 (12e place)');
            printBlank();
            print('[ PLATEFORMES ]', 'accent');
            print('  > TryHackMe | HackTheBox | Root-Me | LetDefend');
        } else if (a === 'cv.txt') {
            print('═══ CURRICULUM VITAE ═══', 'accent');
            printBlank();
            print('Lucas Carriat — Mulhouse, FR');
            printBlank();
            print('FORMATION', 'accent');
            print('  2025-2028  B.U.T. R&T — IUT de Colmar');
            print('  2025       Bac STI2D (SIN) — Mention AB');
            printBlank();
            print('EXPÉRIENCE', 'accent');
            print('  2022+      Production musicale (Freelance)');
            print('  2021       Stage Maintenance — Labo Servier');
            printBlank();
            print('LANGUES', 'accent');
            print('  Anglais B2 | Allemand A2');
        } else if (a === 'flag.txt') {
            print('CTF{w3ll_pl4y3d_y0u_f0und_th3_fl4g}', 'success');
            print('Bravo ! Tu as trouvé le flag caché. ;)', 'dim');
        } else if (a === '.secret') {
            print('cat: .secret: Permission denied', 'error');
        } else if (!a) {
            print('cat: argument manquant', 'error');
            print('Usage: cat <fichier>', 'dim');
        } else {
            print('cat: ' + a + ': No such file or directory', 'error');
        }
    }

    function cmdNeofetch() {
        var lines = [
            ['  ██╗      ██████╗ ', ''],
            ['  ██║     ██╔════╝ ', '  lucas@portfolio'],
            ['  ██║     ██║      ', '  ─────────────────'],
            ['  ██║     ██║      ', '  OS:      Portfolio v2.0'],
            ['  ███████╗╚██████╗ ', '  Host:    lucas-carriat.dev'],
            ['  ╚══════╝ ╚═════╝ ', '  Shell:   CyberTerm 1.0'],
            ['                   ', '  Stack:   HTML5 / CSS3 / JS'],
            ['                   ', '  Network: BUT R&T @ IUT Colmar'],
            ['                   ', '  Spec:    Cybersécurité'],
            ['                   ', '  Goal:    Analyste SOC'],
            ['                   ', '  Uptime:  Since 2025'],
        ];
        lines.forEach(function (r) { print(r[0] + r[1]); });
    }

    function cmdPing(host) {
        var h = host || 'google.com';
        print('PING ' + h + ' (142.250.74.46): 56 data bytes');
        print('64 bytes from 142.250.74.46: icmp_seq=0 ttl=117 time=12.3 ms');
        print('64 bytes from 142.250.74.46: icmp_seq=1 ttl=117 time=11.8 ms');
        print('64 bytes from 142.250.74.46: icmp_seq=2 ttl=117 time=13.1 ms');
        print('--- ' + h + ' ping statistics ---');
        print('3 packets transmitted, 3 received, 0% packet loss', 'success');
    }

    function cmdNmap(args) {
        var t = args || 'localhost';
        print('Starting Nmap 7.94 ( https://nmap.org )');
        print('Nmap scan report for ' + t + ' (127.0.0.1)');
        printBlank();
        print('PORT     STATE    SERVICE');
        print('22/tcp   open     ssh', 'success');
        print('80/tcp   open     http', 'success');
        print('443/tcp  open     https', 'success');
        print('3306/tcp closed   mysql', 'error');
        print('8080/tcp filtered proxy', 'dim');
        printBlank();
        print('Nmap done: 1 IP address (1 host up) scanned in 0.42s');
    }

    function cmdHistory2() {
        if (cmdHistory.length === 0) { print('Aucun historique.', 'dim'); return; }
        cmdHistory.forEach(function (c, i) {
            print('  ' + String(i + 1).padStart(3) + '  ' + c);
        });
    }

    function cmdSudo(args) {
        if (args.indexOf('rm') !== -1 && args.indexOf('-rf') !== -1 && args.indexOf('/') !== -1) {
            printBlank();
            print('  [!] ACCESS DENIED [!]', 'error');
            printBlank();
            print('  Nice try, hacker. ;)', 'error');
            print('  Cet incident a été reporté.', 'dim');
            printBlank();
            print('  ...je plaisante. Mais quand même, pas touche.', 'dim');
        } else {
            print('sudo: ' + (args || '???') + ': permission denied', 'error');
            print('lucas is not in the sudoers file. This incident will be reported.', 'dim');
        }
    }

    /* --- Draggable window --- */
    var isDragging = false;
    var dragOff = { x: 0, y: 0 };

    titlebar.addEventListener('mousedown', function (e) {
        isDragging = true;
        var rect = terminal.getBoundingClientRect();
        dragOff.x = e.clientX - rect.left;
        dragOff.y = e.clientY - rect.top;
        // Switch from transform-centering to absolute positioning
        terminal.style.left = rect.left + 'px';
        terminal.style.top  = rect.top + 'px';
        terminal.style.transform = 'none';
        terminal.style.transition = 'none';
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        terminal.style.left = (e.clientX - dragOff.x) + 'px';
        terminal.style.top  = (e.clientY - dragOff.y) + 'px';
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            terminal.style.transition = '';
        }
    });

    // Touch drag
    titlebar.addEventListener('touchstart', function (e) {
        isDragging = true;
        var touch = e.touches[0];
        var rect = terminal.getBoundingClientRect();
        dragOff.x = touch.clientX - rect.left;
        dragOff.y = touch.clientY - rect.top;
        terminal.style.left = rect.left + 'px';
        terminal.style.top  = rect.top + 'px';
        terminal.style.transform = 'none';
        terminal.style.transition = 'none';
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
        if (!isDragging) return;
        var touch = e.touches[0];
        terminal.style.left = (touch.clientX - dragOff.x) + 'px';
        terminal.style.top  = (touch.clientY - dragOff.y) + 'px';
    }, { passive: true });

    document.addEventListener('touchend', function () {
        isDragging = false;
        terminal.style.transition = '';
    });

})();