import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { pageUrls } from "../../constants/pageUrls";

const AccessDenied = () => {
  return (
    <div className="header container mt-5 p-5 text-center">
      <h1 className=" head-h1 text-center">
        <code style={{ color: "red", fontSize: "100px" }}>Access Denied</code>
      </h1>
      <hr style={{ margin: "auto", width: "20%" }} />
      <h3 className=" text-center">
        You don't have permission to view this site.
      </h3>
      <h3 className=" text-center">🚫🚫🚫🚫</h3>
      <h6
        style={{ color: "red", fontSize: "20px", textDecoration: "underline" }}
        className=" body-h6 text-center"
      >
        Error code:403 forbidden
      </h6>
      <div style={{ marginTop: 30, fontSize: 25, fontWeight: 1000 }}>
        <Link to={pageUrls.HOME} style={{ textDecoration: "none" }}>
          <FaSignOutAlt
            style={{ color: "blue", fontSize: "30px", marginRight: "5px" }}
          />
          Back to HomPage
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;