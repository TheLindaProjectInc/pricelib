import { ZeroAddress } from "ethers";
import MRXtoUSDOracle from "./MRXtoUSDOracle";
import { CONTRACTS } from "./constants";
import { NetworkType, Provider } from "@metrixcoin/metrilib";
import { Version } from "./types/Version";

const getPriceOracle = (
  network: NetworkType,
  provider: Provider,
  version: Version | undefined = "latest"
) => {
  if (
    CONTRACTS[version][network].MRXtoUSDOracle === ZeroAddress.replace("0x", "")
  ) {
    throw new Error(
      `No deployment found for version '${version}' on the ${network}`
    );
  }
  return new MRXtoUSDOracle(
    CONTRACTS[version][network].MRXtoUSDOracle,
    provider
  );
};

const getPriceOracleAddress = (
  network: NetworkType,
  version: Version | undefined = "latest"
) => {
  if (
    CONTRACTS[version][network].MRXtoUSDOracle === ZeroAddress.replace("0x", "")
  ) {
    throw new Error(
      `No deployment found for version '${version}' on the ${network}`
    );
  }
  return CONTRACTS[version][network].MRXtoUSDOracle;
};

export { MRXtoUSDOracle, getPriceOracle, getPriceOracleAddress };
