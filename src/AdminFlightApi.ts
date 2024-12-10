import { AxiosResponse } from "axios";
import { adminClient } from "./axios";
import { AddFlightRequest, Airport, Flight } from "./api";
import { AddAirportRequest } from "./api/AddAirportRequest";

export class AdminFlightApi {
  static async addFlight(
    req: AddFlightRequest
  ): Promise<AxiosResponse<Flight>> {
    return adminClient.post("/flights", req);
  }

  static async updateFlight(
    req: AddFlightRequest
  ): Promise<AxiosResponse<Flight>> {
    return adminClient.put("/flights", req);
  }

  static async fetchFlight(id: string): Promise<AxiosResponse<Flight>> {
    return adminClient.get(`/flights/${id}`);
  }

  static deleteFlight(id: string): Promise<AxiosResponse<void>> {
    return adminClient.delete(`/flights/${id}`);
  }

  static async addAirport(
    req: AddAirportRequest
  ): Promise<AxiosResponse<Airport>> {
    return adminClient.post("/airports", req);
  }

  static async updateAirport(
    req: AddAirportRequest
  ): Promise<AxiosResponse<Airport>> {
    return adminClient.put("/airports", req);
  }

  static async fetchAirport(id: string): Promise<AxiosResponse<Airport>> {
    return adminClient.get(`/airports/${id}`);
  }

  static deleteAirport(id: string): Promise<AxiosResponse<void>> {
    return adminClient.delete(`/airports/${id}`);
  }
}
