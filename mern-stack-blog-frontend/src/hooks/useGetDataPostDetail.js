import axios from "axios";
import { useEffect, useState } from "react";

const useGetDataPostDetail = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:9999/blog/detail/${id}`);
      setData(response.data.post);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return { data, isLoading, refetch: getData };
};

export default useGetDataPostDetail;
