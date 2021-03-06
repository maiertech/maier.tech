import fs from 'fs';
import path from 'path';

import glob from 'glob';
import matter from 'gray-matter';
import mdxPrism from 'mdx-prism';
import { serialize } from 'next-mdx-remote/serialize';
import codeTitles from 'remark-code-titles';

import { slugify } from './helpers';

import type { Frontmatter } from '@/types/frontmatter';

/** Path to directory with MDX collections. */
const contentPath = path.join(process.cwd(), 'content');

type MdxFile = {
  frontmatter: Frontmatter;
  /** Unprocessed MDX. */
  content: string;
};

/**
 * Get all files that are part of an MDX collection.
 *
 * @param collection Collection ID, e.g. `posts`.
 *
 * @returns Array of objects with frontmatter and content.
 */
export function getMdxFiles(collection: string): MdxFile[] {
  // Caching files to avoid reading the same files several times from the file system would break local dev.
  const paths = glob.sync(`${path.join(contentPath, collection)}/**/*.mdx`);
  return paths.map((filePath) => {
    const file = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(file);
    return { frontmatter: { ...data }, content } as MdxFile;
  });
}

/**
 * Get all frontmatters for a collection.
 *
 * @param collection Collection ID, e.g. `posts`.
 *
 * @returns Array of objects with parsed frontmatter.
 */
export function getFrontmatters(collection: string): Frontmatter[] {
  return getMdxFiles(collection).map(({ frontmatter }) => frontmatter);
}

/**
 * Get MDX file by slug.
 * This function is called by `getStaticProps` for those paths that are returned by `getStaticPaths`.
 * Therefor, a page corresponding to `slug` exists.
 *
 * @param collection Collection ID, e.g. `posts`.
 * @param slug Retrieve MDX file that matches this slug.
 *
 * @returns Processed MDX and frontmatter.
 */
export async function getFileBySlug(collection: string, slug: string) {
  const files = getMdxFiles(collection);

  // Find matching slug in frontmatters.
  const file = files.find(({ frontmatter }) => {
    // Compare with slug in frontmatter if it exists.
    if (frontmatter.slug && frontmatter.slug === slug) return true;
    // Compare with slugified title.
    if (frontmatter.title && slugify(frontmatter.title) === slug) return true;
    return false;
  });

  // Process MDX.
  if (file) {
    const mdxSource = await serialize(file.content, {
      mdxOptions: {
        remarkPlugins: [codeTitles],
        rehypePlugins: [mdxPrism],
      },
    });
    return { mdxSource, frontmatter: file.frontmatter };
  }

  // There is no MDX file that matches the slug (you should never end up here).
  return null;
}
