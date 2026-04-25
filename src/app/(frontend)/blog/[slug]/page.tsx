import Image from "next/image";
import ArticleMetadata from "../_components/artice-metadata";
import { RichText } from "@/lib/payload/components/rich-text";
import { getArticleBySlug } from "@/collections/Articles/fetchers";
import { notFound } from "next/navigation";
import { formatRole, relationIsObject } from "../../lib";

const publishedAt = new Date("2026-11-13T20:45:00");

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  if (!relationIsObject(article.coverImage)) return null;
  if (
    !relationIsObject(article.author) ||
    !relationIsObject(article.author.avatar)
  ) {
    return null;
  }

  console.log(article.content);

  return (
    <div className="prose lg:prose-lg dark:prose-invert max-w-full">
      <h1> {article.title}</h1>

      <ArticleMetadata
        intent="post"
        data={{
          author: {
            avatar: article.author.avatar,
            name: article.author.name,
            role: formatRole(article.author.role),
          },
          publishedAt: new Date(article.publishedAt ?? new Date()),
          readTimeMins: article.readTimeInMins ?? 0,
        }}
        className="not-prose"
      />

      <Image
        src={article.coverImage.url ?? ""}
        alt="Cover image"
        width={600}
        height={300}
        className="w-full rounded-md object-cover object-center"
        placeholder="blur"
        blurDataURL={article.coverImage.blurDataUrl}
      />

      <RichText lexicalData={article.content} />
    </div>
  );
};

export default BlogDetailPage;
