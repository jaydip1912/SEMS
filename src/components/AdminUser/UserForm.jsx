import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addUserFailure,
  addUserSuccess,
  editUserFailure,
  editUserSuccess,
} from "../../store/actions/userAction";
import { addRec } from "../../common/common";

const UserForm = ({ isEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm();

  const [status, setStatus] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userData = location.state?.userData;
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    if (isEdit && userData) {
      setValue("first_Name", userData.first_name);
      setValue("last_Name", userData.last_name);
      setValue("phone_number", userData.phone_number);
      setValue("email", userData.email);
      setValue("password", userData.password);
      setStatus(userData.status === "active");
    }
  }, [isEdit, userData, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      RoleId: users?.roleId,
      status: isEdit ? (status ? "active" : "inactive") : undefined,
      ...(isEdit && { user_id: userData.id }),
    };

    const endpoint = isEdit ? "/update-admin-user" : "/create-admin-user";
    const successAction = isEdit ? editUserSuccess : addUserSuccess;
    const failureAction = isEdit ? editUserFailure : addUserFailure;

    try {
      const response = await addRec(endpoint, payload);

      if (response?.type === "success") {
        dispatch(successAction(response.data));
        alert(`${isEdit ? "User updated" : "User created"} successfully!`);
        reset();
        navigate("/userlist");
      } else {
        if (response?.data) {
          response?.data?.forEach((error) => {
            setError(
              error.path,
              {
                type: "manual",
                message: error.message,
              },
              { shouldFocus: true }
            );
          });
        } else {
          alert(
            `${isEdit ? "User update" : "User creation"} failed!` ||
              response?.message
          );
        }
        dispatch(
          failureAction(
            response.message || `${isEdit ? " update" : " create"} user`
          )
        );
      }
    } catch (error) {
      alert(
        error?.message || `Error ${isEdit ? "updating" : "creating"} user!`
      );
      dispatch(failureAction("Error occurred!"));
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
                    {...register("first_Name", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.first_Name ? "border-red-500" : "border-gray-300"
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
                    {...register("last_Name", { required: true })}
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.last_Name ? "border-red-500" : "border-gray-300"
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
                    className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:
ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
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

export default UserForm;
