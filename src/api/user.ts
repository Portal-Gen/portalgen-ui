import { MutateFunction } from "@tanstack/react-query";

import { userServiceApi } from "./axiosInstance/userServiceApi";
import { WEBSITE_ACTIVITY_TYPE } from "@/shared/enums/biz.enum";

type TMutationConfig = {
  name: string;
  fn: MutateFunction;
};

type TResponse<TData> = {
  serverDateTime: string;
  status: number;
  code: number;
  msg: string;
  exception: null | any;
  successful: boolean;
  data: TData;
};

export const updateUserPlacePreferences = {
  name: "updateUserPreferences",
  fn: async (data: any) => {
    const res = await userServiceApi<TResponse<any>>({
      url: "/place_preference",
      method: "PUT",
      data,
    });

    const { data: responseData } = res.data;

    return responseData;
  },
};

export const calibrateUserPlacePreferences = {
  name: "calibrateUserPreferences",
  fn: async (data: any) => {
    const res = await userServiceApi<TResponse<any>>({
      url: "/place_preference/calibrate",
      method: "PUT",
      data,
    });
  },
};
