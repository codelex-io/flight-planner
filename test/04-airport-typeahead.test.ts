import moment from "moment";
import { CustomerFlightApi, TestApi, AdminFlightApi } from "../src";
import { AddFlightRequest, Airport } from "../src/api";
import { RIX, ARN, RYANAIR, baseDateTime, DXB, DME } from "./fixture";

describe("Airport Typeahead", () => {
    beforeEach(() => TestApi.clear());

    it("should search by incomplete phrases", async done => {
        const flight1 = new AddFlightRequest(
            RIX,
            ARN,
            RYANAIR,
            baseDateTime,
            moment(baseDateTime).add(1, "day")
        );

        const flight2 = new AddFlightRequest(
            DXB,
            ARN,
            RYANAIR,
            baseDateTime,
            moment(baseDateTime).add(1, "day")
        );

        const flight3 = new AddFlightRequest(
            DME,
            ARN,
            RYANAIR,
            baseDateTime,
            moment(baseDateTime).add(1, "day")
        );

        const phrases = [
            "RIX",
            "rix",
            " RIx",
            "RI ",
            "Rig",
            "Latv",
            "Latvia",
            "Riga"
        ];

        await Promise.all([
            await AdminFlightApi.addFlight(flight1),
            await AdminFlightApi.addFlight(flight2),
            await AdminFlightApi.addFlight(flight3)
        ])

        const responses = await Promise.all(phrases.map(it => CustomerFlightApi.searchAirports(it)))

        responses.forEach(res => {
            expect(res.status).toBe(200)
            expect(res.data).toEqual([RIX])
        })
        done()
    });
});
