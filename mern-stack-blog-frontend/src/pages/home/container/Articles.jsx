import React from "react";
import { FaArrowRight } from "react-icons/fa";

import { Link } from "react-router-dom";
import ArticleCard from "../../../components/ArticleCard";

const Articles = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-10">
      <div className=" flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
      </div>
      <Link
        to="/"
        className="mx-auto flex items-center gap-x-2 rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary"
      >
        <span>More articles</span>
        <FaArrowRight className="h-3 w-3" />
      </Link>
    </section>
  );
};

export default Articles;
