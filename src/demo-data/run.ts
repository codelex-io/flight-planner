import { generateAddFlightRequests } from "./generator";
import { AdminFlightApi } from "../AdminFlightApi";

generateAddFlightRequests(1000)
  .then(requests => Promise.all(requests.map(AdminFlightApi.addFlight)))
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
