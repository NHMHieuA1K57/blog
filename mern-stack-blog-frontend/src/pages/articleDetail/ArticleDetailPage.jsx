import { Link } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import { images } from "../../constants";
import SuggestedPosts from "./container/SuggestedPosts";
import SocialShareButtons from "../../components/SocialShareButtons";
import CommentContainer from "../../components/comments/CommentContainer";
import { breadCrumbsData, tags } from "../../constants/dataMock";

const posts = [
  {
    _id: 1,
    title: "Help children get better education",
    images: images.Post1Image,
    createAt: "2021-09-01",
  },
  {
    _id: 2,
    title: "Help children get better education",
    images: images.Post1Image,
    createAt: "2021-09-01",
  },
  {
    _id: 3,
    title: "Help children get better education",
    images: images.Post1Image,
    createAt: "2021-09-01",
  },
  {
    _id: 4,
    title: "Help children get better education",
    images: images.Post1Image,
    createAt: "2021-09-01",
  },
];

const ArticleDetailPage = () => {
  return (
    <MainLayout>
      <section className="container mx-auto flex max-w-5xl flex-col px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className="w-full rounded-xl"
            src={images.Post1Image}
            alt="image"
          />
          <div className="mt-4 flex gap-2">
            <Link
              to={`/blog?category=categoryName`}
              className="inline-block font-roboto text-sm text-primary md:text-base"
            >
              Education
            </Link>
          </div>
          <h1 className="mt-4 font-roboto text-xl font-medium text-dark-hard md:text-[26px]">
            Help children get better education
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
              congue mauris rhoncus aenean vel elit scelerisque. In egestas erat
              imperdiet sed euismod nisi porta lorem mollis. Morbi tristique
              senectus et netus. Mattis pellentesque id nibh tortor id aliquet
              lectus proin.
            </p>
          </div>
          <CommentContainer className={"mt-10"} logginedUserId="a" />
        </article>
        <div className="flex flex-col gap-5">
          <SuggestedPosts
            header="Latest Article"
            className="mt-8 lg:mt-0 lg:max-w-xs"
            posts={posts}
            tags={tags}
          />
          <SocialShareButtons className="mt-8 lg:mt-0" />
        </div>
      </section>
    </MainLayout>
  );
};

export default ArticleDetailPage;
