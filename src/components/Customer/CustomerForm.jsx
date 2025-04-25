import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addUserFailure,
  addUserSuccess,
  editUserFailure,
  editUserSuccess,
} from "../../store/actions/userAction";
import { addRec } from "../../common/common";

const CustomerForm = ({ isEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm();
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = location.state?.userData;

  useEffect(() => {
    if (isEdit && userData) {
      console.log("isEdit:", isEdit, "userData", userData);
      setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("phone", userData.phone);
      setValue("email", userData.email);
      setValue("address", userData.address);
      setStatus(userData.status === "active");
    }
  }, [isEdit, userData, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      status: isEdit ? (status ? "active" : "inactive") : undefined,
      ...(isEdit && { customer_id: userData.id }),
    };

    const endpoint = isEdit ? "/update-customer" : "/create-customer";
    const successAction = isEdit ? editUserSuccess : addUserSuccess;
    const failureAction = isEdit ? editUserFailure : addUserFailure;

    try {
      const response = await addRec(endpoint, payload);

      if (response?.type === "success") {
        dispatch(successAction(response.data));
        alert(
          `${isEdit ? "Customer updated" : "Customer created"} successfully!`
        );
        reset();
        navigate("/customers");
      } else {
        if (response?.data) {
          response.data.forEach((error) => {
            setError(error.path, {
              type: "manual",
              message: error.message,
            });
          });
        } else {
          alert(`${isEdit ? "Customer update" : "Customer creation"} failed!`);
        }
        dispatch(
          failureAction(
            response.message || `${isEdit ? " update" : " create"} customer`
          )
        );
      }
    } catch (error) {
      dispatch(failureAction("Error occurred while submitting the form."));
      console.error("Error:", error);
      // alert("Error occurred while submitting the form.");
    }
  };

  return (
    <>
      <div>
        <div className=" justify-center items-center h-screen">
          <div className="bg-white flex justify-between items-center  p-4 rounded-lg shadow-md w-full ">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEdit ? "Update Customer" : "Create Customer"}
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
                    First Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    {...register("firstName", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    className="font-medium text-gray-700"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:
ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    {...register("phone", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:
ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    className="font-medium text-gray-700"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    {...register("address", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {isEdit && (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <span>{status ? "Active" : "inactive"}</span>
                      <div className="">
                        <input
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
              </div>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerForm;
