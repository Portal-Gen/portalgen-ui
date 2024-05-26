import { useQuery } from "@tanstack/react-query";

import { getPlaceById, getPlacesByWorldCityId } from "@/api/place";

export const useGetPlaceByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [getPlaceById.name, id],
    queryFn: () => {
      return getPlaceById.fn(id);
    },
  });
};

export const useGetPlacesByWorldCityIdQuery = (worldCityId: number) => {
  return useQuery({
    queryKey: [getPlacesByWorldCityId.name, worldCityId],
    queryFn: () => {
      return getPlacesByWorldCityId.fn(worldCityId);
    },
  });
};
