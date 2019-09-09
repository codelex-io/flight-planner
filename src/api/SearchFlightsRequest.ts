import { Moment } from "moment";
import { formatDate } from "../formatting";

export class SearchFlightsRequest {
  from: string;
  to: string;
  departureDate: string;

  constructor(from: string, to: string, departureDate: Moment) {
    this.from = from;
    this.to = to;
    this.departureDate = formatDate(departureDate)
  }
}
