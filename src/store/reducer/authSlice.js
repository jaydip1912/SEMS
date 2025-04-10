const initialState = {
  token: localStorage.getItem("authToken") || false,
  roleId: null,
  roleName: "",
  permissions: [],
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        roleId: action.payload.roleId,
        roleName: action.payload.name,
        permissions: action.payload.permissions,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        token: false,
        roleId: null,
        permissions: [],
        error: null,
      };
    default:
      return state;
  }
};
