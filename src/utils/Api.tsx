export const config = {
  headers: {
    authorization: localStorage.getItem("jwt-token"),
  },
};
