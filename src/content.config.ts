import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      short: z.string(),
      summary: z.string(),
      description: z.string().max(170),
      order: z.number().int(),
      kind: z.enum(['phare', 'principal', 'secondaire']),
      tags: z.array(z.string()).min(1),
      role: z.string(),
      context: z.string(),
      period: z.string().optional(),
      status: z.string().optional(),
      stack: z.array(z.string()).min(1),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      snippet: z.string().optional(),
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    }),
});

export const collections = { projects };
