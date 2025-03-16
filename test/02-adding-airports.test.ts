import { AdminFlightApi, TestApi } from "../src";
import { RIX, ARN } from "./fixture";
import { AddAirportRequest } from "../src/api/AddAirportRequest";

describe("Adding Airports", () => {
  beforeEach(() => TestApi.clearAirports());

  const request = new AddAirportRequest(RIX.country, RIX.city, RIX.airport);

  it("should be able to add airports", async (done) => {
    const response = await AdminFlightApi.addAirport(request);

    expect(response.status).toBe(201);

    const airport = response.data;

    expect(airport.id).toBeDefined();
    expect(airport.airport).toEqual(request.airport);
    expect(airport.city).toEqual(request.city);
    expect(airport.country).toBe(request.country);

    done();
  });

  it("should return different ids for each Airport", async (done) => {
    const firstAirport = (await AdminFlightApi.addAirport(request)).data;

    const secondRequest = new AddAirportRequest(
      ARN.country,
      ARN.city,
      ARN.airport
    );

    const secondAirport = (await AdminFlightApi.addAirport(secondRequest)).data;

    expect(firstAirport.id).not.toBe(secondAirport.id);

    done();
  });

  it("should not be able to add same Airport twice", async (done) => {
    console.log(request);
    const response = await AdminFlightApi.addAirport(request);

    expect(response.status).toBe(201);

    try {
      await AdminFlightApi.addAirport(request);
      done.fail();
    } catch (e) {
      expect(e.response.status).toBe(409);
    }
    done();
  });

  it("should not accept wrong values", async (done) => {
    const requests = [
      {
        country: null,
        city: null,
        airport: "RIX",
      },
      {},
      {
        country: null,
        city: null,
        airport: null,
      },
      {
        country: "Latvia",
        city: "",
        airport: "",
      },
      {
        country: "",
        city: "Riga",
        airport: "",
      },
    ];

    await Promise.all(
      requests.map(async (it) => {
        try {
          await AdminFlightApi.addAirport(it as any);
          done.fail(`No error was thrown when adding ${JSON.stringify(it)}`);
        } catch (e) {
          expect(e.response.status).toBe(400);
        }
      })
    );

    done();
  });
});
