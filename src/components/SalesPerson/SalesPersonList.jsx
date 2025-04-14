import React, { useEffect, useState } from "react";
import CustomDataTable from "../../common/CustomDataTable";
import DynamicModal from "../../utils/DynamicModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
} from "../../store/actions/userAction";
import { addRec } from "../../common/common";
import { CircularProgress } from "@mui/material";

const SalesPersonList = () => {
  const currentPage = 1;
  const usersPerPage = 10;
  const [loader, setLoader] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  // const [currentUsers, setCurrentUsers] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    const getUsers = async () => {
      dispatch(fetchUserRequest());
      setLoader(true);
      try {
        const response = await addRec("/sales-users", {
          page: currentPage,
          limit: usersPerPage,
        });
        if (response?.status === 200) {
          dispatch(fetchUserSuccess(response.data));
        }
      } catch (error) {
        alert("Error fetching users:" || error.message);
        console.error("Error fetching users:", error);
        dispatch(fetchUserFailure("Failed to fetch users"));
      } finally {
        setLoader(false);
      }
    };
    getUsers();
  }, [dispatch, currentPage, usersPerPage]);

  const handleEdit = async (userId) => {
    try {
      const response = await addRec("/edit-sales-user", {
        user_id: userId,
      });
      if (response?.type === "success") {
        navigate(`/salesperson/updateSalesPerson/${userId}`, {
          state: { userData: response.data },
        });
      } else {
        alert("Error editing user:" || response.message);
        console.error("Error editing user:", response.message);
      }
    } catch (error) {
      console.error("Error editing user:", error);
      alert("Error editing user:" || error.message);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await addRec("/delete-sales-user", {
        page: currentPage,
        limit: usersPerPage,
      });
      if (response?.status === "success") {
        alert("User deleted successfully");
        const updatedUsers = await addRec("/sales-users");
        if (updatedUsers?.status === "success") {
          dispatch(fetchUserSuccess(updatedUsers.data));
        } else {
          alert("Error fetching updated users:" || updatedUsers.message);
          console.error("Error fetching updated users:", updatedUsers.message);
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user:" || error.message);
    }
    setIsModelOpen(false);
  };

  const openDeleteModel = (userId) => {
    setSelectedUserId(userId);
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);
  const salespersonColumns = [
    { name: "First Name", selector: (row) => row.first_name, sortable: true },
    { name: "Last Name", selector: (row) => row.last_name, sortable: true },
    {
      name: "Phone number",
      selector: (row) => row.phone_number,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  return (
    <>
      <div>
        <CustomDataTable
          title={"Sales Person List"}
          buttonLabel={"Create Sales Person"}
          onCreate={() => navigate("/salesperson/createSalesPerson")}
          columns={salespersonColumns}
          data={currentUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          noDataMessage={
            loader ? <CircularProgress color="primary" /> : "No data available."
          }
        />
        {/* <div className="d-flex m-3 justify-content-end pe-5">
      <label htmlFor="usersPerPage" className="me-2">Rows per page:</label>
      <select
        id="usersPerPage"
        value={usersPerPage}
        onChange={(e) => {
          setUsersPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>  */}
        <DynamicModal
          showModal={isModelOpen}
          closeModel={closeModel}
          confirmAction={handleDelete}
          title="Confirm Action"
          body="Are you sure you want to delete this user?"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
        />
      </div>
    </>
  );
};

export default SalesPersonList;
