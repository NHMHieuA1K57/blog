import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../../constants";
// import { postsData } from "../../../../constants/dataMock";
import { MdDelete, MdEdit } from "react-icons/md";
import { pageUrls } from "../../../../constants/pageUrls";
import useGetDataPosts from "../../../../hooks/useGetDataPosts";
import DataTable from "../../components/DataTable";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import axios from "axios";
import { useState } from "react";
import BlogPostForm from "./addNewBlog";
import Alert from "../../../../components/Alert";

const ManagePosts = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const token = localStorage.getItem("token");
  const { data: posts, isLoading, refetch } = useGetDataPosts();

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:9999/blog/delete-post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetch();
      setAlert({
        type: "success",
        message: `Delete post successfully!`,
      });
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to delete post.",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
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
                  <Link to={`/detail/${post._id}`} className="relative block">
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
              <p className="whitespace-no-wrap font-bold text-gray-900">
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
                <Link to={`/admin/editBlog/${post._id}`}>
                  <MdEdit color="blue" fontSize={25} />
                </Link>
              </button>
              <button
                type="button"
                onClick={() => handleDeletePost(post._id)}
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
