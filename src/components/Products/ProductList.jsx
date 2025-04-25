import React, { useEffect, useState } from "react";
import CustomDataTable from "../../common/CustomDataTable";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
} from "../../store/actions/userAction";
import { addRec } from "../../common/common";

const ProductList = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);
  // console.log(users);

  useEffect(() => {
    const getUsers = async () => {
      dispatch(fetchUserRequest());
      setLoader(true);

      try {
        const response = await addRec("/products");
        if (response?.type === "success") {
          dispatch(fetchUserSuccess(response?.data));
        } else {
          alert(response.message || "Error fetch products.");
          dispatch(fetchUserFailure("Error fetch products."));
        }
      } catch (error) {
        alert(error.message || "Error fetch products..");
        console.log(error);
        dispatch(fetchUserFailure(error.message));
      }
    };
    getUsers();
  }, [dispatch]);

  const handleEdit = async (userId) => {
    try {
      console.log(userId);

      const response = await addRec("/edit-product", {
        product_id: userId,
      });
      if (response?.type === "success") {
        navigate(`/products/updateProduct/${userId}`, {
          state: { userData: response.data },
        });
      } else {
        alert(error.message | "failed to fetch product");
      }
    } catch (error) {
      alert(error.message || "Error edit Product.");
      console.log(error);
    }
  };

  const productColumns = [
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    { name: "Description", selector: (row) => row.description, sortable: true },
    { name: "Image", selector: (row) => row.image, sortable: false },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];
  return (
    <>
      <div>
        <CustomDataTable
          title={"Product List"}
          buttonLabel={"Create Product"}
          onCreate={() => navigate("/products/createProduct")}
          columns={productColumns}
          data={users}
          onEdit={handleEdit}
          noDataMessage={
            loader ? <CircularProgress color="primary" /> : "no product found."
          }
        />
      </div>
    </>
  );
};

export default ProductList;
