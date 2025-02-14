import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { airportService } from "../services/airports.service";
import { QUERY_KEYS } from "../utils/constants.utils";

export const useGetAirportData = (
  location: string,
  enabled: boolean = true,
): UseQueryResult<string, unknown> => {
  return useQuery({
    queryKey: [QUERY_KEYS.AIRPORTS_DATA, location],
    queryFn: () => airportService.getData(location),
    enabled,
    staleTime : Infinity,
    gcTime: Infinity
  });
};
