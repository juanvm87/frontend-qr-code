import http from "./http-common.js";

// ********* Super Panel API **********

export const createQrAPI = async (data) => {
  return await http.post("qr", data);
};
export const getAllOwnerQr = async (data) => {
  return await http.get(`qr/owner`);
};

export const getQr = async (data) => {
  return await http.get(`qr/id/${data}`);
};

export const updateQr = async (qrId, updateQrData) => {
  return await http.patch(`qr/${qrId}`, updateQrData);
};
export const signup = async (data) => {
  return await http.post("auth/signup", data);
};
export const signin = async (data) => {
  return await http.post("auth/login", data);
};
