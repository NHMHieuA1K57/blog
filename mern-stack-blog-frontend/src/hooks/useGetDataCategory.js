import axios from "axios";
import { useEffect, useState } from "react";

const useGetDataCategory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:9999/cate/all-cate");
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading, refetch: getData };
};

export default useGetDataCategory;
