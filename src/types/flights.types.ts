export type FlightParams = {
  departureDate: Date;
  returnDate?: Date;
  origin: string;
  destination: string;
  passengers: number;
  ticketType: string;
  trip?: string;
};

export type FlightData = {
  key: string;
  starttime: string;
  endtime: string;
  duration: string;
  cost: string;
  stops: number;
  carrierName: string;
  carrierLogo: string;
  nonstopOrStops: string;
  timings: string;
};
