import { MutateFunction } from "@tanstack/react-query";

import { placeServiceApi } from "./axiosInstance/placeServiceApi";
import { IPlaceData } from "@/pages/places.page/interface";

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
