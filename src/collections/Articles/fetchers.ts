import { getPayloadClient } from "@/lib/payload/client";
import { STATUS_OPTIONS } from "./constansts";

export async function getPublishedArticles() {
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
