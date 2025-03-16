import { Moment } from "moment";
import { formatDateTime } from "../formatting";
import { AddAirportRequest } from "./AddAirportRequest";

export class AddFlightRequest {
  from: AddAirportRequest;
  to: AddAirportRequest;
  carrier: string;
  departureTime: string;
  arrivalTime: string;

  constructor(
    from: AddAirportRequest,
    to: AddAirportRequest,
    carrier: string,
    departureTime: Moment,
    arrivalTime: Moment
  ) {
    this.from = from;
    this.to = to;
    this.carrier = carrier;
    this.departureTime = formatDateTime(departureTime);
    this.arrivalTime = formatDateTime(arrivalTime);
  }
}
