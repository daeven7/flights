import { v4 as uuidv4 } from "uuid";
import { FlightData } from "../types/flights.types";

const formatTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
};

const formatDuration = (minutesStr: string): string => {
  const minutes = parseInt(minutesStr, 10);

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 0 ? `${hours} hr` : "";
  const minutesText = remainingMinutes > 0 ? `${remainingMinutes} min` : "";

  return [hoursText, minutesText].filter(Boolean).join(" ");
};

export const extractFlightData = (jsonData: any): FlightData[] => {
  const flights: FlightData[] = [];

  jsonData.data.itineraries.forEach((itinerary: any) => {
    const price = itinerary.price.formatted;
    const totalStops = itinerary.legs[0].stopCount;

    itinerary.legs.forEach((leg: any) => {
      const starttime = formatTime(leg.departure);
      const endtime = formatTime(leg.arrival);
      const timings = `${starttime} - ${endtime}`;
      const duration = formatDuration(leg.durationInMinutes);
      const stops = leg.stopCount;
      const nonstopOrStops = stops === 0 ? "Nonstop" : `${stops} stop(s)`;

      const marketingCarrier = leg.carriers.marketing[0];
      const carrierName = marketingCarrier.name;
      const carrierLogo = marketingCarrier.logoUrl;
      const key = uuidv4();

      flights.push({
        starttime,
        endtime,
        duration,
        cost: price,
        stops,
        carrierName,
        carrierLogo,
        nonstopOrStops,
        key,
        timings,
      });
    });
  });
  return flights;
};
