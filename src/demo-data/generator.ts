import csv from "csvtojson";
import _ from "lodash";
import moment from "moment";
import path from "path";
import { Airport, AddFlightRequest } from "../api";

const AIRLINES_CSV = path.resolve(__dirname + "/airlines.csv");
const AIRPORTS_CSV = path.resolve(__dirname + "/airports.csv");

let airlines: string[]
let airports: Airport[]

const readAirlines = async (): Promise<string[]> => {
  const tranform = (lines: any[]) => {
    return lines.map(it => it.description).filter(it => it);
  };
  return csv()
    .fromFile(AIRLINES_CSV)
    .then(tranform);
};

const readAirports = async (): Promise<Airport[]> => {
  const tranform = (lines: any[]) => {
    return lines
      .map(it => new Airport(it.iso_country, it.municipality, it.ident))
      .filter(it => it.country && it.city && it.airport)
      .filter(it => it.airport !== "0");
  };
  return csv()
    .fromFile(AIRPORTS_CSV)
    .then(tranform);
};

export const init = async () => {
  await readAirlines().then(it => airlines = it)
  await readAirports().then(it => airports = it)
}

export const randomAddFlightRequest = (): AddFlightRequest => {
  const departureDate = moment()
    .year(2019 + _.random(0, 10))
    .month(1 + _.random(0, 11))
    .day(1 + _.random(0, 27))
    .hour(0 + _.random(0, 24))
    .minute(0 + _.random(0, 60));

  const arrivalDate = moment(departureDate)
    .add(_.random(0, 3), "days")
    .add(_.random(1, 24), "hours");

  const from = airports[_.random(0, airports.length)];
  let to = airports[_.random(0, airports.length)];

  while (from.airport === to.airport) {
    to = airports[_.random(0, airports.length)];
  }

  return new AddFlightRequest(
    from,
    to,
    airlines[_.random(0, airlines.length)],
    departureDate,
    arrivalDate
  );
};

export const generateAddFlightRequests = async (
  n: number
): Promise<AddFlightRequest[]> => {
  return _.range(n).map(it => randomAddFlightRequest());
};
