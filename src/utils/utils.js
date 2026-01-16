export const getApiErrorMessage = (error) => {
  if (!error) return "Something went wrong";

  // Axios error
  if (error.response) {
    const { data, status } = error.response;

    if (data?.message) return data.message;

    if (typeof data === "string") return data;

    return `Request failed with status ${status}`;
  }

  // Network error
  if (error.request) {
    return "Network error. Please check your connection.";
  }

  return error.message || "Unknown error occurred";
};
