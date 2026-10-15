# Portfolio · Lucas Carriat

Site personnel de Lucas Carriat, futur administrateur systèmes et réseaux : études de cas (homelab Linux supervisé et sécurisé, déploiement sur Debian, réseau Cisco) et informations de contact.

En ligne : <https://vrayzix.github.io/Mon-Portfolio/>

## Stack

- [Astro](https://astro.build) 7 en sortie statique, sans JavaScript côté client
- TypeScript en mode `strictest`
- Contenu des projets en MDX, dans une collection typée (schéma Zod)
- CSS natif : design tokens en variables CSS, thèmes clair et sombre via `prefers-color-scheme`
- Police Inter Variable auto-hébergée (`@fontsource-variable/inter`)
- Images optimisées au build en AVIF et WebP (`astro:assets`)
- Schémas d’architecture en SVG accessibles, dessinés en composants Astro
- ESLint (règles Astro, TypeScript et jsx-a11y) et Prettier

## Lancer en local

Prérequis : Node.js 22.12 ou plus récent (voir `.nvmrc`).

```sh
npm ci
npm run dev
```

Le site est servi sur <http://localhost:4321/Mon-Portfolio/>.

| Commande          | Action                                         |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Serveur de développement                       |
| `npm run build`   | Build de production dans `dist/`               |
| `npm run preview` | Sert le build de production en local           |
| `npm run lint`    | ESLint, vérification Prettier et `astro check` |
| `npm run format`  | Formate le code avec Prettier                  |

## Structure

```
.github/workflows/deploy.yml   Vérifications, build et déploiement sur GitHub Pages
public/                        Fichiers servis tels quels (CV, favicon, robots.txt)
src/
  assets/                      Images optimisées au build (projets, image Open Graph)
  components/                  Composants d’interface
    diagram/                   Schémas SVG (homelab, déploiement Django)
    homelab/                   Tableau des services du homelab
  content/projects/            Études de cas en MDX
  content.config.ts            Schéma de la collection « projects »
  layouts/                     Gabarit de base (SEO, Open Graph) et gabarit d’étude de cas
  lib/                         Configuration du site et utilitaires
  pages/                       Routes : accueil, homelab, projets, à propos, 404
  styles/                      Tokens, reset, styles globaux, prose et schémas
```

## Ajouter ou modifier un projet

1. Créer un fichier `src/content/projects/<slug>.mdx`.
2. Renseigner le frontmatter (`title`, `summary`, `description`, `order`, `kind`, `tags`, `role`, `context`, `stack`, et éventuellement `cover`, `coverAlt`, `period`, `status`, `snippet`, `links`). Le schéma dans `src/content.config.ts` valide chaque champ au build.
3. Placer les images dans `src/assets/projects/<slug>/` et les insérer avec le composant `Figure`.

La page est générée automatiquement sous `/projets/<slug>/`. L’entrée `homelab` a sa propre route, `/homelab/`.

## Déploiement

Chaque push sur `main` déclenche le workflow `.github/workflows/deploy.yml` :

1. installation des dépendances, puis lint, formatage et vérification des types ;
2. build avec l’action officielle `withastro/action` ;
3. publication avec `actions/deploy-pages`.

Dans les paramètres du dépôt, **Settings → Pages → Source** doit être réglé sur **GitHub Actions**. Le site est construit avec `base: '/Mon-Portfolio'` (voir `astro.config.mjs`).

## Sécurité

Le site est public : aucune adresse IP publique, aucun nom d’hôte interne, aucun port ni identifiant d’administration n’y est publié. Le site n’utilise ni formulaire tiers, ni traceur, ni police ou script externes.
