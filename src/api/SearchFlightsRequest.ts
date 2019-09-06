export class SearchFlightsRequest {
  from: string;
  to: string;
  departureDate: Date;

  constructor(from: string, to: string, departureDate: Date) {
    this.from = from;
    this.to = to;
    this.departureDate = departureDate;
  }
}
