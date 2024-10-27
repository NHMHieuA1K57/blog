import React from "react";
import ArticleCardT from "../../../components/ArticleCardT";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useGetDataPosts from "../../../hooks/useGetDataPosts";

const Articles = () => {
  const { data: posts, isLoading } = useGetDataPosts();

  // const featuredPosts = posts.filter(post => post.featured);
  const newestPosts = posts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if(isLoading) return <LoadingSpinner />;
  return (
    <section className="container mx-auto flex flex-col px-5 py-10">
      {/* <div className="font-weight-bold mb-8 font-roboto text-2xl text-dark-hard">
        Featured blog posts
      </div>
      <div className="flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
        {featuredPosts.map((post) => (
          <ArticleCardT key={post.id} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" post={post} />
        ))}
      </div> */}
      <div className="font-weight-bold mb-8 font-roboto text-2xl text-dark-hard">
        Newest blog posts
      </div>
      <div className="flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
        {newestPosts.map((post) => (
          <ArticleCardT
            key={post._id}
            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            post={post}
          />
        ))}
      </div>
    </section>
  );
};

export default Articles;
