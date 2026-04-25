import Image from "next/image";
import React from "react";

interface ArticleMetadata {
  data: {
    publishedAt: Date;
    readTimeMins: number;
    author: {
      avatar: string;
      name: string;
      role: string;
    };
  };
  intent: "card" | "post";
  className?: string;
}

const ArticleMetadata = ({ data, intent, className }: ArticleMetadata) => {
  const { author, publishedAt, readTimeMins } = data;

  return (
    <div className={`mt-4 flex items-center justify-between ${className}`}>
      <div
        className={`flex items-center ${intent === "card" ? "gap-2" : "gap-3"}`}
      >
        <Image
          src={author.avatar}
          alt={`${author.name}'s avatar`}
          width={40}
          height={40}
          className={`rounded-full ${intent === "card" ? "size-10" : "size-11"}`}
          sizes="40px"
        />

        <div
          className={`flex flex-col leading-none ${intent === "card" ? "gap-1.5 text-sm" : "gap-2 text-base"}`}
        >
          <p className="font-bold">{author.name}</p>
          <p className="text-dimmed">{author.role}</p>
        </div>
      </div>

      <div
        className={`flex flex-col text-right ${intent === "card" ? "gap-1.5 text-sm" : "gap-2 text-base"}`}
      >
        <time
          dateTime={new Date(publishedAt).toISOString()}
          className="leading-none"
        >
          {publishedAt.toLocaleString("en-GB", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
        <p className="text-dimmed leading-none">{readTimeMins} minutes read</p>
      </div>
    </div>
  );
};

export default ArticleMetadata;
