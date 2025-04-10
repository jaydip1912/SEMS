import { faEye, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

const tableStyle = {
  rows: {
    style: {
      minHeight: "50px",
      fontSize: "15px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#124324",
      color: "white",
      fontSize: "1rem",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      borderRight: "8px ",
    },
  },
};
const EnquiryTable = ({
  title,
  buttonLabel,
  onCreate,
  columns,
  data,
  onEdit,
  onDelete,
  CallPrint,
  CallView,
  noDataMessage,
  showDelete = true,
  showEdit = true,
  showCreate = true,
  showActions = true,
  showSelect = false,
  DownloadArr = [],
}) => {
  const actionsColumn = {
    name: "Actions",
    cell: (row) => (
      <div className="flex items-center gap-4">
        {/* Select Button */}
        {showSelect && (
          <Button
            type="button"
            variant="contained"
            className="cursor-pointer"
            onClick={() => onEdit(row.id, row)}
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-2">Select</span>
          </Button>
        )}

        {/* Edit Icon (Only if not Approved) */}
        {showEdit && row?.inquiry_status !== "Approved" && (
          <FontAwesomeIcon
            icon={faEdit}
            className="text-red-500 cursor-pointer transition hover:scale-110"
            onClick={() => onEdit(row.id, row)}
          />
        )}

        {/* Delete Icon (Only for Admin & not Approved) */}
        {roleName === "admin" &&
          showDelete &&
          row?.inquiry_status !== "Approved" && (
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="text-red-500 cursor-pointer transition hover:scale-110"
              onClick={() => onDelete(row.id)}
            />
          )}

        {/* View Icon (Only for Approved) */}
        {row?.inquiry_status === "Approved" && (
          <FontAwesomeIcon
            icon={faEye}
            className="text-blue-500 cursor-pointer transition hover:scale-110"
            onClick={() => CallView(row.id)}
          />
        )}

        {/* Print Icon (Only for Approved & Not in DownloadArr) */}
        {row?.inquiry_status === "Approved" &&
          (!DownloadArr.includes(row.id) ? (
            <FontAwesomeIcon
              icon={faPrint}
              className="text-green-500 cursor-pointer transition hover:scale-110"
              onClick={() => CallPrint(row.id)}
            />
          ) : (
            <span className="border border-gray-300 p-2 rounded-md"></span>
          ))}
      </div>
    ),
  };

  const { roleName } = useSelector((state) => state.auth);
  const finalColumns = showActions ? [...columns, actionsColumn] : columns;
  return (
    <>
      <div className="shadow-lg border border-gray-200 rounded-lg bg-white p-4">
        <div className="flex flex-col space-y-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

          {/* Create Button (only for salespersons) */}
          {roleName === "salesperson" && showCreate && (
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              onClick={onCreate}
            >
              {buttonLabel}
            </button>
          )}

          {/* Table with Responsive Scroll */}
          <div className="overflow-x-auto">
            <DataTable
              columns={finalColumns}
              data={data}
              // selectableRows
              noDataComponent={
                <div className="text-gray-500">{noDataMessage}</div>
              }
              customStyles={tableStyle}
              pagination
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryTable;
