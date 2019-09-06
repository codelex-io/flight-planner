import { AxiosResponse } from "axios";
import { adminClient } from "./axios";
import { AddFlightRequest, Flight } from "./api";

export class AdminFlightApi {
  static async addFlight(
    req: AddFlightRequest
  ): Promise<AxiosResponse<Flight>> {
    return adminClient.put("/flights", req);
  }

  static async fetchFlight(id: number): Promise<AxiosResponse<Flight>> {
    return adminClient.get(`/flights/${id}`);
  }

  static deleteFlight(id: number): Promise<AxiosResponse<void>> {
    return adminClient.delete(`/flights/${id}`);
  }
}
