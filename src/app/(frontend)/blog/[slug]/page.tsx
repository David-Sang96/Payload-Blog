import Image from "next/image";
import ArticleMetadata from "../_components/artice-metadata";

const publishedAt = new Date("2026-11-13T20:45:00");

const BlogDetailPage = async () => {
  return (
    <div className="prose lg:prose-lg dark:prose-invert">
      <h1> How to Create a blog Tutorial No one asked for</h1>

      <ArticleMetadata
        intent="post"
        data={{
          author: {
            avatar: "https://via.assets.so/img.jpg?w=40&h=40&bg=6b7280&f=png",
            name: "John Doe",
            role: "Staff Writer",
          },
          publishedAt,
          readTimeMins: 2,
        }}
        className="not-prose"
      />

      <Image
        src={"https://via.assets.so/img.jpg?w=600&h=300&bg=6b7280&f=png"}
        alt="Cover image"
        width={600}
        height={300}
        className="w-full rounded-md object-cover object-center"
      />

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
        iste dolorem maxime debitis ipsa dolore et quam dolorum totam quo,
        similique, ratione minima perferendis itaque doloremque quas! Libero
        nulla alias eaque ut dolore aspernatur cumque quod. Consectetur
        consequuntur distinctio provident veritatis vitae sint adipisci ullam
        libero architecto nisi hic dicta officiis nesciunt temporibus nemo
        debitis facere eius, recusandae perferendis. Animi aperiam magnam
        impedit libero! Corrupti debitis ipsam ducimus porro voluptatem dicta
        minima minus, praesentium, tempora cum facere totam laborum hic rem
        explicabo consequuntur, deleniti consectetur sunt distinctio delectus?
        Repudiandae iusto quod praesentium ipsum cupiditate odio sed? Ea dolores
        vitae iste quia praesentium repellendus? Cum possimus dolores architecto
        laboriosam totam, velit, fuga pariatur distinctio illo quisquam
        veritatis sunt doloremque asperiores? Culpa itaque assumenda quibusdam
        magni ipsa sequi totam ullam! Accusantium eaque, tempora eveniet
        similique cupiditate accusamus cumque magnam voluptas, repudiandae neque
        consequatur, omnis esse possimus non facere quo. Deserunt, totam. Dicta.
      </p>
    </div>
  );
};

export default BlogDetailPage;
