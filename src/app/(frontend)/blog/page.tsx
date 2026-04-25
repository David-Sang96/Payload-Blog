import { Media } from "@/payload-types";
import { ArticleCard } from "./_components/article-card";
import { getPublishedArticles } from "@/collections/Articles/fetchers";
import { relationIsObject } from "../lib";

const BlogPage = async () => {
  const articles = await getPublishedArticles();
  if (!articles.length) {
    return <p>No articles found</p>;
  }

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {articles.map(
        ({
          id,
          title,
          contentSummary,
          coverImage,
          publishedAt,
          author,
          slug,
          status,
          readTimeInMins,
        }) => {
          if (!relationIsObject(coverImage)) {
            console.warn("Cover image is not an object", coverImage);
            return null;
          }

          if (!relationIsObject(author) || !relationIsObject(author.avatar))
            return null;

          return (
            <ArticleCard
              key={id}
              title={title}
              href={`/blog/${slug}`}
              summary={contentSummary}
              readTimeMins={readTimeInMins ?? 0}
              publishedAt={new Date(publishedAt ?? new Date())}
              coverImage={coverImage}
              author={{
                avatar: author.avatar,
                name: author.name,
                role: author.role,
              }}
            />
          );
        },
      )}
    </div>
  );
};

export default BlogPage;
