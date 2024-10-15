import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../../../constants/dataMock";
import DataTable from "../../components/DataTable";

const Categories = () => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryList, setCategoryList] = useState(categories);

  const handleCreateCategory = () => {
    const newCategory = {
      label: categoryTitle,
      value: categoryTitle.toLowerCase(),
      title: categoryTitle,
      createdAt: new Date().toISOString(),
    };
    setCategoryList([...categoryList, newCategory]);
    setCategoryTitle("");
  };

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-4 py-8">
        <h4 className="text-lg leading-tight">Add New Category</h4>
        <div className="d-form-control w-full mt-6">
          <input
            value={categoryTitle}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
            onChange={(e) => setCategoryTitle(e.target.value)}
            placeholder="Category title"
          />
          <button
            type="button"
            onClick={handleCreateCategory}
            className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2"
          >
            Add Category
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
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {category.title}
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-no-wrap">
                  {category.createAt}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
                <Link
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default Categories;
