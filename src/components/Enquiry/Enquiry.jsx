import React, { useEffect, useState } from "react";
import EnquiryTable from "./EnquiryTable";
import { data, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DynamicModal from "../../utils/DynamicModal";
import { FileDownload, formattedDate } from "../../common/commonFunction";
import {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
} from "../../store/actions/userAction";
import { deleteRec, fetchListing } from "../../common/common";
import { CircularProgress } from "@mui/material";

const Enquiry = () => {
  const currentPage = 1;
  const userPerPage = 10;

  const [selectInquiryId, setSelectInquiryId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [downloadArr, setDownloadArr] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    const getUsers = async () => {
      dispatch(fetchUserRequest());
      setLoader(true);
      try {
        const response = await fetchListing("/inquiry/list", {
          page: currentPage,
          limit: userPerPage,
        });
        if (response?.type === "success") {
          dispatch(fetchUserSuccess(response.data));
        } else {
          dispatch(fetchUserFailure("Failed to fetch customers"));
        }
      } catch (error) {
        alert(error.message || "Error fetching customers");
        dispatch(fetchUserFailure("Error fetching customers"));
      } finally {
        setLoader(false);
      }
    };

    getUsers();
  }, [dispatch, currentPage, userPerPage]);

  const handleEdit = async (inquiry_id, Print, View) => {
    console.log("handleEdit--> inquiry_id:", inquiry_id);
    try {
      const response = await fetchListing(
        `/inquiry/list?inquiry_id=${inquiry_id}`
      );
      if (response?.type === "success") {
        if (View) {
          navigate(`/enquiry/updateEnquiry/${inquiry_id}`, {
            state: { inquiryDate: response.data[0], IsView: true },
          });
        } else {
          navigate(`/enquiry/updateEnquiry/${inquiry_id}`, {
            state: { inquiryDate: response.data[0], IsView: false },
          });
        }
      } else {
        alert(response.message || "Failed to fetch customer details");
      }
    } catch (error) {
      alert(error.message || "Error fetching customer details");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await deleteRec(`/inquiry/delete/${selectInquiryId}`);
      if (response?.type === "success") {
        alert("Inquiry deleted successfully");
        const updatedUsers = await fetchListing("/inquiry/list");
        if (updatedUsers?.type === "success") {
          dispatch(fetchUserSuccess(updatedUsers.data));
        } else {
          alert(response.message || "Failed to delete Inquiry");
        }
      }
    } catch (error) {
      alert(error.message || "Error fetching customer details");
    }
    setIsModelOpen(false);
  };

  const DownloadFileId = async (ID) => {
    setDownloadArr((prev) => [...prev, ID]);
    try {
      await FileDownload(ID);
    } catch (error) {
      console.log("Download error:", error);
      alert("Error downloading file");
    } finally {
      setDownloadArr((prev) => prev.filter((item) => item !== ID));
    }
  };

  const openDeleteModal = (userId) => {
    setSelectInquiryId(userId);
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
  };

  const CallPrint = () => {};
  const CallView = () => {};

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);
  const columns = [
    {
      name: "Enquiry Number",
      selector: (row) => row?.inq_number,
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row?.productDetails?.product_name,
      sortable: false,
    },
    {
      name: "Description",
      selector: (row) => row?.productDetails?.description,
      sortable: false,
    },
    {
      name: "Inquiry Date",
      selector: (row) => formattedDate(row?.quotationDate),
      sortable: true,
    },
    {
      name: "Quotation Date",
      selector: (row) => formattedDate(row?.quotationDate),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row?.inquiry_status,
      sortable: false,
    },
    {
      name: "Approval Date",
      selector: (row) => formattedDate(row?.approval_date),
      sortable: true,
    },
  ];

  return (
    <>
      <div>
        <EnquiryTable
          title="Enquiry List"
          buttonLabel="Create Enquiry"
          onCreate={() => navigate("/enquiry/createEnquiry")}
          columns={columns}
          data={currentUsers}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
          CallPrint={(data) => DownloadFileId(data)}
          CallView={(data) => handleEdit(data, false, true)}
          noDataMessage={
            loader ? <CircularProgress color="inherit" /> : "No data available."
          }
          downloadArr={downloadArr}
        />
        <DynamicModal
          showModal={isModalOpen}
          title="confirm Delete"
          body="Are you sure you want to delete this Enquiry?"
          confirmAction={handleDelete}
          closeModel={closeModel}
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
        />
      </div>
    </>
  );
};

export default Enquiry;
