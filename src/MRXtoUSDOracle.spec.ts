import {getPriceOracle} from './index';
import {APIProvider} from '@metrixcoin/metrilib';
import {equal, notEqual} from 'assert';

const provider = new APIProvider('MainNet');

const oracle = getPriceOracle('MainNet', provider);

describe('MRXtoUSDOracle tests', () => {
  it('Can get the value', async () => {
    const value = await oracle.value();
    notEqual(value, BigInt(0));
  }).timeout(60000);
  it('Can get the last update', async () => {
    const update = await oracle.lastUpdate();
    notEqual(update, BigInt(0));
  }).timeout(60000);
  it('Can get the recent history', async () => {
    const history = await oracle.recentPriceHistory();
    notEqual(history.length, 0);
  }).timeout(60000);
  it('Can get a chunk of one from the history', async () => {
    const history = await oracle.priceHistory(BigInt(0), BigInt(1));
    equal(history.length, 1);
  }).timeout(60000);

  it('Can get a chunk of one from the history', async () => {
    const index = await oracle.priceIndex();
    let history: [value: bigint, blockNumber: bigint, timestamp: bigint][] = [];
    if (index >= 7 * 24) {
      history = await oracle.priceHistory(
        index - BigInt(7 * 24),
        BigInt(7 * 24)
      );
    } else {
      history = await oracle.priceHistory(BigInt(0), index + BigInt(1));
    }
    console.log(
      JSON.stringify(
        history,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
    );
    notEqual(history.length, 0);
  }).timeout(60000);
});
