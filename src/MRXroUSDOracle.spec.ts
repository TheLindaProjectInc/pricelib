import MRXtoUSDOracle from "./MRXtoUSDOracle";
import { APIProvider } from "@metrixcoin/metrilib";
import { equal, notEqual } from "assert";

const provider = new APIProvider("MainNet");

const address = "01450fd5616303e269088c981206fc45e4dde1ce";

const oracle = new MRXtoUSDOracle(address, provider);

describe("MRXtoUSDOracle tests", () => {
  it("Can get the value", async () => {
    const value = await oracle.value();
    notEqual(value, BigInt(0));
  });
  it("Can get the last update", async () => {
    const update = await oracle.lastUpdate();
    notEqual(update, BigInt(0));
  });
  it("Can get the recent history", async () => {
    const history = await oracle.recentPriceHistory();
    notEqual(history.length, 0);
  });
  it("Can get a chunk of one from the history", async () => {
    const history = await oracle.priceHistory(BigInt(0), BigInt(1));
    equal(history.length, 1);
  });
});
