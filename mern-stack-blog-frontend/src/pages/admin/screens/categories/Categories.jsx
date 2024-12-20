import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Alert from "../../../../components/Alert";
import useCreateCategory from "../../../../hooks/useCreateCategory";
import useDeleteCategory from "../../../../hooks/useDeleteCategory";
import useGetDataCategory from "../../../../hooks/useGetDataCategory";
import DataTable from "../../components/DataTable";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const Categories = () => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const { data: categoryList, isLoading, refetch } = useGetDataCategory();
  const { deleteCategory } = useDeleteCategory(refetch);
  const [alert, setAlert] = useState(null);
  const { createCategory } = useCreateCategory(refetch);

  const handleCreateCategory = () => {
    createCategory(categoryTitle, setAlert);
    setCategoryTitle("");
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(
      id,
      setAlert,
      categoryList.find((cate) => cate._id === id).name
    );
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
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-4 py-8">
          <h4 className="text-lg leading-tight">Add New Category</h4>
          <div className="d-form-control mt-6 w-full">
            <input
              value={categoryTitle}
              className="d-input-bordered d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300"
              onChange={(e) => setCategoryTitle(e.target.value)}
              placeholder="Category title"
            />
            <button
              type="button"
              onClick={handleCreateCategory}
              className="mt-3 w-fit rounded-lg bg-green-500 px-4 py-2 font-semibold text-white"
            >
              {isLoading ? "Loading..." : "Add Category"}
            </button>
          </div>
        </div>
        <div className="col-span-8">
          <DataTable
            pageTitle="Categories"
            dataListName="Categories"
            searchInputPlaceHolder="Category title..."
            tableHeaderTitleList={["Title", "Created At", "Actions"]}
            data={categoryList}
          >
            {categoryList.map((category, index) => (
              <tr key={index}>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <div className="flex items-center">
                    <p className="whitespace-no-wrap text-gray-900">
                      {category.name}
                    </p>
                  </div>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap text-gray-900">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className="space-x-5 border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <button
                    type="button"
                    className=" disabled:cursor-not-allowed disabled:opacity-70"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    <MdDelete color="red" fontSize={25} />
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Categories;
