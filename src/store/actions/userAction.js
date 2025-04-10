import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  EDIT_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "../actionTypes/actionTypes";

export const addUserRequest = () => ({
  type: ADD_USER_REQUEST,
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});

export const addUserFailure = (error) => ({
  type: ADD_USER_FAILURE,
  payload: error,
});

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (users) => ({
  type: FETCH_USER_SUCCESS,
  payload: users,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const editUserRequest = () => ({
  type: EDIT_USER_REQUEST,
});

export const editUserSuccess = (user) => ({
  type: EDIT_USER_SUCCESS,
  payload: user,
});

export const editUserFailure = (error) => ({
  type: EDIT_USER_FAILURE,
  payload: error,
});

// export const deleteUserRequest = () => ({
//   type: DELETE_USER_REQUEST,
// });

// export const deleteUserSuccess = (userId) => ({
//   type: DELETE_USER_SUCCESS,
//   payload: userId,
// });

// export const deleteUserFailure = (error) => ({
//   type: DELETE_USER_FAILURE,
//   payload: error,
// });
