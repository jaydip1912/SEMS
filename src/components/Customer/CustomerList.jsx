import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomDataTable from "../../common/CustomDataTable";
import { CircularProgress } from "@mui/material";
import DynamicModal from "../../utils/DynamicModal";
import { addRec } from "../../common/common";

import {
  fetchUserSuccess,
  fetchUserRequest,
  fetchUserFailure,
} from "../../store/actions/userAction";
const CustomerList = () => {
  const currentPage = 1;
  const userPerPage = 10;

  const [loader, setLoader] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedSalesUserId, setSelectedSalesUserId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const customerUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUserRequest());
      setLoader(true);
      try {
        const response = await addRec("/customers", {
          page: currentPage,
          limit: userPerPage,
        });
        if (response?.type === "success") {
          dispatch(fetchUserSuccess(response?.data));
        } else {
          dispatch(fetchUserFailure("Error fetching users. Please try again."));
          alert("Error fetching users. Please try again.", response?.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        dispatch(fetchUserFailure(error?.message));
        alert("Error fetching users. Please try again.", error);
      } finally {
        setLoader(false);
      }
    };

    fetchUsers();
  }, [dispatch, currentPage, userPerPage]);

  const handleEdit = async (userId) => {
    try {
      const response = await addRec("/edit-customer", { customer_id: userId });
      if (response?.type === "success") {
        navigate(`/customers/updateCustomer/${userId}`, {
          state: { userData: response?.data },
        });
      } else {
        alert(
          "Error fetching user data. Please try again." || response?.message
        );
      }
    } catch (error) {
      console.error("Error editing user:", error);
      alert("Error editing user. Please try again.", error);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await addRec("/delete-customer", {
        customer_id: selectedSalesUserId,
      });
      if (response?.type === "success") {
        setLoader(true);
        const updatedUsers = await addRec("/customers");
        if (updatedUsers?.type === "success") {
          dispatch(fetchUserSuccess(updatedUsers?.data));
        }
        alert("User deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.", error);
    }
    setIsModelOpen(false);
  };

  const openDeleteModal = (userId) => {
    setSelectedSalesUserId(userId);
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
  };

  const customerColumns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  return (
    <>
      <div>
        <CustomDataTable
          title="Customer List"
          data={customerUsers}
          buttonLabel={"Create Customer"}
          onCreate={() => navigate("/customers/createCustomer")}
          columns={customerColumns}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
          noDataMessage={
            loader ? <CircularProgress color="inherit" /> : "No data available."
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
          showModal={isModelOpen}
          closeModel={closeModel}
          confirmAction={handleDelete}
          title="Delete Customer"
          body="Are you sure you want to delete this customer?"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
        />
      </div>
    </>
  );
};

export default CustomerList;
