import React from "react";
import ArticleCardT from "../../../components/ArticleCardT";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useGetDataPosts from "../../../hooks/useGetDataPosts";

const Articles = () => {
  const { data: posts = [], isLoading } = useGetDataPosts();

  const newestPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  if (isLoading) return <LoadingSpinner />;

  const truncateText = (text) => {
    return text.split(" ").slice(0, 100).join(" ") + "...";
  };

  return (
    <section className="container mx-auto flex flex-col px-5 py-10">
      <div className="font-weight-bold mb-8 font-roboto text-2xl text-dark-hard">
        Newest Blog Posts
      </div>
      <div className="flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
        {newestPosts.map((post) => (
          <ArticleCardT
            key={post._id}
            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            post={{
              ...post,
              content: truncateText(post.content),
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Articles;
