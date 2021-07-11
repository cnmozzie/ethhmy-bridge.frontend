import { Contract } from 'web3-eth-contract';
import { getAddress } from '@harmony-js/crypto';
import Web3 from 'web3';
import { mulDecimals } from '../../utils';
import { getGasPrice } from './helpers';
const BN = require('bn.js');

export interface IEthMethodsInitParams {
  web3: Web3;
  ethManagerContract: Contract;
  ethManagerAddress: string;
  gasPrice?: number;
}

export class EthMethodsERC20 {
  private web3: Web3;
  private ethManagerContract: Contract;
  private ethManagerAddress: string;
  gasPrice?: number;

  constructor(params: IEthMethodsInitParams) {
    this.web3 = params.web3;
    this.ethManagerContract = params.ethManagerContract;
    this.ethManagerAddress = params.ethManagerAddress;
    this.gasPrice = params.gasPrice;
  }

  approveEthManger = async (
    erc20Address,
    amount,
    decimals,
    sendTxCallback?,
  ) => {
    // @ts-ignore
    const accounts = await ethereum.enable();

    if (Number(amount) === 0) {
      sendTxCallback('skip');
      return;
    }

    const MyERC20Json = require('../out/MyERC20.json');
    const erc20Contract = new this.web3.eth.Contract(
      MyERC20Json.abi,
      erc20Address,
    );

    await erc20Contract.methods
      .approve(this.ethManagerAddress, mulDecimals(amount, decimals))
      .send({
        from: accounts[0],
        gas: process.env.ETH_GAS_LIMIT,
        gasPrice: this.gasPrice ? this.gasPrice : await getGasPrice(this.web3),
      })
      .on('transactionHash', hash => sendTxCallback(hash));
  };

  setApprovalForAllEthManger = async (erc20Address, sendTxCallback?) => {
    // @ts-ignore
    const accounts = await ethereum.enable();

    const MyERC20Json = require('../out/MyERC721.json');
    const erc20Contract = new this.web3.eth.Contract(
      MyERC20Json.abi,
      erc20Address,
    );

    let res = await erc20Contract.methods
      .isApprovedForAll(accounts[0], this.ethManagerAddress)
      .call();

    if (!res) {
      await erc20Contract.methods
        .setApprovalForAll(this.ethManagerAddress, true)
        .send({
          from: accounts[0],
          gas: process.env.ETH_GAS_LIMIT,
          gasPrice: await getGasPrice(this.web3),
        })
        .on('transactionHash', hash => sendTxCallback(hash));
    } else {
      sendTxCallback('skip');
    }
  };

  lockTokens = async (erc20Address, userAddr, amount, sendTxCallback?) => {
    // @ts-ignore
    const accounts = await ethereum.enable();

    const hmyAddrHex = getAddress(userAddr).checksum;

    const estimateGas = await this.ethManagerContract.methods
      .lockTokens(erc20Address, amount, hmyAddrHex)
      .estimateGas({ from: accounts[0] });

    const gasLimit = Math.max(
      estimateGas + estimateGas * 0.3,
      Number(process.env.ETH_GAS_LIMIT),
    );

    let transaction = await this.ethManagerContract.methods
      .lockTokens(erc20Address, amount, hmyAddrHex)
      .send({
        from: accounts[0],
        gas: new BN(gasLimit),
        gasPrice: await getGasPrice(this.web3),
      })
      .on('transactionHash', hash => sendTxCallback(hash));

    return transaction.events.Locked;
  };

  lockToken = async (
    userAddr,
    amount,
    decimals,
    sendTxCallback?,
  ) => {
    // @ts-ignore
    const accounts = await ethereum.enable();

    //const hmyAddrHex = getAddress(userAddr).checksum;

    const estimateGas = await this.ethManagerContract.methods
      .depositFor(mulDecimals(amount, decimals), userAddr)
      .estimateGas({ from: accounts[0] });

    const gasLimit = Math.max(
      estimateGas + estimateGas * 0.3,
      Number(process.env.ETH_GAS_LIMIT),
    );

    let transaction = await this.ethManagerContract.methods
      .depositFor(mulDecimals(amount, decimals), userAddr)
      .send({
        from: accounts[0],
        gas: new BN(gasLimit),
        gasPrice: this.gasPrice ? this.gasPrice : await getGasPrice(this.web3),
      })
      .on('transactionHash', hash => sendTxCallback(hash));

    return transaction.events.Locked;
  };

  checkEthBalance = async (erc20Address, addr) => {
    const MyERC20Json = require('../out/MyERC20.json');
    const erc20Contract = new this.web3.eth.Contract(
      MyERC20Json.abi,
      erc20Address,
    );

    return await erc20Contract.methods.balanceOf(addr).call();
  };

  tokenDetails = async erc20Address => {
    if (!this.web3.utils.isAddress(erc20Address)) {
      throw new Error('Invalid token address');
    }

    const MyERC20Json = require('../out/MyERC20.json');
    const erc20Contract = new this.web3.eth.Contract(
      MyERC20Json.abi,
      erc20Address,
    );

    const symbol = await erc20Contract.methods.symbol().call();

    let name = symbol;

    try {
      name = await erc20Contract.methods.name().call();
    } catch (e) {
      console.error(e);
    }

    const decimals = await erc20Contract.methods.decimals().call();

    return { name, symbol, decimals, erc20Address };
  };

  tokenDetailsERC721 = async erc20Address => {
    if (!this.web3.utils.isAddress(erc20Address)) {
      throw new Error('Invalid token address');
    }

    const MyERC20Json = require('../out/MyERC721.json');
    const erc20Contract = new this.web3.eth.Contract(
      MyERC20Json.abi,
      erc20Address,
    );

    const name = await erc20Contract.methods.name().call();
    const symbol = await erc20Contract.methods.symbol().call();
    // const decimals = await erc20Contract.methods.decimals().call();

    return { name, symbol, erc20Address };
  };

  allowance = async (addr: string, erc20Address: string) => {
    if (!this.web3.utils.isAddress(erc20Address)) {
      throw new Error('Invalid token address');
    }

    const MyERC20Json = require('../out/MyERC20.json');

    const erc20Contract = new this.web3.eth.Contract(
      MyERC20Json.abi,
      erc20Address,
    );

    let res;

    try {
      res = await erc20Contract.methods
        .allowance(addr, this.ethManagerAddress)
        .call();
    } catch (e) {
      console.error(e);
      debugger;
    }

    return res;
  };

  totalWithdrawals = async () => {

    let res;

    try {
      res = await this.ethManagerContract.methods
      .withdrawId()
      .call();
    } catch (e) {
      console.error(e);
      debugger;
    }

    return res;

  };

  lockNative = async (userAddr, amount, sendTxCallback?) => {
    // @ts-ignore
    const accounts = await ethereum.enable();

    const hmyAddrHex = getAddress(userAddr).checksum;

    const managerContract = new this.web3.eth.Contract(
      [
        {
          constant: false,
          inputs: [
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
          ],
          name: 'lockNative',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
      ],
      this.ethManagerAddress,
    );

    let response = await managerContract.methods
      .lockNative(mulDecimals(amount, 18), hmyAddrHex)
      .send({
        from: accounts[0],
        gas: process.env.ETH_GAS_LIMIT,
        gasPrice: await getGasPrice(this.web3),
        value: mulDecimals(amount, 18),
      })
      .on('transactionHash', hash => sendTxCallback(hash));

    return response;
  };
}
