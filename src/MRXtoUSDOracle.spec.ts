import {getPriceOracle} from './index';
import {APIProvider} from '@metrixcoin/metrilib';
import {equal, notEqual} from 'assert';

const provider = new APIProvider('MainNet');

const oracle = getPriceOracle('MainNet', provider);

describe('MRXtoUSDOracle tests', () => {
  it('Can get the value', async () => {
    const value = await oracle.value();
    notEqual(value, BigInt(0));
  });
  it('Can get the last update', async () => {
    const update = await oracle.lastUpdate();
    notEqual(update, BigInt(0));
  });
  it('Can get the recent history', async () => {
    const history = await oracle.recentPriceHistory();
    notEqual(history.length, 0);
  });
  it('Can get a chunk of one from the history', async () => {
    const history = await oracle.priceHistory(BigInt(0), BigInt(1));
    equal(history.length, 1);
  });
});
