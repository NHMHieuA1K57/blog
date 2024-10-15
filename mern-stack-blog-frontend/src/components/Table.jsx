import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { MdModeEdit } from "react-icons/md";
import { images } from "../constants";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const TABLE_HEAD = ["id", "Image", "Name", "Title", "Create At", ""];

const TABLE_ROWS = [
  {
    id: 1,
    image: images.Post1Image,
    name: "Duy Tran",
    title: "Future of Work",
    createAt: "02/08/2021",
  },
  {
    id: 2,
    image: images.Post1Image,
    name: "Duy Tran",
    title: "Future of Work",
    createAt: "02/08/2021",
  },
  {
    id: 3,
    image: images.Post1Image,
    name: "Duy Tran",
    title: "Future of Work",
    createAt: "02/08/2021",
  },
];

export const Table = () => {
  const navigate = useNavigate();
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-blue-gray-100 bg-blue-gray-50 border-b p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ id, image, name, title, createAt }, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {id}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  <img
                    src={image}
                    alt="title"
                    className="h-10 w-10 rounded-full object-cover object-center"
                  />
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {title}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {createAt}
                </Typography>
              </td>
              <td className="p-4">
                <Tooltip content="Edit">
                  <IconButton variant="text">
                    <MdModeEdit className="h-4 w-4" color="blue" onClick={() => navigate('/addNewBlog')}/>
                  </IconButton>
                </Tooltip>
                <Tooltip content="Delete">
                  <IconButton variant="text">
                    <MdDelete className="h-4 w-4" color="red"/>
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
