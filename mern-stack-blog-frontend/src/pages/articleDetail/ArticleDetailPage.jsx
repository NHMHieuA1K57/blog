import { Link, useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import SocialShareButtons from "../../components/SocialShareButtons";
import CommentContainer from "../../components/comments/CommentContainer";
import { images } from "../../constants";
import { breadCrumbsData } from "../../constants/dataMock";
import useGetDataPostDetail from "../../hooks/useGetDataPostDetail";
import SuggestedPosts from "./container/SuggestedPosts";
import LoadingSpinner from "../../components/LoadingSpinner";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { data: postDetail, isLoading } = useGetDataPostDetail(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <MainLayout>
      <section className="container mx-auto flex max-w-5xl flex-col px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className="w-full rounded-xl"
            src={postDetail?.images[0] || images.Post1Image}
            alt="image"
          />
          <div className="mt-4 flex gap-2">
            <Link
              to={`/blog?category=categoryName`}
              className="inline-block font-roboto text-sm text-primary md:text-base"
            >
              {postDetail?.category}
            </Link>
          </div>
          <h1 className="mt-4 font-roboto text-xl font-medium text-dark-hard md:text-[26px]">
            {postDetail?.title}
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7">{postDetail?.content}</p>
          </div>
          <CommentContainer className={"mt-10"} logginedUserId="a" />
        </article>
        <div className="flex flex-col gap-5">
          <SuggestedPosts
            header="Latest Article"
            className="mt-8 lg:mt-0 lg:max-w-xs"
            category={postDetail?.category}
          />
          <SocialShareButtons className="mt-8 lg:mt-0" />
        </div>
      </section>
    </MainLayout>
  );
};

export default ArticleDetailPage;
