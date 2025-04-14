import React, { useEffect, useState } from "react";
import CustomDataTable from "../../common/CustomDataTable";
import { CircularProgress } from "@mui/material";
import DynamicModal from "../../utils/DynamicModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
} from "../../store/actions/userAction";
import { addRec } from "../../common/common";

const UserList = () => {
  const currentPage = 1;
  const userPerPage = 10;
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      dispatch(fetchUserRequest());
      setLoader(true);
      try {
        const response = await addRec("/admin-users", {
          page: currentPage,
          limit: userPerPage,
        });
        if (response?.type === "success") {
          dispatch(fetchUserSuccess(response.data));
        } else {
          alert(response.message || "Failed to fetch users");
          dispatch(fetchUserFailure("Failed to fetch users"));
        }
      } catch (error) {
        alert(error.message || "Error fetching users");
        dispatch(fetchUserFailure("Error fetching users"));
      } finally {
        setLoader(false);
      }
    };

    getUsers();
  }, [dispatch, currentPage, userPerPage]);

  const handleEdit = async (userId) => {
    try {
      const response = await addRec("edit-admin-user", { user_id: userId });
      if (response?.type === "success") {
        navigate(`/userlist/updateUser/${userId}`, {
          state: { userData: response.data },
        });
      } else {
        alert(response.message || "Failed to fetch user data");
      }
    } catch (error) {
      alert(error.message || "Error fetching user!");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await addRec("/delete-admin-user", {
        user_id: selectedUserId,
      });
      if (response?.type === "success") {
        alert("User deleted successfully!");
        const updatedUsers = await addRec("/admin-users", {
          page: currentPage,
          limit: userPerPage,
        });
        if (updatedUsers?.type === "success") {
          dispatch(fetchUserSuccess(updatedUsers.data));
        }
      } else {
        alert(response.message || "Failed to delete user");
      }
    } catch (error) {
      alert(error.message || "Error deleting user!");
    }
    setIsModalOpen(false);
  };

  const openDeleteModel = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModel = () => {
    setIsModalOpen(false);
  };

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // const totalPages = Math.ceil(users.length / userPerPage);

  const userColumns = [
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone_number,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];
  return (
    <div>
      <CustomDataTable
        title="User List"
        buttonLabel="Create User"
        onCreate={() => navigate("/userlist/createUser")}
        columns={userColumns}
        data={currentUsers}
        onEdit={handleEdit}
        onDelete={openDeleteModel}
        noDataMessage={
          loader ? <CircularProgress color="primary" /> : "NO User found."
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
      </div> */}
      {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
        /> */}

      <DynamicModal
        showModal={isModalOpen}
        closeModel={closeModel}
        confirmAction={handleDelete}
        title="Confirm Delete"
        body="Are you sure you want to delete this user?"
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default UserList;
