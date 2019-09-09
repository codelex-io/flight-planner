import moment from 'moment';
import _ from 'lodash'
import { TestApi, AdminFlightApi, CustomerFlightApi } from "../src";
import { randomAddFlightRequest, init } from '../src/demo-data/generator';
import { SearchFlightsRequest } from '../src/api';

describe("Concurrency Handling", () => {
    beforeAll(() => init())

    beforeEach(() => TestApi.clear());

    it("should handle concurrent adding & deleting", async done => {
        await Promise.all(_.range(0, 100).map(async () => {
            const request = randomAddFlightRequest()
            const response = await AdminFlightApi.addFlight(request)
            if (response.status === 201) {
                await AdminFlightApi.deleteFlight(response.data.id)
            }
        }))

        done()
    }, 60000);

    it("should not be able to add the same flight twice", async done => {
        const request = randomAddFlightRequest()

        await Promise.all(_.range(0, 100).map(async () => {
            try {
                await AdminFlightApi.addFlight(request)
            } catch (ignored) {
            }
        }))

        const response = await CustomerFlightApi.searchFlights(new SearchFlightsRequest(
            request.from.airport,
            request.to.airport,
            moment(request.departureTime)
        ))

        expect(response.data.totalItems).toBe(1)

        done()
    }, 60000);
});
