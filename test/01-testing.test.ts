import { TestApi } from "../src";

describe("Testing", () => {
  it("should clear flights", async (done) => {
    const response = await TestApi.clearFlights();
    expect(response.status).toBe(200);

    done();
  });

  it("should clear airports", async (done) => {
    const response = await TestApi.clearAirports();
    expect(response.status).toBe(200);

    done();
  });
});
