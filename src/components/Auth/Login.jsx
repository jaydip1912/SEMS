import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../store/actions/authAction";
import { addRec } from "../../common/common";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);

  const onSubmit = async (data) => {
    dispatch(loginRequest());
    // console.log(data);
    try {
      const response = await addRec("/login", data);

      if (response?.data?.token) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        const roleId =
          response.data?.Role?.Permissions?.[0]?.RolePermission?.RoleId || null;
        const RoleName = response.data?.Role?.name || null;
        const permissions =
          response.data.Role?.Permissions?.map((perm) => perm.name) || [];

        localStorage.setItem("roleId", roleId);
        dispatch(loginSuccess(token, roleId, permissions, RoleName));
        alert("Login Successfully");
      } else {
        const errorMessage = alert(response?.message || "invalid credentials");
        dispatch(loginFailure(errorMessage));
      }
    } catch (error) {
      const errorMessage =
        error.response?.message || "Login failed. Please try again later.";
      dispatch(loginFailure(errorMessage));
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/enquiry");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("email", {
                  required: { value: true, message: "Filed is Required" },
                })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("password", {
                  required: { value: true, message: "Filed is Required" },
                })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "logging in.." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
