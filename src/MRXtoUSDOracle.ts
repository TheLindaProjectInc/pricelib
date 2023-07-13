import {MetrixContract, Provider, Transaction} from '@metrixcoin/metrilib';

import {MRXtoUSDOracle as ABI} from './abi/MRXtoUSDOracle';
import {ZeroAddress} from 'ethers';

export default class MRXtoUSDOracle extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI);
  }

  /**
   * Return whether an address is a controller of this contract
   * @param address the EVM address to check
   * @returns {Promise<boolean>} whether the address is a controller
   */
  async controllers(address: string): Promise<boolean> {
    const isController = await this.call('controllers(address)', [address]);
    return isController && isController.toString() === 'true' ? true : false;
  }

  /**
   * Return the last time as seconds since the unix epoch that the price was updated
   * @returns {Promise<bigint>} the price in MRX satoshi per USD
   */
  async lastUpdate(): Promise<bigint> {
    const lastUpdate = await this.call('lastUpdate()', []);
    return lastUpdate ? BigInt(lastUpdate.toString()) : BigInt(0);
  }

  /**
   * Get the contract owner
   * @returns {Promise<string>} the EVM style address of the owner of this contract
   */
  async owner(): Promise<string> {
    const o = await this.call('owner()', []);
    return o ? o.toString() : ZeroAddress;
  }

  /**
   * Return the price in MRX satoshi to reserve the name
   * @param name the name to be reserved
   * @param expiry the current expiry of the name
   * @param duration the duration to reserve the name
   * @returns {Promise<bigint>} the price in MRX satoshi of the name
   */
  async price(name: string, expiry: bigint, duration: bigint): Promise<bigint> {
    const p = await this.call('price(string,uint256,uint256)', [
      name,
      `0x${expiry.toString(16)}`,
      `0x${duration.toString(16)}`,
    ]);
    return p ? BigInt(p.toString()) : BigInt('3000000000000000000');
  }

  /**
   * Return a price history chunk (roughly 1 per hour)
   * @param startIndex the current expiry of the name
   * @param chunkSize the duration to reserve the name
   * @returns {Promise<[value: bigint, blockNumber: bigint, timestamp: bigint][]>} an array tuples of the price data
   */
  async priceHistory(
    startIndex: bigint,
    chunkSize: bigint
  ): Promise<[value: bigint, blockNumber: bigint, timestamp: bigint][]> {
    const prices = await this.call('priceHistory(uint256,uint16)', [
      `0x${startIndex.toString(16)}`,
      `0x${chunkSize.toString(16)}`,
    ]);
    const history: [value: bigint, blockNumber: bigint, timestamp: bigint][] =
      [];
    if (prices && prices.length > 0) {
      for (const data of prices[0]) {
        if (data.length === 3) {
          const tup: [value: bigint, blockNumber: bigint, timestamp: bigint] = [
            data[0],
            data[1],
            data[2],
          ];
          history.push(tup);
        }
      }
    }
    return history;
  }

  /**
   * Returns the index of the last price submitted to the mapping
   * @returns {Promise<bigint>}
   */
  async priceIndex(): Promise<bigint> {
    const u = await this.call('priceIndex()', []);
    return u ? BigInt(u.toString()) : BigInt(0);
  }

  /**
   * Return past 24 price history entries (roughly 1 per hour)
   * @returns {Promise<[value: bigint, blockNumber: bigint, timestamp: bigint][]>} an array tuples of the price data
   */
  async recentPriceHistory(): Promise<
    [value: bigint, blockNumber: bigint, timestamp: bigint][]
  > {
    const prices = await this.call('recentPriceHistory()', []);
    const history: [value: bigint, blockNumber: bigint, timestamp: bigint][] =
      [];
    if (prices && prices.length > 0) {
      for (const data of prices[0]) {
        if (data.length === 3) {
          const tup: [value: bigint, blockNumber: bigint, timestamp: bigint] = [
            data[0],
            data[1],
            data[2],
          ];
          history.push(tup);
        }
      }
    }
    return history;
  }

  /**
   * Renounce ownership of the contract
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async renounceOwnership(): Promise<Transaction> {
    const tx = await this.send('renounceOwnership()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts,
    };
  }

  /**
   * Sets the new price based on the 7 hour average of the price. Only executable by a controller
   * @param price
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async setAveragePricing(price: bigint): Promise<Transaction> {
    const tx = await this.send('setAveragePricing(uint256)', [
      `0x${price.toString(16)}`,
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts,
    };
  }

  /**
   * Sets the controller of the contract
   * @param controller the controller
   * @param isController whether they can control
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async setController(
    controller: string,
    isController: boolean
  ): Promise<Transaction> {
    const tx = await this.send('setController(address,bool)', [
      controller,
      isController,
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts,
    };
  }

  /**
   * Set the price of MRX per USD
   * @param price the price in MRX satoshi
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async setPrice(price: bigint): Promise<Transaction> {
    const tx = await this.send('setPrice(uint256)', [
      `0x${price.toString(16)}`,
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts,
    };
  }

  /**
   * Transfer ownership of this contract
   * @param address the EVM adddress of the receiver
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async transferOwnership(address: string): Promise<Transaction> {
    const tx = await this.send('transferOwnership(address)', [address]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts,
    };
  }

  /**
   * Returns the last time as seconds since the unix epoch the price was update
   * @returns {Promise<bigint>}
   */
  async updated(): Promise<bigint> {
    const u = await this.call('updated()', []);
    return u ? BigInt(u.toString()) : BigInt(0);
  }

  /**
   * Returns the price in MRX satoshi per USD
   * @returns {Promise<bigint>}
   */
  async value(): Promise<bigint> {
    const v = await this.call('value()', []);
    return v ? BigInt(v.toString()) : BigInt(0);
  }
}
