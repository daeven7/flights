import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { flightService } from "../services/flights.service";
import { QUERY_KEYS } from "../utils/constants.utils";
import { FlightData, FlightParams } from "../types/flights.types";

export const useGetFlightsData = (
  params: FlightParams | undefined,
  enabled: boolean
): UseQueryResult<FlightData[], unknown> => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.FLIGHTS_DATA,
      params?.origin,
      params?.destination,
      params?.departureDate,
      params?.returnDate,
    ],
    queryFn: () => params && flightService.getFlightsData(params),
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
