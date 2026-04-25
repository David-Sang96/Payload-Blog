import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArticleMetadata from "./artice-metadata";

type ArticleCardProps = {
  href: string;
  title: string;
  summary: string;
  coverImage: string;
  publishedAt: Date;
  readTimeMins: number;
  author: {
    avatar: string;
    name: string;
    role: string;
  };
};

export const ArticleCard = ({
  href,
  title,
  summary,
  coverImage,
  publishedAt,
  readTimeMins,
  author,
}: ArticleCardProps) => {
  return (
    <Link href={href} aria-label={`Read article: "${title}"`} className="block">
      <article className="overflow-hidden rounded-md border border-gray-700">
        {/* cover image */}
        <Image
          src={coverImage}
          alt={`cover image for ${title}`}
          width={600}
          height={300}
          className="max-h-75 object-cover object-center"
        />

        {/* content */}
        <div className="p-3">
          <header>
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2">{summary}</p>
          </header>

          <ArticleMetadata
            intent="card"
            data={{ author, publishedAt, readTimeMins }}
          />
        </div>
      </article>
    </Link>
  );
};

export function ArticleCardSkeleton() {
  return <div className="h-87.5 animate-pulse rounded-md bg-gray-700" />;
}
