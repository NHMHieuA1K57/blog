import React from "react";
import ArticleCard from "../../components/ArticleCard";
import MainLayout from "../../components/MainLayout";
import Search from "../../components/Search";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

let isFirstRun = true;

const BlogPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();

  // const searchParamsValue = Object.fromEntries([...searchParams]);

  // const currentPage = parseInt(searchParamsValue?.page) || 1;
  // const searchKeyword = searchParamsValue?.search || "";

  // const { data, isLoading, isError, isFetching, refetch } = useQuery({
  //   queryFn: () => getAllPosts(searchKeyword, currentPage, 12),
  //   queryKey: ["posts"],
  //   onError: (error) => {
  //     toast.error(error.message);
  //     console.log(error);
  //   },
  // });

  // console.log(data);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   if (isFirstRun) {
  //     isFirstRun = false;
  //     return;
  //   }
  //   refetch();
  // }, [currentPage, searchKeyword, refetch]);

  // const handlePageChange = (page) => {
  //   // change the page's query string in the URL
  //   setSearchParams({ page, search: searchKeyword });
  // };

  // const handleSearch = ({ searchKeyword }) => {
  //   setSearchParams({ page: 1, search: searchKeyword });
  // };

  return (
    <MainLayout>
      <section className="container mx-auto flex flex-col px-5 py-10">
        <Search
          className="mb-10 w-full max-w-xl"
          // onSearchKeyword={handleSearch}
        />
        <div className=" flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
          {/* {isLoading || isFetching ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : data?.data.length === 0 ? (
            <p className="text-orange-500">No Posts Found!</p>
          ) : (
            data?.data.map((post) => ( */}
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
        </div>
        {/* {!isLoading && (
          <Pagination
            onPageChange={(page) => handlePageChange(page)}
            currentPage={currentPage}
            totalPageCount={JSON.parse(data?.headers?.["x-totalpagecount"])}
          />
        )} */}
        <Link
          to="/"
          className="mx-auto flex items-center gap-x-2 rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary"
        >
          <span>More articles</span>
          <FaArrowRight className="h-3 w-3" />
        </Link>
      </section>
    </MainLayout>
  );
};

export default BlogPage;
