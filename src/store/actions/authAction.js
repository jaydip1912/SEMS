export const loginRequest = () => ({ type: "LOGIN_REQUEST" });
export const loginSuccess = (token, roleId, permissions, name) => ({
  type: "LOGIN_SUCCESS",
  payload: {
    token,
    roleId,
    permissions,
    name,
  },
});
export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
export const logout = () => ({
  type: "LOGOUT",
});
