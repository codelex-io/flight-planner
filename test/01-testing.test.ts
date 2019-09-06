import { TestApi } from "../src";

describe("Testing", () => {
  it("should clear flights", async done => {
    const response = await TestApi.clearFlights();
    expect(response.status).toBe(200);

    done();
  });
});
