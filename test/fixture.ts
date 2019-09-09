import moment from "moment";
import { Airport, AddFlightRequest } from "../src/api";

export const RIX = new Airport("Latvia", "Riga", "RIX");
export const DME = new Airport("Russia", "Moscow", "DME");
export const DXB = new Airport("United Arab Emirates", "Dubai", "DXB");
export const ARN = new Airport("Sweden", "Stockholm", "ARN");

export const RYANAIR = "Ryanair";
export const TURKISH_AIRLINES = "Turkish Airlines";

export const baseDateTime = moment("2019-01-01 00:00");
export const baseDate = moment("2019-01-01");

export const FROM_RIGA_TO_STOCKHOLM = new AddFlightRequest(
    RIX,
    ARN,
    RYANAIR,
    baseDateTime,
    moment(baseDateTime).add(3, "hours")
)