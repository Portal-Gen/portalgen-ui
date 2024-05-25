import { notifications } from "@mantine/notifications";
import axios from "axios";
import Cookies from "js-cookie";

const placeServiceApi = axios.create({
  baseURL: "/place-service/api/v1",
  headers: {},
});

placeServiceApi.interceptors.request.use((config) => {
  // get access token from cookie (browser)
  const accessTokenCookieVal = Cookies.get("id");
  config.headers["Authorization"] = "Bearer " + accessTokenCookieVal;

  return config;
});

placeServiceApi.interceptors.response.use((config) => {
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

export { placeServiceApi };
