import { useState } from "react";
import { useGetFlightsData } from "../hooks/flights";
import { FormProps, Spin } from "antd";
import { FlightParams } from "../types/flights.types";
import { FlightTable } from "../components/FlightTable";
import { FlightInput } from "../components/FlightInput";

export const Flights = () => {
  const [flightParams, setFlightParams] = useState<FlightParams | undefined>(
    undefined
  );

  const { data: flightData, isLoading: isFlightDataLoading } =
    useGetFlightsData(flightParams, Boolean(flightParams));

  const dateFormat = "YYYY-MM-DD";
  const onFlightInputSubmit: FormProps["onFinish"] = (values) => {
    const params = {
      trip: values.trip,
      passengers: values.passengers,
      ticketType: values.ticketType,
      origin: values.origin,
      destination: values.destination,
      departureDate: values.departureDate?.format(dateFormat),
      returnDate: values.returnDate?.format(dateFormat),
    };
    setFlightParams(params);
  };



  return (
    <div style={{marginTop: "3rem"}}>
      <FlightInput onFlightInputSubmit={onFlightInputSubmit} />
      {isFlightDataLoading && (
        <Spin tip="Loading" size="large" style={{ top: "5rem" }}> {''} </Spin>
      )}
      {flightData && (<FlightTable data={flightData} /> )}
    </div>
  );
};
