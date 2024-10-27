import { useState } from "react";
import axios from "axios";

const useCreateCategory = (refetch) => {
  const [error, setError] = useState(null);

  const createCategory = async (categoryTitle, setAlert) => {
    try {
      const newCategory = { name: categoryTitle };
      await axios.post("http://localhost:9999/cate/addCate", newCategory);

      setAlert({
        type: "success",
        message: `Create category "${categoryTitle}" successfully!`,
      });
      refetch();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to create category.",
      });
    }
  };

  return { createCategory, error };
};

export default useCreateCategory;
