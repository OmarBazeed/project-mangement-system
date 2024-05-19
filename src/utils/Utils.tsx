export const baseUrl: string = "https://upskilling-egypt.com:3003/api/v1";

export const requestHeaders = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};
