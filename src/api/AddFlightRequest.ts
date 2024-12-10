import { Moment } from "moment";
import { formatDateTime } from "../formatting";

export class AddFlightRequest {
  from: string;
  to: string;
  carrier: string;
  departureTime: string;
  arrivalTime: string;

  constructor(
    from: string,
    to: string,
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
