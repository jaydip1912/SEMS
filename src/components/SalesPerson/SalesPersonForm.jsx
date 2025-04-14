import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addRec } from "../../common/common";
import {
  addUserFailure,
  addUserSuccess,
  editUserFailure,
  editUserSuccess,
} from "../../store/actions/userAction";

const SalesPersonForm = ({ isEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userData = location.state?.userData;

  const [roleId, setRoleId] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await addRec("/roles");
        if (response?.status === 200) {
          const RoleID = response.data.find(
            (role) => role.name === "salesperson"
          ).id;
          setRoleId(RoleID);
        }
      } catch (error) {
        alert("Error fetching roles:" || error.message);
        console.error("Error fetching roles:", error);
      }
    };
    getRoles();
  }, []);

  console.log(userData);

  useEffect(() => {
    if (isEdit && userData) {
      setValue("first_name", userData.first_name);
      setValue("last_name", userData.last_name);
      setValue("phone_number", userData.phone_number);
      setValue("email", userData.email);
      // setValue("password", userData.password);
      setStatus(userData.status === "active");
    }
  }, [isEdit, userData, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      RoleID: roleId,
      status: isEdit ? (status ? "active" : "inactive") : undefined,
      ...(isEdit && { user_id: userData.id }),
    };
    console.log("on Submit", payload);

    const endpoint = isEdit ? "/update-sales-user" : "/create-sales-user";
    const successAction = isEdit ? editUserSuccess : addUserSuccess;
    const failureAction = isEdit ? editUserFailure : addUserFailure;

    try {
      const response = await addRec(endpoint, payload);

      if (response?.type === "success") {
        dispatch(successAction(response.data));
        alert(
          `${
            isEdit ? "Sales person updated" : "Sales person created"
          } successfully!`
        );
        reset();
        navigate("/salesPerson");
      } else {
        if (response?.data) {
          response.data.forEach((error) => {
            setError(error.path, { type: "manual", message: error.msg });
          });
        } else {
          alert(
            response.message ||
              `Failed to ${isEdit ? "update" : "create"} sales person.`
          );
        }
        dispatch(
          failureAction(
            response.message ||
              `Failed to ${isEdit ? "update" : "create"} the sales person.`
          )
        );
      }
    } catch (error) {
      alert(
        error.message ||
          `An error occurred while ${
            isEdit ? "updating" : "creating"
          } the sales person.`
      );
      console.error("Error submitting form:", error);
      dispatch(
        failureAction("An error occurred while processing the request.")
      );
    }
  };

  return (
    <>
      <div>
        <div className=" justify-center items-center h-screen">
          <div className="bg-white flex justify-between items-center  p-4 rounded-lg shadow-md w-full ">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEdit ? "Update User" : "Create User"}
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
                    {...register("first_name", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.first_name ? "border-red-500" : "border-gray-300"
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
                    {...register("last_name", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.last_name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    {...register("phone_number", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone_number ? "border-red-500" : "border-gray-300"
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
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    className="font-medium text-gray-700"
                    htmlFor="address"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="address"
                    {...register("password", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? "border-red-500" : "border-gray-300"
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

export default SalesPersonForm;
