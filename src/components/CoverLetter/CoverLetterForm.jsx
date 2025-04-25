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

const CoverLetterForm = ({ isEdit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userData = location.state?.userData;
  const [status, setStatus] = useState();

  useEffect(() => {
    if (isEdit && userData) {
      setValue("letter", userData.letter);
      setStatus(userData.status === "active");
    }
  }, [setValue, userData, isEdit]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      status: isEdit ? (status ? "active" : "inactive") : undefined,
      ...(isEdit && { letter_id: userData.id }),
    };

    const endpoint = isEdit ? "/update-cover-letter" : "add-cover-letter";
    const successAction = isEdit ? editUserSuccess : addUserSuccess;
    const failureAction = isEdit ? editUserFailure : addUserFailure;

    try {
      const response = await addRec(endpoint, payload);
      if (response?.type === "success") {
        dispatch(successAction(response.data));
        alert(
          `${
            isEdit ? "Cover letter updated" : "Cover letter created"
          } successfully!`
        );
        reset();
        navigate("/coverLetter");
      } else {
        if (response?.data) {
          response.data.forEach((error) => {
            setError(error.path, { type: "manual", message: error.msg });
          });
        } else {
          alert(
            response.message ||
              `Failed to ${isEdit ? "update" : "create"} cover letter.`
          );
        }
        dispatch(
          failureAction(
            response.message ||
              `Failed to ${isEdit ? "update" : "create"} cover letter.`
          )
        );
      }
    } catch (error) {
      alert(
        error.message ||
          `An error occurred while ${
            isEdit ? "updating" : "creating"
          } the cover letter.`
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
              {isEdit ? "Update Cover Letter" : "Create Cover Letter"}
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
                  <label className="font-medium text-gray-700">Letter</label>
                  <div>
                    <textarea
                      className="resize-v  w-full rounded-md p-4"
                      id="letter"
                      {...register("letter", { required: true })}
                    />
                  </div>
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

export default CoverLetterForm;
