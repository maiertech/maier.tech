import type { Link } from '@/types/metadata';

export type Frontmatter = { title: string; [key: string]: any };

export interface TaggedItemFrontmatter extends Frontmatter {
  /** Date in local system time. */
  date: Date;
  slug?: string;
  tags?: string[];
}

export interface PostFrontmatter extends TaggedItemFrontmatter {
  author: string;
  description: string;
  category: string;
  links: Link[];
}
