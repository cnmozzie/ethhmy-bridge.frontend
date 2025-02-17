import { ACTION_TYPE, NETWORK_TYPE, TOKEN, EXCHANGE_MODE } from 'stores/interfaces';

export const getStepsTitle = (
  action: ACTION_TYPE,
  token: TOKEN,
  network: NETWORK_TYPE,
  mode: EXCHANGE_MODE
) => {
  if (token === TOKEN.ERC721 && action === ACTION_TYPE.getHRC20Address) {
    return 'Register user ERC72 on Harmony';
  }

  if (mode == EXCHANGE_MODE.ONE_TO_ETH) {
    return STEPS_TITLE_MATIC[action];
  }
  else {
    switch (network) {
      case NETWORK_TYPE.ETHEREUM:
        return STEPS_TITLE_ETHEREUM[action];
      case NETWORK_TYPE.BINANCE:
        return STEPS_TITLE_BINANCE[action];
      default:
        return STEPS_TITLE_ETHEREUM[action];
    }
  }

  
};

const STEPS_TITLE_BINANCE: Record<ACTION_TYPE, string> = {
  depositOne: 'Deposit ONE tokens',
  withdrawOne: 'Withdraw ONE tokens',

  getHRC20Address: 'Checking Loser Bridge status',
  approveEthManger: 'User approve bridge to lock tokens ',
  lockToken: 'Bridge lock tokens on Binance Smart Chain',
  waitingBlockNumber: 'Wait for 3 block confirmations',
  mintToken: 'Bridge mint tokens on Matic',
  mintTokenRollback: 'Unlock failed, minting back the burned tokens on Matic',

  // ONE TO ETH
  approveHmyManger: 'User approve bridge to burn tokens',
  burnToken: 'Bridge burn tokens on Matic',
  waitingBlockNumberHarmony: 'Wait for 3 block confirmations',
  unlockToken: 'Bridge unlocks tokens on Binance Smart Chain',
  unlockTokenRollback: 'Mint failed, unlocking tokens on Binance Smart Chain',

  // HRC20
  approveHRC20HmyManger: 'User approve bridge to lock tokens',
  approveHRC20EthManger: 'User approve bridge to burn tokens',
  getERC20Address: 'Register user HRC20 on Binance Smart Chain',
  lockHRC20Token: 'Bridge lock tokens on Harmony',
  unlockHRC20Token: 'Bridge unlocks tokens on Harmony',
  burnHRC20Token: 'Bridge burn tokens on Binance Smart Chain',
  mintHRC20Token: 'Bridge mint tokens on Binance Smart Chain',
  unlockHRC20TokenRollback: 'Mint failed, unlocking tokens on Harmony',
  mintHRC20TokenRollback:
    'Unlock failed, minting back the burned tokens on Binance Smart Chain',
};

const STEPS_TITLE_MATIC: Record<ACTION_TYPE, string> = {
  depositOne: 'Deposit ONE tokens',
  withdrawOne: 'Withdraw ONE tokens',

  getHRC20Address: 'Checking Loser Bridge status',
  approveEthManger: 'User approve bridge to lock tokens ',
  lockToken: 'Bridge lock tokens on Matic',
  waitingBlockNumber: 'Wait for 3 block confirmations',
  mintToken: 'Bridge mint tokens on Binance Smart Chain',
  mintTokenRollback: 'Unlock failed, minting back the burned tokens on Binance Smart Chain',

  // ONE TO ETH
  approveHmyManger: 'User approve bridge to burn tokens',
  burnToken: 'Bridge burn tokens on Matic',
  waitingBlockNumberHarmony: 'Wait for 3 block confirmations',
  unlockToken: 'Bridge unlocks tokens on Binance Smart Chain',
  unlockTokenRollback: 'Mint failed, unlocking tokens on Binance Smart Chain',

  // HRC20
  approveHRC20HmyManger: 'User approve bridge to lock tokens',
  approveHRC20EthManger: 'User approve bridge to burn tokens',
  getERC20Address: 'Register user HRC20 on Binance Smart Chain',
  lockHRC20Token: 'Bridge lock tokens on Harmony',
  unlockHRC20Token: 'Bridge unlocks tokens on Harmony',
  burnHRC20Token: 'Bridge burn tokens on Binance Smart Chain',
  mintHRC20Token: 'Bridge mint tokens on Binance Smart Chain',
  unlockHRC20TokenRollback: 'Mint failed, unlocking tokens on Harmony',
  mintHRC20TokenRollback:
    'Unlock failed, minting back the burned tokens on Binance Smart Chain',
};

const STEPS_TITLE_ETHEREUM: Record<ACTION_TYPE, string> = {
  depositOne: 'Deposit ONE tokens',
  withdrawOne: 'Withdraw ONE tokens',

  getHRC20Address: 'Register user ERC20 on Harmony',
  approveEthManger: 'User approve bridge to lock tokens ',
  lockToken: 'Bridge lock tokens on Ethereum',
  waitingBlockNumber: 'Wait for 13 block confirmations',
  mintToken: 'Bridge mint tokens on Harmony',
  mintTokenRollback: 'Unlock failed, minting back the burned tokens on Harmony',

  // ONE TO ETH
  approveHmyManger: 'User approve bridge to burn tokens',
  burnToken: 'Bridge burn tokens on Harmony',
  waitingBlockNumberHarmony: 'Wait for 13 block confirmations',
  unlockToken: 'Bridge unlocks tokens on Ethereum',
  unlockTokenRollback: 'Mint failed, unlocking tokens on Ethereum',

  // HRC20
  approveHRC20HmyManger: 'User approve bridge to lock tokens',
  approveHRC20EthManger: 'User approve bridge to burn tokens',
  getERC20Address: 'Register user HRC20 on Ethereum',
  lockHRC20Token: 'Bridge lock tokens on Harmony',
  unlockHRC20Token: 'Bridge unlocks tokens on Harmony',
  burnHRC20Token: 'Bridge burn tokens on Ethereum',
  mintHRC20Token: 'Bridge mint tokens on Ethereum',
  unlockHRC20TokenRollback: 'Mint failed, unlocking tokens on Harmony',
  mintHRC20TokenRollback:
    'Unlock failed, minting back the burned tokens on Ethereum',
};
