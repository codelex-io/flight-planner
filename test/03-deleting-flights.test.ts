import moment from "moment";
import { AdminFlightApi, TestApi } from "../src";
import { AddFlightRequest } from "../src/api";
import { RIX, ARN, RYANAIR, baseDateTime } from "./fixture";

describe("Delete Flights", () => {
  beforeEach(() => TestApi.clear());

  it("should be able to delete flight", async done => {
    const request = new AddFlightRequest(
      RIX,
      ARN,
      RYANAIR,
      baseDateTime,
      moment(baseDateTime).add(1, "day")
    );

    const flight = (await AdminFlightApi.addFlight(request)).data;

    const response = await AdminFlightApi.deleteFlight(flight.id);
    expect(response.status).toBe(200);

    try {
      await AdminFlightApi.fetchFlight(flight.id);
      done.fail();
    } catch (e) {
      expect(e.response.status).toBe(404);
    }

    done();
  });

  it("should not fail on missing flight", async done => {
    const response = await AdminFlightApi.deleteFlight(666);
    expect(response.status).toBe(200);

    done();
  });
});
