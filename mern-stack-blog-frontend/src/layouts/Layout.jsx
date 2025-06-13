import { Outlet } from "react-router-dom";
import MainLayout from "../components/MainLayout";
function Layout(props) {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default Layout;
