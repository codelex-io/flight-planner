import { AxiosBasicCredentials } from "axios";
import { AdminFlightApi, adminClient } from "../src";

describe("Admin Auth", () => {
  it("should not be able to access flights with wrong password", async done => {
    const wrongAuth: AxiosBasicCredentials = {
      username: "admin",
      password: "00000000"
    };

    try {
      await adminClient.get(`/flights/123`, { auth: wrongAuth });
    } catch (e) {
      expect(e.response.status).toBe(401);
      done();
    }
  });

  it("should be able to access flights with correct password", async done => {
    try {
      await AdminFlightApi.fetchFlight(123);
    } catch (e) {
      expect(e.response.status).toBe(404);
      done();
    }
  });
});
