import { MutateOptions, useMutation } from "@tanstack/react-query";

import { updateUserPlacePreferences } from "@/api/user";

export const useUpdateUserPlacePreferencesMutation = (
  options?: MutateOptions
) => {
  return useMutation({
    mutationKey: [updateUserPlacePreferences.name],
    mutationFn: updateUserPlacePreferences.fn,
    ...options,
  });
};
