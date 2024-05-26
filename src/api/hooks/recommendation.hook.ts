import { MutateOptions, useMutation } from "@tanstack/react-query";

import {
  requestPlaceRecommendations,
  pollPlaceRecommendations,
} from "@/api/recommendation";
import {
  IPlaceRecommendationRequest,
  IPlaceRecommendationResponse,
} from "@/pages/places.page/interface";

export const useRequestPlaceRecommendationsMutation = (
  options?: MutateOptions
) => {
  return useMutation({
    mutationKey: [requestPlaceRecommendations.name],
    mutationFn: requestPlaceRecommendations.fn,
    ...options,
  });
};
export const usePollPlaceRecommendationsMutation = (
  options?: MutateOptions
) => {
  return useMutation({
    mutationKey: [pollPlaceRecommendations.name],
    mutationFn: pollPlaceRecommendations.fn,
    ...options,
  });
};