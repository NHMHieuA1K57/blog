import React from "react";
import { images } from "../constants";
import { BsCheckLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const ArticleCard = ({ post, className }) => {
  return (
    <div
      className={`overflow-hidden rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <Link to={`/blog/123`}>
        <img
          src={images.Post1Image}
          alt="title"
          className="h-auto w-full object-cover object-center md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <dir className="p-5">
        <h2 className="font-roboto text-xl font-bold text-dark-soft md:text-2xl lg:text-[28px]">
          Future of Work
        </h2>
        <p className="mt-3 text-sm text-dark-light md:text-lg">
          Majority of peole will work in jobs that don’t exist today.
        </p>
        <div className="mt-6 flex flex-nowrap items-center justify-between">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={images.userImage}
              alt="post profile"
              className="h-9 w-9 rounded-full md:h-10 md:w-10"
            />
            <div className="flex flex-col">
              <h4 className="text-sm font-bold italic text-dark-soft md:text-base">
                Duy Tran
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`w-fit rounded-full bg-[#36B37E] bg-opacity-20 p-1.5`}
                >
                  <BsCheckLg className="h-1.5 w-1.5 text-[#36B37E]" />
                </span>
                <span className="text-xs italic text-dark-light md:text-sm">
                  Verified writer
                </span>
              </div>
            </div>
          </div>
          <span className="text-sm font-bold italic text-dark-light md:text-base">
            02 August
          </span>
        </div>
      </dir>
    </div>
  );
};

export default ArticleCard;
