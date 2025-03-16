import { Moment } from "moment";
import { formatDate } from "../formatting";

export class SearchFlightsRequest {
  from: string;
  to: string;
  departureDate: string;
  page: number;

  constructor(from: string, to: string, departureDate: Moment, page: number) {
    this.from = from;
    this.to = to;
    this.departureDate = formatDate(departureDate);
    this.page = page;
  }
}
