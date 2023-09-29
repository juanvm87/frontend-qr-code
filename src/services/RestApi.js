import http from "./http-common.js";

// ********* Super Panel API **********

export const createQrAPI = async (data) => {
  console.log("helloo--->>", data);
  return await http.post("qr", data);
};
export const getAllOwnerQr = async (data) => {
  return await http.get(`qr/owner/${data}`);
};

export const getQr = async (data) => {
  return await http.get(`qr/id/${data}`);
};
