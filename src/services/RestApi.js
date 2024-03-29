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
export const getQrLink = async (data) => {
  return await http.get(`qr/dynamic-id/${data}`);
};

export const googleSignin = async (data) => {
  return await http.post("user/google-signin", data);
};

export const updateQr = async (qrId, updateQrData) => {
  return await http.patch(`qr/${qrId}`, updateQrData);
};
export const signup = async (data) => {
  return await http.post("user/signup", data);
};
export const signin = async (data) => {
  return await http.post("user/login", data);
};
export const userUpdate = async (data) => {
  return await http.patch(`user`, data);
};
export const getUser = async () => {
  return await http.get(`user/id`);
};
export const getQrByPin = async (data) => {
  return await http.get(`qr/owner/${data.userId}/pin/${data.pin}`);
};
export const deleteQr = async (qrId) => {
  return await http.delete(`qr/${qrId}`);
};

export const addStatistic = async (data) => {
  return await http.post(`statistic`, data);
};

export const getQrStatistic = async (data) => {
  return await http.get(`statistic/id/${data}`);
};
export const getIPInfo = async () => {
  const link = process.env.REACT_APP_IP_GEOLOCATION;
  //TODO check .env
  const response = await http.get(`https://ipinfo.io/json?token=${link}`);
  return response.data;
};
