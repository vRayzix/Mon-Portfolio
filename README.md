# Portfolio Académique — Lucas Carriat
**B.U.T. Réseaux & Télécommunications · IUT de Colmar (UHA)**

Livrable académique attestant les trois compétences du référentiel national B.U.T. R&T au travers de situations professionnelles et de projets SAÉ.

---

## Structure du dépôt

```
Mon-Portfolio/
├── index.html                        # Page principale (HTML/CSS pur, zéro JavaScript)
├── style.css                         # Feuille de styles — thème sombre violet/cyan
├── cv_lucas_carriat.pdf              # CV téléchargeable
│
├── Rapport projet SAE13 2025.pdf     # Rapport SAÉ 1.03 (Wi-Fi & câblage)
│
├── # Images SAÉ 1.02 — Architecture réseau succursale (EVE-NG)
├── SAE102LAB.PNG                     # Topologie EVE-NG
├── SAE102DHCP.PNG                    # Preuve DHCP (ip helper-address)
│
├── # Images SAÉ 1.03 — Heatmap IUT & câblage structuré
├── SAE103PKT.PNG                     # Simulation Packet Tracer
├── SAE103UHA.PNG                     # Accès site uha1.fr
│
├── # Images SAÉ 1.05 — Automation & scripting Python/PowerShell
├── SAE105FILES.PNG                   # Structure du projet
├── SAE105CAM.PNG                     # Interface PySide6 (camembert)
│
├── # Images SAÉ 2.02 — Radio Internet ESP32 (MURA)
├── esp32-boitier-radio.jpg           # Radio terminée (boîtier bois)
├── esp32-carte-oled.jpg              # HUZZAH32 + OLED SSD1306
├── esp32-demarrage-wifi.jpg          # Démarrage connexion Wi-Fi
├── esp32-wifi-connecte.jpg           # Wi-Fi connecté, IP affichée
├── esp32-lecture-station.jpg         # Lecture en cours (Skyrock)
├── esp32-app-controle.jpg            # App Flutter Android contrôle MQTT
│
├── # Images VPS DigitalOcean & Zabbix
├── vps-droplet-digitalocean.png      # Droplet Debian provisionné
├── vps-nginx-status.png              # systemctl status nginx
├── zabbix-supervision.png            # Dashboard Zabbix (métriques)
│
├── # Images divers
├── CONCOURS.png                      # Concours OSI
├── DYLO.PNG                          # Logo projet DYLO
├── Logo_clean.Cxb_HDzr.png          # Logo RhineTech CTF
├── apercu-portfolio.png              # Aperçu du portfolio
│
└── # SAÉ 2.03 — Images à insérer (zones réservées dans index.html)
    # dashboard-django.png            TODO
    # liste-vols-django.png           TODO
    # formulaire-generique.png        TODO
    # import-csv-django.png           TODO
    # topologie-vms.png               TODO
    # systemctl-gunicorn.png          TODO
```

---

## Compétences attestées

### RT1 — Administrer les réseaux et l'Internet
Déploiement, configuration et dépannage d'infrastructures réseau.

| AC | Libellé court | Statut | Preuve principale |
|----|--------------|--------|-------------------|
| AC11.01 | Lois fondamentales de l'électricité | Acquise | TP R1.04 · SAÉ 2.02 (câblage ESP32) |
| AC11.02 | Fondements des systèmes numériques | Acquise | Modèles OSI/TCP-IP · SAÉ 2.02 (streaming) |
| AC11.03 | Configurer un réseau local | Acquise | SAÉ 1.02 (EVE-NG) · SAÉ 2.01 (GNS3) |
| AC11.04 | Interagir avec les OS | Acquise | Linux R1.02/R2.01 · SAÉ 2.03 (Nginx/systemd) |
| AC11.05 | Identifier les dysfonctionnements | Acquise | SAÉ 2.01 (ACL/NAT) · SAÉ 2.03 (502 debug) |
| AC11.06 | Installer un poste client | Acquise | TP R2.04 |

