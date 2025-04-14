import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { permissions } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      const currentPath = location.pathname.substring(1);
      const allowedPaths = permissions.map((perm) => perm.toLowerCase());
      const pathSegments = currentPath.split("/");
      const isAllowed = pathSegments.some((segment) =>
        allowedPaths.includes(segment)
      );
      // if (!isAllowed) {
      //   navigate("/");
      // }
    } else {
      console.warn("Token or pathname not valid", token, location.pathname);
      navigate("/login");
    }
  }, [navigate, token, permissions, location.pathname]);

  return (
    <>
      <div className="container mx-auto">
        <div className="h-full w-full">
          <SideMenu />

          {/* Main content */}
          <main className="flex-1 p-0">
            <div className="content">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
