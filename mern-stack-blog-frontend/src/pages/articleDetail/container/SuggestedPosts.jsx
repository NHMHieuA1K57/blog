import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SuggestedPosts(props) {
  const { className, header, category } = props;
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

  const suggestedPosts = posts.filter((post) => post.category === category);

  if (suggestedPosts.length === 0)
    return (
      <div>
        <h2 className="font-roboto font-medium text-dark-hard md:text-xl">
          {header}
        </h2>
        <p className="font-roboto text-sm font-medium text-dark-hard">
          No suggested posts
        </p>
      </div>
    );

  return (
    <div
      className={`w-full rounded-lg p-4 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <h2 className="font-roboto font-medium text-dark-hard md:text-xl">
        {header}
      </h2>
      <div className="mt-5 grid gap-y-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
        {suggestedPosts.map((item) => (
          <div
            key={item._id}
            className="flex flex-nowrap items-center space-x-3"
          >
            <img
              className="aspect-square w-1/5 rounded-lg object-cover"
              src={item.images}
              alt={item.title}
            />
            <div className="font-roboto text-sm font-medium text-dark-hard">
              <h3 className="font-roboto text-sm font-medium text-dark-hard md:text-base lg:text-lg">
                <Link>{item.title}</Link>
              </h3>
              <span className="text-xs opacity-60">
                {new Date(item.createAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedPosts;
