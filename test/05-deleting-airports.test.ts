import { AdminFlightApi, TestApi } from "../src";
import { RIX } from "./fixture";
import { AddAirportRequest } from "../src/api/AddAirportRequest";

describe("Delete Flights", () => {
  beforeEach(() => TestApi.clearAirports());

  it("should be able to delete flight", async (done) => {
    const request = new AddAirportRequest(RIX.country, RIX.city, RIX.airport);

    const airport = (await AdminFlightApi.addAirport(request)).data;

    const response = await AdminFlightApi.deleteAirport(airport.id);
    expect(response.status).toBe(200);

    try {
      await AdminFlightApi.fetchFlight(airport.id);
      done.fail();
    } catch (e) {
      expect(e.response.status).toBe(404);
    }

    done();
  });

  it("should not fail on missing flight", async (done) => {
    const response = await AdminFlightApi.deleteAirport("666");
    expect(response.status).toBe(200);

    done();
  });
});
