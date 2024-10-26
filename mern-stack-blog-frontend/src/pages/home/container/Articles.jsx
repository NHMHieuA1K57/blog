import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCardT from "../../../components/ArticleCardT";

const Articles = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:9999/post/all-post");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // const featuredPosts = posts.filter(post => post.featured);
  const newestPosts = posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
