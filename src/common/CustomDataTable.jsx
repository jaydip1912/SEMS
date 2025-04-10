import { faUser, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

const customStyles = {
  rows: {
    style: {
      minHeight: "50px",
      fontSize: "15px",
    },
  },
  headCells: {
    style: {
      fontSize: "1rem",
      background: "#F7F7F7",
      color: "#121212",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};

const CustomDataTable = ({
  title,
  buttonLabel,
  onCreate,
  columns,
  data,
  onEdit,
  onDelete,
  noDataMessage = "No data available.",
  showDelete = true,
  showEdit = true,
  showCreate = true,
  showActions = true,
  showSelect = false,
}) => {
  const actionsColumn = {
    name: "Actions",
    cell: (row) => (
      <div className="flex items-center gap-2">
        {showSelect && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onEdit(row.id, row)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md transition"
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-2">Select</span>
          </Button>
        )}
        {showEdit && (
          <FontAwesomeIcon
            icon={faEdit}
            className="text-yellow-500 cursor-pointer transition hover:scale-110"
            onClick={() => onEdit(row.id, row)}
          />
        )}
        {roleName === "admin" && showDelete && (
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="text-red-500 cursor-pointer transition hover:scale-110"
            onClick={() => onDelete(row.id)}
          />
        )}
      </div>
    ),
    width: "12%",
  };
  const { roleName } = useSelector((state) => state.auth) || {};

  const finalColumns = showActions ? [...columns, actionsColumn] : columns;

  return (
    <div className="p-3">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold">{title}</h4>
        {showCreate && (
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={onCreate}
          >
            {buttonLabel}
          </button>
        )}
      </div>

      {/* Data Table */}
      <DataTable
        columns={finalColumns}
        data={data}
        noDataComponent={<div className="text-gray-500">{noDataMessage}</div>}
        customStyles={customStyles}
        pagination
      />
    </div>
  );
};

export default CustomDataTable;
