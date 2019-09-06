import { Airport } from "./Airport";
import { Moment } from "moment";
import { formatDateTime } from "../formatting";

export class AddFlightRequest {
  from: Airport;
  to: Airport;
  carrier: string;
  departureTime: string;
  arrivalTime: string;

  constructor(
    from: Airport,
    to: Airport,
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
