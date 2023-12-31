import Deployment from "../interfaces/Deployment";
import { contracts as MainNet } from "../network/1.0.0/MainNet";
import { contracts as TestNet } from "../network/1.0.0/TestNet";

export const CONTRACTS = {
  "1.0.0": {
    MainNet: MainNet as Deployment,
    TestNet: TestNet as Deployment,
  },
  latest: {
    MainNet: MainNet as Deployment,
    TestNet: TestNet as Deployment,
  },
};
