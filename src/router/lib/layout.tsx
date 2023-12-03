import { Outlet } from "react-router-dom";

import { AppHeader } from "../../components/appHeader/appHeader";

const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};

export default Layout;
