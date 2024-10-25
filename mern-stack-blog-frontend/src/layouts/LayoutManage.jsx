import { Outlet } from "react-router-dom";
import WithAuthorize from "../hocs/withAuthorize";
import { Role } from "../constants/pageUrls";
import Header from "../pages/admin/components/header/Header";

function LayoutManage(props) {
  return (
    <WithAuthorize roles={Role.ADMIN}>
      <div className="flex h-screen flex-col lg:flex-row">
        <Header />
        <main className="flex-1 bg-[#F9F9F9] p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </WithAuthorize>
  );
}

export default LayoutManage;
