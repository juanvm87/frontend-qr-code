import http from "./http-common.js";

// ********* Super Panel API **********

export const createQrAPI = (data) => {
  return http.post("qr", data);
};
