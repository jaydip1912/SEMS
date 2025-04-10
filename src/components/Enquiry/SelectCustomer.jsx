import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addRec } from "../../common/common";
import CustomDataTable from "../../common/CustomDataTable";

const SelectCustomer = ({ open, handleClose, onCustomerSelect }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customerColumns = [
    { name: "FirstName", selector: (row) => row.firstName, sortable: true },
    { name: "lastName", selector: (row) => row?.lastName, sortable: false },
    { name: "email", selector: (row) => row?.email, sortable: false },
    { name: "address", selector: (row) => row?.address, sortable: false },
    { name: "phone", selector: (row) => row?.phone, sortable: false },
    // { name: "Cover Letter", selector: (row) => row.CoverLetter, sortable: false },
    // { name: "Term And Condition", selector: (row) => row.TermAndCondition, sortable: false }
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await addRec("/customers");
        if (response?.type === "success" && Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          console.error("Failed to fetch customer", response);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    if (open) {
      getUsers();
    }
  }, [open]);

  const handleConfirm = () => {
    if (selectedCustomer) {
      onCustomerSelect(selectedCustomer);
      handleClose();
    }
  };
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%", // More responsive width
          maxWidth: "1200px", // Prevents it from being too large
          bgcolor: "#454545",
          borderRadius: 2, // Rounded corners for a modern look
          boxShadow: 24,
          p: 3,
          overflow: "auto", // Enables scrolling if needed
        }}
      >
        {/* Modal Title */}
        <Typography id="modal-title" variant="h6" component="h2" mb={2}>
          Select Customer
        </Typography>

        {/* Data Table */}
        <CustomDataTable
          title=""
          data={customers}
          columns={customerColumns}
          fullWidth
          sx={{ m: 1, minWidth: 120 }}
          onEdit={(id, newValue) => {
            handleClose();
          }}
          noDataMessage="No Enquiry found."
          showEdit={false}
          showCreate={false}
          showSelect={true}
        />
      </Box>
    </Modal>
  );
};

export default SelectCustomer;
