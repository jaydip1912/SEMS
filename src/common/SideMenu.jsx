import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { permissions } = useSelector((state) => state.auth);

  const hasPermission = (route) => permissions.includes(route);
  const hasMasterPermission = ["roles", "products", "coverletter"].some(
    (item) => hasPermission(item)
  );

  const [masterOpen, setMasterOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const masterRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("authToken");
    localStorage.removeItem("roleId");
    navigate("/login");
  };

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleMaster = () => setMasterOpen(!masterOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (masterRef.current && !masterRef.current.contains(event.target)) {
        setMasterOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main>
      <nav className="p-4 bg-gray-800 ">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:text-sm  text-lg   justify-between  items-center ">
          <div className="text-white sm:text-3xl text-2xl font-bold ">
            Sales Enquiry
          </div>
          <ul className={`md:flex gap-5  flex-col md:flex-row`}>
            {/* <li>
              <Link to="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
            </li> */}
            {hasPermission("enquiry") && (
              <li>
                <Link to="/enquiry" className="text-white hover:text-gray-300">
                  Enquiry
                </Link>
              </li>
            )}
            {hasPermission("customers") && (
              <li>
                <Link
                  to="/customers"
                  className="text-white hover:text-gray-300"
                >
                  Customer
                </Link>
              </li>
            )}
            {hasPermission("salesPerson") && (
              <li>
                <Link
                  to="/salesperson"
                  className="text-white hover:text-gray-300"
                >
                  Sales Person
                </Link>
              </li>
            )}
            {hasPermission("userList") && (
              <li>
                <Link to="/userlist" className="text-white hover:text-gray-300">
                  Admin User
                </Link>
              </li>
            )}

            {hasMasterPermission && (
              <li ref={masterRef}>
                <button
                  className="relative text-white hover:text-gray-300"
                  onClick={toggleMaster}
                >
                  {/* <Link
                    to="/salesperson"
                    className="text-white hover:text-gray-300"
                  >  */}
                  Master
                  {/* </Link> */}
                </button>
                {masterOpen && (
                  <div
                    ref={masterRef}
                    className="absolute top-16 right-1/4 mt-2 w-40 bg-white sm:mt-0 dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <ul className="py-2">
                      <li>
                        <Link
                          to={"/products"}
                          className="text-start px-4 w-full py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Product
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/coverletter"}
                          className="text-start px-4 w-full py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Cover letter
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>

          <div className="relative    sm:inline" ref={profileRef}>
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={toggleProfile}
            >
              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white ">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={"https://picsum.photos/200/300"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {profileOpen && (
                    <div className="absolute m-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                      <ul className="py-2">
                        <li>
                          <Link
                            to={"/profile"}
                            className="text-start px-4  w-full py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                            onClick={() => setProfileOpen(false)}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/changepassword"}
                            className="text-start px-4 w-full py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                            onClick={() => setProfileOpen(false)}
                          >
                            Change Password
                          </Link>
                        </li>
                        <li>
                          <span
                            onClick={handleLogout}
                            className="text-start px-4 py-2 w-full text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            Logout
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
};

export default SideMenu;
