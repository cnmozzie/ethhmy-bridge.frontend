import { NETWORK_TYPE, TOKEN } from '../interfaces';
import * as contract from '../../blockchain-bridge';
import { getExNetworkMethods, getMaticNetworkMethods } from '../../blockchain-bridge';

export const getContractMethods = (
  token: TOKEN,
  network: NETWORK_TYPE,
  isMetamask: boolean,
) => {
  let ethMethods, hmyMethods;

  const exNetwork = getExNetworkMethods();
  const maticNetwork = getMaticNetworkMethods();

  ethMethods = exNetwork.ethMethodsERC20;
  hmyMethods = maticNetwork.ethMethodsERC20; //cheat it

  return { ethMethods, hmyMethods };
};
