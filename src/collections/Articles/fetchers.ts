import { getPayloadClient } from "@/lib/payload/helpers/client";
import { CACHE_TAG_ARTICLES, STATUS_OPTIONS } from "./constansts";
import { unstable_cache } from "next/cache";

async function _getPublishedArticles() {
  const payload = await getPayloadClient();
  try {
    const { docs: articles } = await payload.find({
      collection: "articles",
      depth: 2, // depth = how deep relations get populated
      select: {
        slug: true,
        title: true,
        contentSummary: true,
        author: true,
        coverImage: true,
        readTimeInMins: true,
        status: true,
        publishedAt: true,
      },
      where: {
        status: { equals: STATUS_OPTIONS[1].value },
      },
    });
    return articles ?? [];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

export function cmsCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  key: string[],
  options?: { tags?: string[] },
) {
  return unstable_cache(fn, key, options);
}

export const getPublishedArticles = cmsCache(
  _getPublishedArticles,
  ["published-articles"],
  {
    tags: [CACHE_TAG_ARTICLES],
  },
);

export async function getArticleBySlug(slug: string) {
  const payload = await getPayloadClient();
  try {
    const { docs: articles } = await payload.find({
      collection: "articles",
      limit: 1,
      where: { slug: { equals: slug } },
    });
    const [firstArticle] = articles ?? [];
    return firstArticle ?? null;
  } catch (error) {
    console.error("Failed to fetch articles", error);
    return null;
  }
}
