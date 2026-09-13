import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const directory = path.join(process.cwd(), "content/case-studies");

export async function getCaseStudy(slug: string) {
  const source = await fs.readFile(path.join(directory, `${slug}.mdx`), "utf8");
  const { data, content } = matter(source);
  return { data: data as { title: string; summary: string; tags: string[] }, content };
}