### RT2 — Connecter les entreprises et les usagers
Déploiement et mesure de supports de transmission filaires/sans fil.

| AC | Libellé court | Statut | Preuve principale |
|----|--------------|--------|-------------------|
| AC12.01 | Mesurer et analyser des signaux | Acquise | SAÉ 1.03 (PoE, RSSI, Acrylic Wi-Fi) |
| AC12.02 | Caractériser des systèmes de transmission | En cours | R1.06/R2.06 (Shannon, modulation) |
| AC12.03 | Déployer des supports de transmission | Acquise | SAÉ 1.03 (Cat 7 TIA-568B, AP Cisco) |
| AC12.04 | Connecter les systèmes ToIP | En cours | Cours R2.07 |
| AC12.05 | Communiquer avec un interlocuteur | Acquise | Oral SAÉ 1.03 devant jury |

### RT3 — Créer des outils et applications pour les R&T
Développement et déploiement de solutions logicielles pour les réseaux.

| AC | Libellé court | Statut | Preuve principale |
|----|--------------|--------|-------------------|
| AC13.01 | Utiliser un système informatique | Acquise | Linux/Windows · SAÉ 2.03 (systemd, venv) |
| AC13.02 | Lire, corriger, modifier un programme | En cours | SAÉ 1.05 · débogage Django SAÉ 2.03 |
| AC13.03 | Traduire un algorithme | À améliorer | SAÉ 2.02 (courbe log volume, EQ 5 bandes) |
| AC13.04 | Architecture d'un site web | Acquise | SAÉ 1.01 (HTML/CSS) · SAÉ 2.03 (Django/Nginx) |
| AC13.05 | Gestion de données | Acquise | SAÉ 2.03 (MariaDB 6 entités, import CSV) |
| AC13.06 | Travail collaboratif | Acquise | SAÉ 2.03 (Git/GitHub, ClickUp Gantt) |

---

## Projets SAÉ

| Projet | Semestre | Technologies | ACs validées |
|--------|----------|-------------|--------------|
| SAÉ 1.01 — CV HTML/CSS | S1 | HTML, CSS | AC13.04 |
| SAÉ 1.02 — Architecture réseau succursale | S1 | EVE-NG, Cisco IOS, VLANs, DHCP relay | AC11.03, 11.04, 11.05 |
| SAÉ 1.03 — Heatmap IUT & câblage | S1 | Acrylic Wi-Fi, Cat 7 TIA-568B, Packet Tracer | AC12.01, 12.03, 12.05 |
| SAÉ 1.05 — Automation & scripting | S1 | PowerShell, Python, PySide6 | AC13.01, 13.02, 13.03 |
| SAÉ 2.01 — Réseau multi-services avancé | S2 | GNS3, RIPv2, port-security, ACL, NAT | AC11.03, 11.04, 11.05 |
| SAÉ 2.02 — Radio Internet ESP32 (MURA) | S2 | ESP32, VS1053, MQTT, Flutter, OLED | AC11.01, 11.02, 13.01–13.03 |
| SAÉ 2.03 — Gestion trafic aérien Django | S2 | Django, MariaDB, Nginx, Gunicorn, systemd | AC13.01, 13.02, 13.04–13.06 |

---

## Choix techniques du site

- **Zéro JavaScript** : navigation flex-wrap, accordéons `<details>/<summary>`, formulaire natif POST (web3forms)
- **HTML/CSS pur** : thème sombre violet/cyan, timeline CSS, cartes glassmorphism
- **Hébergement** : GitHub Pages (branche `main`)
- **Formulaire contact** : web3forms (clé publique, redirection native)

---

## Auteur

**Lucas Carriat** — lucalexandrecrr@gmail.com  
GitHub : [vRayzix](https://github.com/vRayzix) · LinkedIn : [Lucas Carriat](https://www.linkedin.com/in/lucas-c-961610396/)
