import { MutateFunction } from "@tanstack/react-query";

import { recommendationServiceApi } from "./axiosInstance/recommendationServiceApi";
import { IPlaceRecommendationResponse } from "@/pages/places.page/interface";

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

export const requestPlaceRecommendations = {
  name: "requestPlaceRecommendations",
  fn: async ({ userId, cityName, country }: any) => {
    const res = await recommendationServiceApi<TResponse<any>>({
      url: `/place-recommendations/request/user/${userId}/city/${cityName}/country/${country}`,
      method: "GET",
    });

    const { data: responseData } = res.data;

    return responseData;
  },
};

export const pollPlaceRecommendations = {
  name: "pollPlaceRecommendations",
  fn: async ({ userId, cityName, country }: any) => {
    const res = await recommendationServiceApi<TResponse<any>>({
      url: `/place-recommendations/poll/user/${userId}/city/${cityName}/country/${country}`,
      method: "GET",
    });

    const { data: responseData } = res.data;

    return responseData;
  },
};
