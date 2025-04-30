import React from "react";
import { useForm } from "react-hook-form";
import { addRec } from "../../common/common";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
    control,
    trigger,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    const { current_password, new_password, confirm_password } = data;
    const payload = {
      current_password,
      new_password,
      confirm_password,
    };
    try {
      const response = await addRec("/changePassword", payload);
      if (response.type === "success") {
        alert("Password changed successfully");
        reset();
      } else {
        if (response.message) {
          alert(response.message);
        }
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          response.data.forEach((error) => {
            if (error.msg) {
              alert(item.message);
            }
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div>
        <div className="flex flex-col gap-4 m-4">
          <h1 className="text-xl border-l-0 ">Change Password</h1>
        </div>
        <div className="flex flex-col gap-4 my-2 mx-4 sm:mx-20 sm:my-10">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label>Current Password</label>
              <input
                className="border-2 border-gray-300 rounded-md p-2"
                type="password"
                id="current_password"
                {...register("current_password", {
                  required: "Current Password is required",
                })}
              />
              {errors.current_password && (
                <span>{errors.current_password.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>New Password</label>
              <input
                className="border-2 border-gray-300 rounded-md p-2"
                type="password"
                id="new_password"
                {...register("new_password", {
                  required: "New Password is required",
                })}
              />
              {errors.new_password && (
                <span>{errors.new_password.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>Confirm Password</label>
              <input
                className="border-2 border-gray-300 rounded-md p-2"
                type="password"
                id="confirm_password"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("new_password") || "Passwords do not match",
                })}
              />
              {errors.confirm_password && (
                <span>{errors.confirm_password.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
