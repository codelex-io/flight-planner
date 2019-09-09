import { AxiosResponse } from "axios";
import { customerClient } from "./axios";
import { Airport, SearchFlightsRequest, PageResult, Flight } from "./api";

export class CustomerFlightApi {
    static async searchAirports(search: string): Promise<AxiosResponse<Airport[]>> {
        return customerClient.get('/airports', { params: { search } })
    }

    static async searchFlights(req: SearchFlightsRequest): Promise<AxiosResponse<PageResult<Flight>>> {
        return customerClient.post('/flights/search', req)
    }

    static async findFlightById(id: number): Promise<AxiosResponse<Flight>> {
        return customerClient.get(`/flights/${id}`)
    }
}