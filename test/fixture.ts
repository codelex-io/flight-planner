import moment from "moment";
import { Airport } from "../src/api";

export const RIX = new Airport("Latvia", "Riga", "RIX");
export const DME = new Airport("Russia", "Moscow", "DME");
export const DXB = new Airport("United Arab Emirates", "Dubai", "DXB");
export const ARN = new Airport("Sweden", "Stockholm", "ARN");

export const RYANAIR = "Ryanair";
export const TURKISH_AIRLINES = "Turkish Airlines";

export const baseDateTime = moment("2019-01-01 00:00");
