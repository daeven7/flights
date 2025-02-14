import axios from "axios";
import { airportService } from "./airports.service";
import { extractFlightData } from "../utils/flight.utils";
import { ENDPOINTS } from "../utils/constants.utils";
import { FlightData, FlightParams } from "../types/flights.types";

const headers = {
  "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
  "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
};

export const flightService = {
  getFlightsData: async ({
    departureDate,
    returnDate,
    origin,
    destination,
    ticketType = "economy",
    passengers = 1,
    trip = "oneWay",
  }: FlightParams): Promise<FlightData[]> => {
    try {
      const [originAirportData, destAirportData] = await Promise.all([
        airportService.getData(origin),
        airportService.getData(destination),
      ]);

      if (!originAirportData || !destAirportData) {
        throw new Error("Failed to fetch airport data");
      }

      const { data } = await axios.get<void>(ENDPOINTS.SEARCH_FLIGHTS, {
        params: {
          originSkyId: originAirportData.data[0].skyId,
          destinationSkyId: destAirportData.data[0].skyId,
          originEntityId: originAirportData.data[0].entityId,
          destinationEntityId: destAirportData.data[0].entityId,
          // date: "2025-02-15",
          // returnDate: "2025-02-28",
          date: departureDate,
          returnDate: returnDate,
          cabinClass: ticketType,
          adults: passengers,
          sortBy: "best",
          currency: "USD",
          market: "en-US",
          countryCode: "US",
        },
        headers,
      });

      let transformedData = extractFlightData(data);
      return transformedData;
    } catch (error) {
      console.error("Error fetching flight data:", error);
      throw error;
    }
  },
};
