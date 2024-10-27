import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "../../components/ArticleCard";
import MainLayout from "../../components/MainLayout";
import Search from "../../components/Search";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    axios.get("http://localhost:9999/blog/all-post")
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu bài viết:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <section className="container mx-auto flex flex-col px-5 py-10">
        <Search className="mb-10 w-full max-w-xl" />
        
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
            {posts.map((post) => (
              <ArticleCard
                key={post._id}
                post={{
                  id: post._id,
                  title: post.title,
                  description: post.content,
                  image: post.images[0],
                  author: post.author.name,
                  authorImage: "https://cdn0.iconfinder.com/data/icons/occupation-001/64/author-writing-occupation-avatar-512.png", 
                  date: new Date(post.createdAt).toLocaleDateString(),
                }}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))}
          </div>
        )}

        {!userState.userInfo && (
          <Link
            to="/login"
            className="mx-auto flex items-center gap-x-2 rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary"
          >
            <span>Sign In to view more</span>
            <FaArrowRight className="h-3 w-3" />
          </Link>
        )}
      </section>
    </MainLayout>
  );
};

export default BlogPage;
