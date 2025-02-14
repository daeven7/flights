import React from "react";
import { Card, Table } from "antd";
import type { TableProps } from "antd";
import { FlightData } from "../../types/flights.types";

interface FlightTableProps {
  data: FlightData[];
}

const columns: TableProps<FlightData>["columns"] = [
  {
    title: "Timings",
    dataIndex: "timings",
    key: "timings",
    render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    },
  {
    title: "Stops",
    dataIndex: "nonstopOrStops",
    key: "nonstopOrStops",
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
  },
  {
    title: "Carrier",
    dataIndex: "carrierName",
    key: "carrierName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Logo",
    dataIndex: "carrierLogo",
    key: "carrierLogo",
    render: (dataIndexValue) => <img src={dataIndexValue} />,
  },
];

const FlightTable: React.FC<FlightTableProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" , marginTop:"1rem"}}>
      
      <Card style={{ width: "80%", borderWidth: "2px" }}>
      <h1 >Top flights</h1>
        <Table<FlightData>
          columns={columns}
          dataSource={data}
          showHeader={false}
        />
      </Card>
    </div>
  );
};

export default FlightTable;
