import { Outlet } from "react-router-dom";

function Layout(props) {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default Layout;
