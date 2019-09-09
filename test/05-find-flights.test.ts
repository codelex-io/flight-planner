import { CustomerFlightApi, TestApi, AdminFlightApi } from "../src";
import { SearchFlightsRequest, PageResult, Flight } from "../src/api";
import { ARN, baseDate, DXB, FROM_RIGA_TO_STOCKHOLM, RIX } from "./fixture";

describe("Finding Flights", () => {
    beforeEach(() => TestApi.clear());

    it("should return no results when nothing found", async done => {
        const request = new SearchFlightsRequest(
            ARN.airport,
            DXB.airport,
            baseDate
        )

        const response = await CustomerFlightApi.searchFlights(request)

        expect(response.status).toBe(200)
        expect(response.data).toEqual({
            page: 0,
            totalItems: 0,
            items: []
        } as PageResult<Flight>)

        done()
    });

    it("should be able to find flight by id", async done => {
        const addedFlight = (await AdminFlightApi.addFlight(FROM_RIGA_TO_STOCKHOLM)).data

        const response = await CustomerFlightApi.findFlightById(addedFlight.id)

        expect(response.status).toBe(200)
        expect(response.data).toEqual(addedFlight)

        done()
    });

    it("should not find anything when non existing flight id passed", async done => {
        try {
            await CustomerFlightApi.findFlightById(666)
            done.fail()
        } catch (e) {
            expect(e.response.status).toBe(404)
            done()
        }
    });

    it("should handle invalid request properly", async done => {
        const requests = [
            { from: null, to: null, departureDate: null },
            { from: null, to: DXB, departureDate: baseDate },
            { from: RIX, to: null, departureDate: baseDate },
            { from: RIX, to: DXB, departureDate: null }
        ]

        await Promise.all(
            requests.map(async request => {
                try {
                    await CustomerFlightApi.searchFlights(request as any);
                    done.fail(`No error was thrown when adding ${JSON.stringify(it)}`);
                } catch (e) {
                    expect(e.response.status).toBe(400);
                }
            })
        );

        done();
    });

    it("should handle request where from & to are the same airports", async done => {
        const request = new SearchFlightsRequest(RIX.airport, RIX.airport, baseDate)

        try {
            await CustomerFlightApi.searchFlights(request);
            done.fail(`No error was thrown when adding ${JSON.stringify(it)}`);
        } catch (e) {
            expect(e.response.status).toBe(400);
            done();
        }
    });
});
