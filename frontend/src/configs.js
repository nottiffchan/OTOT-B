export const API_URL =
  process.env.REACT_APP_ENVIRONMENT === "PROD"
    ? process.env.REACT_APP_PROD_BACKEND
    : process.env.REACT_APP_DEV_BACKEND;
