import { AdminFlightApi, TestApi } from "../src";
import { RIX, ARN } from "./fixture";

describe("Adding Airports", () => {
  beforeEach(() => TestApi.clearAirports());

  it("should be able to edit airport", async (done) => {
    const response = await AdminFlightApi.addAirport(RIX);

    expect(response.status).toBe(201);

    const editResponse = await AdminFlightApi.updateAirport(response.data.id, {
      airport: "rix",
      city: "riga",
      country: "latvija",
    });
    const airport = editResponse.data;

    expect(airport.id).toBeDefined();
    expect(airport.airport).toEqual("rix");
    expect(airport.city).toEqual("riga");
    expect(airport.country).toBe("latvija");

    done();
  });

  it("should fail on not existing airport", async (done) => {
    const editResponse = await AdminFlightApi.updateAirport("666", ARN);

    expect(editResponse.status).toBe(404);

    done();
  });
});
