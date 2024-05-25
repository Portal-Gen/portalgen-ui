import { notifications } from "@mantine/notifications";
import axios from "axios";
import Cookies from "js-cookie";

const PGN_USER_SERVICE_URL = import.meta.env.VITE_PGN_USER_SERVICE_URL;

const userServiceApi = axios.create({
  baseURL: '/user-service/api/v1',
  headers: {},
});

userServiceApi.interceptors.request.use((config) => {
  // get access token from cookie (browser)
  const accessTokenCookieVal = Cookies.get("id");
  config.headers["Authorization"] = "Bearer " + accessTokenCookieVal;

  return config;
});

userServiceApi.interceptors.response.use((config) => {
  if (config.data?.exception) {
    notifications.show({
      message: config.data?.exception,
      color: "red",
      title: "Error",
    });
    throw new Error(config.data?.exception);
  }

  return config;
});

export { userServiceApi };