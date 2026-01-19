export const getApiErrorMessage = (error) => {
  if (error?.response?.data) {
    if (typeof error.response.data === "string") {
      // console.log("error.response.data",error.response.data)
      return error.response.data;
    }

    if (error.response.data.message) {
      // console.log("error.response.data.message", error.response.data.message)
      return error.response.data.message;
    }

    if (error.response.data.error) {
      // console.log("error.response.data.error",error.response.data.error)
      return error.response.data.error;
    }
  }

  return error?.message || "Something went wrong";
};
