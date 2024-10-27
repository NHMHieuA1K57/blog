import { useState } from "react";
import axios from "axios";

const useDeleteCategory = (refetch) => {
  const [error, setError] = useState(null);

  const deleteCategory = async (id, setAlert, categoryTitle) => {
    setError(null);

    try {
      await axios.delete(`http://localhost:9999/cate/delete-cate/${id}`);

      setAlert({
        type: "success",
        message: `Category ${categoryTitle} deleted successfully!`,
      });
      refetch();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to delete category.",
      });
    }
  };

  return { deleteCategory, error };
};

export default useDeleteCategory;
