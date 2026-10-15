import { getCollection, type CollectionEntry } from 'astro:content';
import { href } from './site';

export type Project = CollectionEntry<'projects'>;

export const kindLabel: Record<Project['data']['kind'], string> = {
  phare: 'Projet phare',
  principal: 'Projet principal',
  secondaire: 'Projet secondaire',
};

export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects');
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export function projectHref(project: Project): string {
  return project.id === 'homelab' ? href('homelab/') : href(`projets/${project.id}/`);
}
