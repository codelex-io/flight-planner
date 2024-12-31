import moment from "moment";
import { AdminFlightApi, TestApi, formatDateTime } from "../src";
import { AddFlightRequest } from "../src/api";
import { RIX, ARN, RYANAIR, DXB, baseDateTime } from "./fixture";
import { init } from "../src/demo-data/generator";

describe("Adding Flights", () => {
  beforeAll(() => init());
  beforeAll(() => TestApi.clearAirports());
  beforeEach(() => TestApi.clearFlights());

  const request = new AddFlightRequest(
    RIX,
    ARN,
    RYANAIR,
    baseDateTime,
    moment(baseDateTime).add(1, "day")
  );

  it("should be able to add all airports", async (done) => {
    await AdminFlightApi.addAirport(RIX);
    await AdminFlightApi.addAirport(ARN);
    done();
  });

  it("should be able to add flights", async (done) => {
    const response = await AdminFlightApi.addFlight(request);

    expect(response.status).toBe(201);

    const flight = response.data;

    expect(flight.id).toBeDefined();
    expect(flight.from.airport).toEqual(request.from.airport);
    expect(flight.to.airport).toEqual(request.to.airport);
    expect(flight.carrier).toBe(request.carrier);
    expect(flight.departureTime).toBeDefined();
    expect(flight.arrivalTime).toBeDefined();

    done();
  });

  it("should return different ids for each flight", async (done) => {
    const firstFlight = (await AdminFlightApi.addFlight(request)).data;

    const secondRequest = new AddFlightRequest(
      RIX,
      ARN,
      RYANAIR,
      moment(baseDateTime).add(1, "day"),
      moment(baseDateTime).add(2, "day")
    );

    const secondFlight = (await AdminFlightApi.addFlight(secondRequest)).data;

    expect(firstFlight.id).not.toBe(secondFlight.id);

    done();
  });

  it("should not be able to add same flight twice", async (done) => {
    const response = await AdminFlightApi.addFlight(request);
    expect(response.status).toBe(201);

    try {
      await AdminFlightApi.addFlight(request);
      done.fail();
    } catch (e) {
      expect(e.response.status).toBe(409);
    }
    done();
  });

  it("should not accept wrong values", async (done) => {
    const requests = [
      {
        from: null,
        to: null,
        carrier: null,
        departureTime: null,
        arrivalTime: null,
      },
      {
        from: RIX,
        to: null,
        carrier: RYANAIR,
        departureTime: formatDateTime(baseDateTime),
        arrivalTime: formatDateTime(moment(baseDateTime).add(1, "day")),
      },
      {
        from: RIX,
        to: DXB,
        carrier: null,
        departureTime: formatDateTime(baseDateTime),
        arrivalTime: formatDateTime(moment(baseDateTime).add(1, "day")),
      },
      {
        from: RIX,
        to: DXB,
        carrier: RYANAIR,
        departureTime: null,
        arrivalTime: formatDateTime(moment(baseDateTime).add(1, "day")),
      },
      {
        from: RIX,
        to: DXB,
        carrier: RYANAIR,
        departureTime: formatDateTime(baseDateTime),
        arrivalTime: null,
      },
      {
        from: RIX,
        to: DXB,
        carrier: "",
        departureTime: formatDateTime(baseDateTime),
        arrivalTime: formatDateTime(moment(baseDateTime).add(1, "day")),
      },
      {
        from: { country: null, city: null, airport: null },
        to: DXB,
        carrier: RYANAIR,
        departureTime: formatDateTime(baseDateTime),
        arrivalTime: formatDateTime(moment(baseDateTime).add(1, "day")),
      },
      {
        from: RIX,
        to: { country: null, city: null, airport: null },
        carrier: RYANAIR,
        departureTime: formatDateTime(baseDateTime),
        arrivalTime: formatDateTime(moment(baseDateTime).add(1, "day")),
      },
      {
        from: { country: "", city: "", airport: "" },
        to: DXB,
        carrier: RYANAIR,
        departureTime: formatDateTime(baseDateTime),
        arrivalTime: formatDateTime(moment(baseDateTime).add(1, "day")),
      },
      {
        from: RIX,
        to: { country: "", city: "", airport: "" },
        carrier: RYANAIR,
        departureTime: formatDateTime(baseDateTime),
        arrivalTime: formatDateTime(moment(baseDateTime).add(1, "day")),
      },
    ];

    await Promise.all(
      requests.map(async (it) => {
        try {
          await AdminFlightApi.addFlight(it as any);
          done.fail(`No error was thrown when adding ${JSON.stringify(it)}`);
        } catch (e) {
          expect(e.response.status).toBe(400);
        }
      })
    );

    done();
  });

  it("should fail on the same airports", async (done) => {
    const requests = [
      new AddFlightRequest(
        DXB,
        DXB,
        RYANAIR,
        moment(baseDateTime),
        moment(baseDateTime).add(1, "day")
      ),
      new AddFlightRequest(
        DXB,
        {
          airport: "dxb",
          city: DXB.city,
          country: DXB.country,
        },
        RYANAIR,
        moment(baseDateTime),
        moment(baseDateTime).add(1, "day")
      ),
      new AddFlightRequest(
        DXB,
        {
          airport: "DXB ",
          city: DXB.city,
          country: DXB.country,
        },
        RYANAIR,
        moment(baseDateTime),
        moment(baseDateTime).add(1, "day")
      ),
    ];

    await Promise.all(
      requests.map(async (it) => {
        try {
          await AdminFlightApi.addFlight(it);
          done.fail(`No error was thrown when adding ${JSON.stringify(it)}`);
        } catch (e) {
          expect(e.response.status).toBe(400);
        }
      })
    );

    done();
  });

  it("should fail on strange dates", async (done) => {
    const requests = [
      new AddFlightRequest(
        RIX,
        DXB,
        RYANAIR,
        moment(baseDateTime),
        moment(baseDateTime).subtract(100, "days")
      ),
      new AddFlightRequest(
        RIX,
        DXB,
        RYANAIR,
        moment(baseDateTime),
        moment(baseDateTime)
      ),
    ];

    await Promise.all(
      requests.map(async (it) => {
        try {
          await AdminFlightApi.addFlight(it);
          done.fail(`No error was thrown when adding ${JSON.stringify(it)}`);
        } catch (e) {
          expect(e.response.status).toBe(400);
        }
      })
    );

    done();
  });
});
