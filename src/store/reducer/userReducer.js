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

const initialState = {
  users: [],
  loading: false,
  error: null,
  successMessage: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, users: [], loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USER_FAILURE:
      return { ...state, users: [], loading: false, error: action.payload };

    case ADD_USER_REQUEST:
      return { ...state, loading: true, successMessage: null };
    case ADD_USER_SUCCESS:
      if (!action.payload || !action.payload.id) {
        return {
          ...state,
          loading: false,
          error: "Invalid user data received",
        };
      }
      return {
        ...state,
        loading: false,
        users: [...state.users.action.payload],
        successMessage: "User added successfully!",
      };

    case ADD_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case EDIT_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case EDIT_USER_SUCCESS:
      if (!action.payload || !action.payload.id) {
        return {
          ...state,
          loading: false,
          error: "Invalid user data received.",
        };
      }
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        successMessage: "User updated successfully!",
      };
    case EDIT_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // case DELETE_USER_REQUEST:
    //   return { ...state, loading: true, error: null };

    // case DELETE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     users: state.users.filter((user) => user.id !== action.payload),
    //     successMessage: "User deleted successfully!",
    //   };

    // case DELETE_USER_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};
export default userReducer;
