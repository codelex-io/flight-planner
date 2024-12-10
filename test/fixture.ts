import moment from "moment";
import { AddFlightRequest } from "../src/api";
import { AddAirportRequest } from "../src/api/AddAirportRequest";

export const RIX = new AddAirportRequest("Latvia", "Riga", "RIX");
export const DME = new AddAirportRequest("Russia", "Moscow", "DME");
export const DXB = new AddAirportRequest(
  "United Arab Emirates",
  "Dubai",
  "DXB"
);
export const ARN = new AddAirportRequest("Sweden", "Stockholm", "ARN");

export const RYANAIR = "Ryanair";
export const TURKISH_AIRLINES = "Turkish Airlines";
const today = new Date();
console.log(
  `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
);
export const baseDate = moment(
  `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
);
export const baseDateTime = moment(
  `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 00:00`
);

export const FROM_RIGA_TO_STOCKHOLM = new AddFlightRequest(
  RIX.airport,
  ARN.airport,
  RYANAIR,
  baseDateTime,
  moment(baseDateTime).add(3, "hours")
);
