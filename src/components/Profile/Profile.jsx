import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addRec } from "../../common/common";

const Profile = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await addRec("/profile");
        if (response?.data) {
          const { first_name, last_name, phone_number, email, status } =
            response.data;
          setValue("first_name", first_name);
          setValue("last_name", last_name);
          setValue("phone", phone_number);
          setValue("email", email);
          setStatus(status === "active");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setValue]);

  const [status, setStatus] = useState(false);
  return (
    <>
      <div>
        <div className="flex flex-col gap-4 m-4">
          <h1 className="text-xl border-l-0 ">Profile</h1>
        </div>
        <div className="flex flex-col gap-4 my-2 mx-4 sm:mx-200 sm:my-10">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label>First Name</label>
              <input
                className="border-2 border-gray-300 rounded-md p-2"
                type="text"
                id="name"
                disabled
                {...register("first_name", {
                  required: "First Name is required",
                })}
              />
              {errors.name && <span>{errors.first_name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label>Last Name</label>
              <input
                className="border-2 border-gray-300 rounded-md p-2"
                type="text"
                id="name"
                disabled
                {...register("last_name", {
                  required: "Last Name is required",
                })}
              />
              {errors.name && <span>{errors.last_name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label>Phone</label>
              <input
                className="border-2 border-gray-300 rounded-md p-2"
                type="text"
                id="name"
                disabled
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && <span>{errors.phone.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                className="border-2 border-gray-300 rounded-md p-2"
                type="email"
                id="email"
                disabled
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label>Status</label>
              <input
                className="border-2 border-gray-300 rounded-md p-2"
                value={status ? "Active" : "Inactive"}
                disabled
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
