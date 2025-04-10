import axiosConfig from "../utils/axiosConfig";

export const fetchListing = async (params) => {
  return await axiosConfig
    .get(params)
    .then((res) => {
      if (res?.data) {
        return res?.data;
      } else {
        return res?.response?.data;
      }
    })
    .catch((error) => console.log(error));
};

export const postFetchingListing = async (params) => {
  return await axiosConfig
    .post(params)
    .then((res) => {
      if (res?.data) {
        return res?.data;
      } else {
        return res?.response?.data;
      }
    })
    .catch((error) => console.log(error));
};

export const postFetch = async (params) => {
  return await axiosConfig
    .post(params.data)
    .then((res) => {
      if (res.data) {
        return res?.data;
      } else {
        return res?.response?.data;
      }
    })
    .catch((error) => console.log(error));
};

export const getById = async (params) => {
  return await axiosConfig
    .get(params)
    .then((res) => {
      if (res.data) {
        return res?.data;
      } else {
        return res?.response?.data;
      }
    })
    .catch((error) => console.log(error));
};

export const cancelEditing = async (params) => {
  return await axiosConfig
    .get(params)
    .then((res) => {
      if (res.data) {
        return res?.data;
      } else {
        return res?.response?.data;
      }
    })
    .catch((error) => console.log(error));
};

export const downloadFile = async (params, data) => {
  return await axiosConfig
    .post(params, data, {
      responseType: "arraybuffer",
    })
    .then((res) => {
      if (res) {
        return res;
      }
    })
    .catch((error) => console.log(error));
};

export const addRec = async (params, data) => {
  return await axiosConfig
    .post(params, data)
    .then((res) => {
      if (res.data) {
        return { ...res.data, status: res.status };
      } else {
        return { ...res.response.data, status: res.status };
      }
    })
    .catch((error) => console.log(error));
};

export const editRec = async (params, data) => {
  return await axiosConfig
    .put(params, data)
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return res.response.data;
      }
    })
    .catch((error) => console.log(error));
};

export const editRecParamsOnly = async (params) => {
  return await axiosConfig
    .put(params)
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return res.response.data;
      }
    })
    .catch((error) => console.log(error));
};

export const deleteRec = async (params) => {
  return await axiosConfig
    .delete(params)
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return res.response.data;
      }
    })
    .catch((error) => console.log(error));
};
