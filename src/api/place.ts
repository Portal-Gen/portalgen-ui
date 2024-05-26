import { MutateFunction } from "@tanstack/react-query";

import { placeServiceApi } from "./axiosInstance/placeServiceApi";
import { IPlaceData } from "@/pages/recommendations.page/interface";

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

export const getPlaceById = {
  name: "getPlaceById",
  fn: async (id: string) => {
    const res = await placeServiceApi<TResponse<IPlaceData>>({
      url: `/place/${id}`,
      method: "GET",
    });

    const { data: responseData } = res.data;

    return responseData;
  },
};

export const getPlacesByWorldCityId = {
  name: "getPlacesByWorldCityId",
  fn: async (worldCityId: number) => {
    const res = await placeServiceApi<TResponse<IPlaceData[]>>({
      url: `/places/world_city/${worldCityId}`,
      method: "GET",
    });

    const { data: responseData } = res.data;

    return responseData;
  },
};
