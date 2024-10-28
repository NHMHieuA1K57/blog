import React from "react";
import { Link } from "react-router-dom";
import useGetDataPosts from "../../../hooks/useGetDataPosts";

function SuggestedPosts(props) {
  const { className, header, category } = props;
  const { data: posts } = useGetDataPosts();

  const suggestedPosts = posts.filter(
    (post) =>
      post.category.name === category.category && post._id !== category.id
  );
  console.log(category, "category");

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
                <Link to={`/detail/${item._id}`} className="hover:text-primary">
                  {item.title}
                </Link>
              </h3>
              <span className="text-xs opacity-60">
                {new Date(item.createdAt).toDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedPosts;
