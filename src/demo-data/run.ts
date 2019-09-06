import { generateAddFlightRequests } from "./generator";
import { AdminFlightApi } from "../AdminFlightApi";

generateAddFlightRequests(100)
  .then(requests => Promise.all(requests.map(AdminFlightApi.addFlight)))
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
