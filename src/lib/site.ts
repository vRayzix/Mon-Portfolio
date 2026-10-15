export const site = {
  name: 'Lucas Carriat',
  role: 'Administration systèmes et réseaux',
  description:
    'Lucas Carriat, futur administrateur systèmes et réseaux. Homelab Linux supervisé et sécurisé, déploiements Debian, réseaux Cisco. Recherche un stage d’avril à juin 2027.',
  locale: 'fr_FR',
  email: 'lucalexandrecrr@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucas-c-961610396/',
  github: 'https://github.com/vRayzix',
  location: 'Mulhouse, France',
  cv: 'cv/lucas-carriat-cv.pdf',
} as const;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function href(path = ''): string {
  return `${base}/${path.replace(/^\//, '')}`;
}

export function isCurrent(current: string, path: string): boolean {
  const target = href(path);
  return path === '' ? current === target : current.startsWith(target);
}
