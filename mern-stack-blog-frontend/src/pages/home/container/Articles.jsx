import React from "react";
import { FaArrowRight } from "react-icons/fa";

import { Link } from "react-router-dom";
import ArticleCard from "../../../components/ArticleCard";

const Articles = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-10">
      <div className="font-weight-bold mb-8 font-roboto text-2xl text-dark-hard">
        Featured blog posts
      </div>
      <div className=" flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
      </div>
      <div className=" font-weight-bold mb-8 font-roboto text-2xl text-dark-hard">
        Newest blog posts
      </div>
      <div className=" flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
      </div>
    </section>
  );
};

export default Articles;
