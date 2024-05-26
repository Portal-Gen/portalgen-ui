import { MutateFunction } from "@tanstack/react-query";

import { recommendationServiceApi } from "./axiosInstance/recommendationServiceApi";
import { IPlaceRecommendationResponse } from "@/pages/recommendations.page/interface";

type TMutationConfig = {
  name: string;
  fn: MutateFunction;
};

export type TResponse<TData> = {
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
  fn: async ({ userProfileId, worldCityId }: any) => {
    const res = await recommendationServiceApi<TResponse<any>>({
      url: `/place-recommendations/request`,
      method: "POST",
      data: {
        userProfileId,
        worldCityId,
      },
    });

    const { data: responseData } = res.data;

    return responseData;
  },
};

export const pollPlaceRecommendations = {
  name: "pollPlaceRecommendations",
  fn: async ({ userProfileId, worldCityId }: any) => {
    const res = await recommendationServiceApi<TResponse<any>>({
      url: `/place-recommendations/poll`,
      method: "POST",
      data: {
        userProfileId,
        worldCityId,
      },
    });

    const { data: responseData } = res;

    return responseData;
  },
};
