import { AxiosResponse } from "axios";
import { testingClient } from "./axios";

export class TestApi {
  static async clearFlights(): Promise<AxiosResponse<void>> {
    return testingClient.post("/flights/clear");
  }

  static async clearAirports(): Promise<AxiosResponse<void>> {
    return testingClient.post("/airports/clear");
  }
}
