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

const CoverLetterList = () => {
  const currentPage = 1;
  const usersPerPage = 10;

  const [loader, setLoader] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectedSalesUserId, setSelectedUserId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { users } = useSelector((state) => state?.user);

  useEffect(() => {
    const getUsers = async () => {
      dispatch(fetchUserRequest());
      setLoader(true);
      try {
        const response = await addRec("/cover-letter", {
          page: currentPage,
          limit: usersPerPage,
        });
        if (response?.type === "success") {
          dispatch(fetchUserSuccess(response.data));
        } else {
          alert(response.message || "failed to fetching cover letter");
          dispatch(fetchUserFailure("failed to fetching cover letter"));
        }
      } catch (error) {
        alert(error.message || "Error fetching cover letter");
        dispatch(fetchUserFailure("Error fetching cover letter"));
      } finally {
        setLoader(false);
      }
    };
    getUsers();
  }, [dispatch, currentPage, usersPerPage]);

  const handleEdit = async (userId) => {
    try {
      const response = await addRec("/edit-cover-letter", {
        letter_id: userId,
      });
      if (response?.type === "success") {
        navigate(`/coverLetter/updateCoverLetter/${userId}`, {
          state: { userData: response.data },
        });
      } else {
        alert(response.message || "Failed to fetch cover letter details");
      }
    } catch (error) {
      alert(error.message || "Error fetching cover letter");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await addRec("/delete-cover-letter", {
        letter_id: selectedSalesUserId,
      });
      if (response?.type === "success") {
        alert("Cover letter deleted successfully");
        const updatedUsers = await addRec("/cover-letter");
        if (updatedUsers?.type === "success") {
          dispatch(fetchUserSuccess(updatedUsers.data));
        }
      } else {
        alert(response.message || "Failed to delete cover letter");
      }
    } catch (error) {
      alert(error.message || "Error deleting cover letter");
    }
    setIsModalOpen(false);
  };

  const openDeleteModal = (userId) => {
    setSelectedSalesUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);
  // const totalPages = Math.ceil(users.length / usersPerPage);

  const coverLetterColumns = [
    {
      name: "Letter",
      selector: (row) => row.letter,
      sortable: true,
      width: "50%",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "10%",
    },
  ];

  return (
    <>
      <div>
        <CustomDataTable
          title={"Cover Letter"}
          buttonLabel={"Create Cover Letter"}
          onCreate={() => navigate("/coverLetter/createCoverLetter")}
          columns={coverLetterColumns}
          data={currentUsers}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
          noDataMessage={
            loader ? <CircularProgress color="primary" /> : "no data found"
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
          closeModel={closeModal}
          confirmAction={handleDelete}
          title="Confirm Delete"
          body="Are you sure.?"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
        />
      </div>
    </>
  );
};

export default CoverLetterList;
