import { Airport } from "./Airport";

export interface Flight {
  id: number;
  from: Airport;
  to: Airport;
  carrier: string;
  departureTime: Date;
  arrivalTime: Date;
}
