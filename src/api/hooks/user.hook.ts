import { MutateOptions, useMutation } from "@tanstack/react-query";

import {
  calibrateUserPlacePreferences,
  updateUserPlacePreferences,
} from "@/api/user";

export const useUpdateUserPlacePreferencesMutation = (
  options?: MutateOptions
) => {
  return useMutation({
    mutationKey: [updateUserPlacePreferences.name],
    mutationFn: updateUserPlacePreferences.fn,
    ...options,
  });
};

export const useCalibrateUserPlacePreferencesMutation = (
  options?: MutateOptions
) => {
  return useMutation({
    mutationKey: [calibrateUserPlacePreferences.name],
    mutationFn: calibrateUserPlacePreferences.fn,
    ...options,
  });
};
