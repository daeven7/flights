import React, { useState } from "react";
import { Button, Card, Flex, Form, Input, Select } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {  UserOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import styles from "./flight-input.module.scss";

const { Option } = Select;

interface FlightInputProps {
  onFlightInputSubmit: (values: any) => void;
}

const FlightInput: React.FC<FlightInputProps> = ({ onFlightInputSubmit }) => {
  const [form] = Form.useForm();

  const [trip, setTrip] = useState("Round Trip");
  const [ticketType, setTicketType] = useState("Economy");

  const onTripChange = (value: string) => {
    if (value == "roundTrip") setTrip("Round Trip");
    else setTrip("One Way");
  };

  const onTicketTypeChange = (value: string) => {
    if (value == "economy") setTicketType("Economy");
    else if (value == "business") setTicketType("Business");
    else setTicketType("First");
  };

  dayjs.extend(customParseFormat);

  const dateFormat = "YYYY-MM-DD";

  return (
    <div className={styles.flightInput}>
      <Card
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          borderWidth: "2px",
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFlightInputSubmit}
          autoComplete="off"
        >
          <Flex gap="small">
            <Form.Item name="trip" initialValue="roundTrip">
              <Select
                placeholder={trip}
                onChange={onTripChange}
                allowClear
                style={{ width: "10rem" }}
              >
                <Option value="roundTrip">Round Trip</Option>
                <Option value="oneWay">OneWay</Option>
              </Select>
            </Form.Item>

            <Form.Item name="passengers" initialValue={1}>
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                addonBefore={<UserOutlined />}
                style={{ width: "7rem" }}
              />
            </Form.Item>

            <Form.Item name="ticketType" initialValue="economy">
              <Select
                placeholder={ticketType}
                onChange={onTicketTypeChange}
                allowClear
                style={{ width: "9rem" }}
              >
                <Option value="economy">Economy</Option>
                <Option value="business">Business</Option>
                <Option value="first">First</Option>
              </Select>
            </Form.Item>
          </Flex>

          <Flex gap="small">
            <Form.Item name="origin">
              <Input
                size="large"
                placeholder="Where From?"
                style={{ width: "10rem" }}
              />
            </Form.Item>

            <Form.Item name="destination">
              <Input
                size="large"
                placeholder="Where To?"
                style={{ width: "10rem" }}
              />
            </Form.Item>

            <Form.Item name="departureDate">
              <DatePicker
                size="large"
                style={{ width: "10rem" }}
                minDate={dayjs(dateFormat)}
                maxDate={dayjs(dateFormat).add(1, "year")}
              />
            </Form.Item>

            {trip === "Round Trip" && (
              <Form.Item name="returnDate" style={{ width: "100%" }}>
                <DatePicker
                  size="large"
                  style={{ width: "10rem" }}
                  minDate={dayjs(dateFormat).add(1, "day")}
                  maxDate={dayjs(dateFormat).add(1, "year")}
                />
              </Form.Item>
            )}
          </Flex>

          <Flex justify="center">
            <Form.Item label={null} name="submit">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};

export default FlightInput;
