import React from "react";
import { ArticleCard } from "./_components/article-card";

const BlogPage = async () => {
  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <ArticleCard
        href="/blog/how-to-create-a-blog-tutorial"
        title="How to create a blog tutorial no one asked for"
        summary="    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, eaque!"
        coverImage="https://via.assets.so/img.jpg?w=600&h=600&bg=6b7280&f=png"
        publishedAt={new Date("2026-04-25T20:45:00")}
        readTimeMins={42}
        author={{
          avatar: "https://via.assets.so/img.jpg?w=600&h=600&bg=6b7280&f=png",
          name: "John Doe",
          role: "Staff Writer",
        }}
      />
    </div>
  );
};

export default BlogPage;
