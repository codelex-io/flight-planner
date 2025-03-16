import { CustomerFlightApi, TestApi, AdminFlightApi } from "../src";
import { RIX, ARN, DXB, DME } from "./fixture";

describe("Airport Typeahead", () => {
  beforeEach(() => TestApi.clearAirports());

  it("should search by incomplete phrases", async (done) => {
    const phrases = [
      "RIX",
      "rix",
      " RIx",
      "RI ",
      "Rig",
      "Latv",
      "Latvia",
      "Riga",
    ];

    await Promise.all([
      await AdminFlightApi.addAirport(DXB),
      await AdminFlightApi.addAirport(ARN),
      await AdminFlightApi.addAirport(RIX),
      await AdminFlightApi.addAirport(DME),
    ]);

    const responses = await Promise.all(
      phrases.map((it) => CustomerFlightApi.searchAirports(it))
    );

    responses.forEach((res) => {
      expect(res.status).toBe(200);
      expect(res.data).toEqual([RIX]);
    });
    done();
  });
});
