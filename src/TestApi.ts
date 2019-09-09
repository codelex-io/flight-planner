import { AxiosResponse } from "axios";
import { testingClient } from "./axios";

export class TestApi {
  static async clear(): Promise<AxiosResponse<void>> {
    return testingClient.post("/clear");
  }
}
