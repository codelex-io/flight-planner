import { AxiosResponse } from "axios";
import { testingClient } from "./axios";

export class TestApi {
  static async clearFlights(): Promise<AxiosResponse<void>> {
    return testingClient.post("/clear");
  }
}
