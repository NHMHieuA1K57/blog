import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportedComments = async () => {
      try {
        const response = await axios.get('http://localhost:9999/api/comments/reports');
        const sortedReports = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReports(sortedReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportedComments();
  }, []);

  // Xóa report mà không xóa comment
  const handleDeleteReport = async (commentId) => {
    try {
      await axios.delete(`http://localhost:9999/api/comments/reports/${commentId}`);
      setReports((prevReports) => prevReports.filter((report) => report._id !== commentId));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <DataTable
      pageTitle="Manage Reports"
      dataListName="Reports"
      searchInputPlaceHolder="Search Report..."
      tableHeaderTitleList={[
        "User",
        "Content",
        "Related Post",
        "Created At",
        "Action",
      ]}
      isLoading={loading}
    >
      {reports.map((report, index) => (
        <tr key={index}>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="text-gray-900">{report.account?.name || "Unknown User"}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="text-gray-900">{report.content}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <Link to={`/detail/${report.post._id}`} className="text-blue-500">
              {report.post?.title || "Unknown Post"}
            </Link>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            {new Date(report.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "numeric",
              minute: "numeric",
            })}
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <button
              type="button"
              className="disabled:cursor-not-allowed disabled:opacity-70"
              onClick={() => handleDeleteReport(report._id)}
            >
              <MdDelete color="red" fontSize={25} />
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Reports;
