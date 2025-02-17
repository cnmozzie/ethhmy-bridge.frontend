export enum NETWORK_TYPE {
  ETHEREUM = 'ETHEREUM',
  BINANCE = 'BINANCE',
}

export enum EXCHANGE_MODE {
  ETH_TO_ONE = 'eth_to_one',
  ONE_TO_ETH = 'one_to_eth',
}

export enum TOKEN {
  BUSD = 'busd',
  LINK = 'link',
  ERC20 = 'erc20',
  HRC20 = 'hrc20',
  ETH = 'eth',
  ONE = 'one',
  ERC721 = 'erc721',
}

export type TConfig = {
  nodeURL: string;
  explorerURL: string;
  tokens: TOKEN[];
  contracts: {
    busd: string;
    link: string;
    busdManager: string;
    linkManager: string;
    erc20Manager: string;
    erc721Manager: string;
    multisigWallet: string;
    tokenManager: string;
    hrc20Manager: string;
    ethManager: string;
    nativeTokenHRC20: string;
  };
  gasPrice?: number;
  gasLimit?: number;
  network? : string;
};

export type TFullConfig = {
  ethClient: TConfig;
  binanceClient: TConfig;
  hmyClient: TConfig;
};

export enum ACTION_TYPE {
  // ALL
  'depositOne' = 'depositOne',
  'withdrawOne' = 'withdrawOne',

  // ETH_TO_ONE
  'getHRC20Address' = 'getHRC20Address',
  'approveEthManger' = 'approveEthManger',
  'lockToken' = 'lockToken',
  'waitingBlockNumber' = 'waitingBlockNumber',
  'mintToken' = 'mintToken',
  'mintTokenRollback' = 'mintTokenRollback',

  // ONE_TO_ETH
  'approveHmyManger' = 'approveHmyManger',
  'burnToken' = 'burnToken',
  'waitingBlockNumberHarmony' = 'waitingBlockNumberHarmony',
  'unlockToken' = 'unlockToken',
  'unlockTokenRollback' = 'unlockTokenRollback',

  // HRC20
  'approveHRC20HmyManger' = 'approveHRC20HmyManger',
  'approveHRC20EthManger' = 'approveHRC20EthManger',
  'getERC20Address' = 'getERC20Address',
  'lockHRC20Token' = 'lockHRC20Token',
  'unlockHRC20Token' = 'unlockHRC20Token',
  'burnHRC20Token' = 'burnHRC20Token',
  'mintHRC20Token' = 'mintHRC20Token',
  'unlockHRC20TokenRollback' = 'unlockHRC20TokenRollback',
  'mintHRC20TokenRollback' = 'mintHRC20TokenRollback',
}

export enum STATUS {
  ERROR = 'error',
  SUCCESS = 'success',
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  CANCELED = 'canceled',
}

export interface IAction {
  id: string;
  type: ACTION_TYPE;
  status: STATUS;
  transactionHash: string;
  error: string;
  message: string;
  timestamp: number;
  depositAmount?: number;
  payload: any;
}

export interface IOperation {
  id: string;
  type: EXCHANGE_MODE;
  token: TOKEN;
  status: STATUS;
  amount: number;
  fee: number;
  ethAddress: string;
  oneAddress: string;
  actions: Array<IAction>;
  timestamp: number;
  erc20Address?: string;
  hrc20Address?: string;
  network: NETWORK_TYPE;
}

export interface ITokenInfo {
  name: string;
  symbol: string;
  decimals: string;
  erc20Address: string;
  hrc20Address: string;
  totalSupply: string;
  totalLockedNormal: string;
  totalLockedUSD: string;
  token: TOKEN;
  network: NETWORK_TYPE;
}
