import { useQuery } from "@tanstack/react-query";

import { getPlaceById } from "@/api/place";

export const useGetPlaceByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [getPlaceById.name, id],
    queryFn: () => {
      return getPlaceById.fn(id);
    },
  });
};
