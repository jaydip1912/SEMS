import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addUserFailure,
  addUserSuccess,
  editUserFailure,
  editUserSuccess,
} from "../../store/actions/userAction";
import { addRec } from "../../common/common";

const ProductForm = ({ isEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
    control,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const { users } = useSelector((state) => state.user);

  const userData = location.state?.userData;
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (isEdit && userData) {
      setValue("product_name", userData.product_name);
      setValue("description", userData.description);
      setStatus(userData.status == "active");
    }
  }, [isEdit, userData, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("product_name", data.product_name);
    formData.append("description", data.description);
    if (data.image && data.image.length > 0) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append("image", data.image[i]);
      }
    }
    if (isEdit) {
      formData.append("status", status ? "active" : "inactive");
      formData.append("product_id", userData.id);
    }

    const endpoint = isEdit ? "/update-product" : "/create-product";
    const successAction = isEdit ? editUserSuccess : addUserSuccess;
    const failureAction = isEdit ? editUserFailure : addUserFailure;

    try {
      const response = addRec(endpoint, formData);
      if (response?.type === "success") {
        dispatch(successAction(response.data));
        alert(
          `${isEdit ? "Product updated" : "Product created"} successfully!`
        );
        reset();
        navigate("/products");
      } else {
        if (response?.data) {
          response.data.forEach((error) => {
            setError(error.path, { type: "manual", message: error.msg });
          });
        } else {
          alert(
            response.message ||
              `Failed to ${isEdit ? "update" : "create"} product.`
          );
        }
        dispatch(
          failureAction(
            response.message ||
              `Failed to ${isEdit ? "update" : "create"} product.`
          )
        );
      }
    } catch (error) {
      alert(
        error.message ||
          `An error occurred while ${
            isEdit ? "updating" : "creating"
          } the product.`
      );
      dispatch(
        failureAction("An error occurred while processing the request.")
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className=" justify-center items-center h-screen">
          <div className="bg-white flex justify-between items-center  p-4 rounded-lg shadow-md w-full ">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEdit ? "Update Product" : "Create Product"}
            </h2>
            <button
              type="button"
              className="m-1 bg-blue-700 text-white rounded-md px-8 py-2 hover:bg-green-500"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md ">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row sm:flex-row  justify-between items-center mb-4">
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="customerName"
                    className="font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="product_name"
                    {...register("product_name", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.product_name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    className="font-medium text-gray-700"
                    htmlFor="Description"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    {...register("description", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700" htmlFor="phone">
                    Image
                  </label>
                  <Controller
                    control={control}
                    name="image"
                    render={({ field }) => (
                      <>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                        {errors.image && (
                          <span className="text-danger">
                            {errors.image.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
                {isEdit && (
                  <div className="flex flex-col space-y-2 px-4 py-2">
                    <div className="flex items-center ">
                      <span>{status ? "Active" : "inactive"}</span>
                      <div className="flex justify-center items-center ">
                        <input
                          defaultChecked
                          className=" p-2 checkbox checkbox-success"
                          type="checkbox"
                          checked={status}
                          onClick={() => setStatus((prev) => !prev)}
                        />
                        <label>
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center mt-4">
                  <div className="flex items-center">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      {isEdit ? "Update" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
