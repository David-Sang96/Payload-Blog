import { ArticleCardSkeleton } from "./_components/article-card";

const BlogPageLoading = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default BlogPageLoading;
