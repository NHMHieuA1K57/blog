import axios from "axios";
import { useState } from "react";

const useDeleteCategory = () => {
  const [error, setError] = useState(null);

  const deleteCategory = async (id) => {
    setError(null);
    try {
      await axios.delete(`http://localhost:9999/cate/delete-cate/${id}`);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return { deleteCategory, error };
};

export default useDeleteCategory;
