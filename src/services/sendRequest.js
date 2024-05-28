import { API_URL } from "./constants";
import customAxios from "./customAxios";

export const sendRequest = async ({ method, endpoint, data, ...remains }) => {
  return await customAxios({
    method: method?.toLowerCase(),
    url: `${API_URL}${endpoint}`,
    data,
    ...remains,
  });
};
