// script.js

// 1. GESTION DE LA BANNIÈRE
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('top-banner');
    const closeBtn = document.getElementById('close-banner');

    if (banner && closeBtn) {
        closeBtn.addEventListener('click', function() {
            banner.style.display = 'none';
        });
    }
});

// 2. CONFIGURATION DE LA PLUIE "TECH" (Le code qui manquait)
// On vérifie que la librairie est bien chargée avant de lancer
if (typeof tsparticles !== 'undefined') {
    tsparticles.load('tsparticles', {
        background: {
            color: { value: "transparent" }, // Transparent pour laisser le CSS gérer le fond
        },
        fpsLimit: 60,
        particles: {
            color: { value: ["#6366f1", "#7C3AED", "#a855f7"] }, // Couleurs violet/bleu
            shape: { type: "square" }, // Forme carrée "pixel"
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: { min: 2, max: 4 }, // Taille des gouttes
                random: true,
            },
            move: {
                enable: true,
                speed: 3,             
                direction: "bottom",  // CHUTE VERS LE BAS
                random: false,
                straight: false,
                outModes: { default: "out" }, // Réapparaît en haut quand ça sort en bas
            },
            number: {
                density: { enable: true, area: 800 },
                value: 80, // Densité de la pluie
            },
            links: { enable: false }, // Pas de traits, juste des gouttes
        },
        detectRetina: true,
    });
} else {
    console.error("La librairie tsparticles n'est pas chargée dans le HTML !");
}