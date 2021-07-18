import * as agent from 'superagent';
import Web3 from 'web3';
import { divDecimals, mulDecimals } from '../../utils';
const BN = require('bn.js');

export const getGasPrice = async (web3: Web3) => {
  const gasPrice = new BN(await web3.eth.getGasPrice()).mul(new BN(1));

  let gasPriceApi = 0;

  try {
    const info = await agent.get(
      `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=${process.env.ETH_GAS_API_KEY}`,
    );

    gasPriceApi = mulDecimals(info.body.average, 8);
  } catch (e) {
    console.error('Error get gas price');
  }

  console.log(gasPrice/1000000000, gasPriceApi/1000000000)

  const res = gasPrice.lt(gasPriceApi) ? gasPriceApi : gasPrice;

  return res;
};

export const getMaticGasPrice = async () => {
  let res = await fetch('https://gasstation-mainnet.matic.network')
  let json = await res.json()
  let gasPrice = Math.floor(json.standard*1000000000)

  return gasPrice;
};

export const getNetworkFee = async (web3: Web3) => {
  const gasPrice = await getGasPrice(web3);
  const gasLimit = new BN(50000);

  const fee = gasLimit.mul(gasPrice).mul(new BN(2));

  return Number(divDecimals(fee, 18));
};
