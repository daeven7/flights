import axios from "axios";
import { ENDPOINTS } from "../utils/constants.utils";
import { AirportDataResponse } from "../types/airport.types";

const headers = {
  "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
  "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
};

export const airportService = {
  getData: async (location: string): Promise<AirportDataResponse> => {
    const { data } = await axios.get<AirportDataResponse>(ENDPOINTS.SEARCH_AIRPORTS,
      { params: { query: location, locale: "en-US" }, headers }
    );

    return data;
  },
};
