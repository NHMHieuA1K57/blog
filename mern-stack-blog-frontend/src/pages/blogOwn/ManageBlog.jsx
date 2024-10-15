import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { Table } from "../../components/Table";
const ManageBlog = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <IoIosAddCircle
        color="red"
        className="ml-3 cursor-pointer text-5xl"
        onClick={() => navigate("/addNewBlog")}
      />
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
        <Table />
      </div>
    </MainLayout>
  );
};

export default ManageBlog;
