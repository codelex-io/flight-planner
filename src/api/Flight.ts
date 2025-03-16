import { Airport } from "./Airport";

export interface Flight {
  id: string;
  from: Airport;
  to: Airport;
  carrier: string;
  departureTime: Date;
  arrivalTime: Date;
}
