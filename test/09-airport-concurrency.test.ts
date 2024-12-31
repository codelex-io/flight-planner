import _ from "lodash";
import { TestApi, AdminFlightApi, CustomerFlightApi } from "../src";
import {
  randomAddFlightRequest,
  init,
  randomAddAirportRequest,
} from "../src/demo-data/generator";

describe("Concurrency Handling", () => {
  beforeAll(() => init());

  beforeEach(() => TestApi.clearFlights());

  it("should handle concurrent adding & deleting", async (done) => {
    await Promise.all(
      _.range(0, 100).map(async () => {
        const request = randomAddFlightRequest();
        const response = await AdminFlightApi.addFlight(request);
        if (response.status === 201) {
          await AdminFlightApi.deleteFlight(response.data.id);
        }
      })
    );

    done();
  }, 60000);

  it("should not be able to add the same flight twice", async (done) => {
    const request = randomAddAirportRequest();

    await Promise.all(
      _.range(0, 100).map(async () => {
        try {
          await AdminFlightApi.addAirport(request);
        } catch (ignored) {}
      })
    );

    const response = await CustomerFlightApi.searchAirports(request.airport);

    expect(response.data.length).toBe(1);
    expect(response.data[1]).toBe(request);

    done();
  }, 60000);
});
