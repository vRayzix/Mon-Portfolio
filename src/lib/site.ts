export const site = {
  name: 'Lucas Carriat',
  role: 'Étudiant en réseaux et télécoms',
  headline: 'Stage en administration systèmes et réseaux',
  description:
    'Lucas Carriat, étudiant en réseaux et télécommunications, recherche un stage de 9 semaines en administration systèmes et réseaux d’avril à juin 2027. Homelab Debian supervisé, déploiements Linux, réseaux Cisco.',
  locale: 'fr_FR',
  email: 'lucalexandrecrr@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucas-c-961610396/',
  github: 'https://github.com/vRayzix',
  beatstars: 'https://www.beatstars.com/stahnageprod',
  location: 'Mulhouse, France',
  cv: 'cv.pdf',
} as const;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function href(path = ''): string {
  return `${base}/${path.replace(/^\//, '')}`;
}

export function isCurrent(current: string, path: string): boolean {
  const target = href(path);
  return path === '' ? current === target : current.startsWith(target);
}
