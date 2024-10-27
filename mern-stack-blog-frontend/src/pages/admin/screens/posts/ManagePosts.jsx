import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../../constants";
// import { postsData } from "../../../../constants/dataMock";
import { MdDelete, MdEdit } from "react-icons/md";
import { pageUrls } from "../../../../constants/pageUrls";
import useGetDataPosts from "../../../../hooks/useGetDataPosts";
import DataTable from "../../components/DataTable";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const ManagePosts = () => {
  const navigate = useNavigate();
  // const {
  //   userState,
  //   currentPage,
  //   searchKeyword,
  //   data: postsData,
  //   isLoading,
  //   isFetching,
  //   isLoadingDeleteData,
  //   queryClient,
  //   searchKeywordHandler,
  //   submitSearchKeywordHandler,
  //   deleteDataHandler,
  //   setCurrentPage,
  // } = useDataTable({
  //   dataQueryFn: () => getAllPosts(searchKeyword, currentPage),
  //   dataQueryKey: "posts",
  //   deleteDataMessage: "Post is deleted",
  //   mutateDeleteFn: ({ slug, token }) => {
  //     return deletePost({
  //       slug,
  //       token,
  //     });
  //   },
  // });

  const {data: posts, isLoading} = useGetDataPosts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <DataTable
        type="posts"
        pageTitle="Manage Posts"
        dataListName="Posts"
        searchInputPlaceHolder="Post title..."
        // searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        // searchKeywordOnChangeHandler={searchKeywordHandler}
        // searchKeyword={searchKeyword}
        tableHeaderTitleList={["Title", "Category", "Created At", "Actions"]}
        // isLoading={isLoading}
        // isFetching={isFetching}
        data={posts}
        // setCurrentPage={setCurrentPage}
        // currentPage={currentPage}
        // headers={postsData?.headers}
        // userState={userState}
      >
        {posts.map((post, index) => (
          <tr key={index}>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to={`/blog/${post._id}`} className="relative block">
                    <img
                      src={post.images[0] || images.Post1Image}
                      alt={post.title}
                      className="mx-auto aspect-square w-10 rounded-lg object-cover"
                    />
                  </Link>
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap text-gray-900">
                    {post.title}
                  </p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900 font-bold">
                {post.category.name}
              </p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </td>
            <td className="space-x-5 border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <button className=" disabled:cursor-not-allowed disabled:opacity-70">
                <MdEdit
                  color="blue"
                  onClick={() => navigate(pageUrls.ADD_NEW_BLOG)}
                  fontSize={25}
                />
              </button>
              <button
                type="button"
                className=" disabled:cursor-not-allowed disabled:opacity-70"
              >
                <MdDelete color="red" fontSize={25} />
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
    </>
  );
};

export default ManagePosts;
