import * as React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { Icon, Text, Title } from 'components/Base';
import { SliceTooltip } from 'ui';
import cn from 'classnames';
import * as styles from './wallet-balances.styl';
import { formatWithSixDecimals, ones, truncateAddressString } from 'utils';
import { useStores } from '../../stores';
import { AuthWarning } from '../../components/AuthWarning';
import { NETWORK_TYPE, TOKEN } from '../../stores/interfaces';
import { getBech32Address } from '../../blockchain-bridge';
import { WalletButton } from './WalletButton';
import {
  NETWORK_BASE_TOKEN,
  NETWORK_ICON,
  NETWORK_NAME,
} from '../../stores/names';
import { AddTokenIcon } from '../../ui/AddToken';

const AssetRow = observer<any>(props => {
  const { exchange, userMetamask } = useStores();

  return (
    <Box
      className={cn(
        styles.walletBalancesRow,
        props.last ? '' : styles.underline,
      )}
    >
      <Box direction="row" align="center" justify="center">
        <Text color={props.selected ? '#00ADE8' : null} bold={false}>
          <SliceTooltip value={props.asset} maxLength={18} />
        </Text>
        {props.link ? (
          <a
            href={props.link}
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <Icon
              glyph="ExternalLink"
              style={{ width: 14, margin: '0 5px 2px 10px' }}
            />
          </a>
        ) : null}
        {props.metamask && userMetamask.erc20TokenDetails ? (
          <AddTokenIcon
            hrc20Address={props.metamask}
            symbol={userMetamask.erc20TokenDetails.symbol}
            decimals={userMetamask.erc20TokenDetails.decimals}
            network={exchange.network}
          />
        ) : null}
      </Box>

      <Box direction="column" align="end">
        <Box className={styles.priceColumn}>
          <Text color={props.selected ? '#00ADE8' : null} bold={true}>
            {props.value}
          </Text>
        </Box>
      </Box>
    </Box>
  );
});

export const WalletBalances = observer(() => {
  const { userMatic, userMetamask, actionModals, exchange } = useStores();

  const isEthereumNetwork = exchange.network === NETWORK_TYPE.ETHEREUM;

  const externalNetworkName = NETWORK_NAME[exchange.network];
  const externalNetworkIcon = NETWORK_ICON[exchange.network];
  const externalNetworkToken = NETWORK_BASE_TOKEN[exchange.network];

  const externalSubNetworkName =
    exchange.network === NETWORK_TYPE.ETHEREUM
      ? process.env.NETWORK === 'mainnet'
        ? 'mainnet'
        : 'kovan'
      : process.env.NETWORK === 'mainnet'
      ? 'mainnet'
      : 'testnet';

  return (
    <Box
      direction="column"
      className={styles.walletBalances}
      margin={{ vertical: 'medium' }}
    >
      {/*<Title>Wallet Info</Title>*/}

      <Box className={styles.container}>
        <Box direction="column" margin={{ bottom: 'large' }}>
          <Box
            direction="row"
            align="center"
            justify="between"
            margin={{ bottom: 'xsmall' }}
          >
            <Box direction="column" align="center">
              <Box direction="row" align="center">
                <img
                  className={styles.imgToken}
                  style={{ height: 20 }}
                  src={isEthereumNetwork ? '/eth.svg' : '/binance.png'}
                />
                <Title margin={{ right: 'xsmall' }}>
                  {externalNetworkName}
                </Title>
              </Box>
              <Text style={{ marginTop: 0 }}>
                network: {externalSubNetworkName}
              </Text>
            </Box>

            {userMetamask.isAuthorized && (
              <Box
                direction="row"
                align="center"
                pad={{ horizontal: 'small', vertical: 'xxsmall' }}
                style={{
                  border: '1px solid #dedede',
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  userMetamask.signOut();
                }}
              >
                {userMetamask.isAuthorized && (
                  <>
                    <img
                      src="/metamask.svg"
                      style={{ marginTop: -2, marginRight: 5, height: 20 }}
                    />
                    <Text margin={{ right: '10px' }}>Metamask</Text>
                  </>
                )}

                <Icon
                  glyph="Logout"
                  size="24px"
                  style={{ opacity: 0.5 }}
                  color="BlackTxt"
                />
              </Box>
            )}
          </Box>

          {userMetamask.isAuthorized ? (
            !userMetamask.isNetworkActual ? (
              <Box>
                <Text>
                  You have authorised with Metamask, but the selected network
                  does not match{' '}
                  <span style={{ color: 'rgb(0, 173, 232)' }}>
                    {externalNetworkName}: {externalSubNetworkName}
                  </span>
                  . Please change network to {externalSubNetworkName} for
                  transfer {externalNetworkName} -> Matic with Metamask.
                </Text>
              </Box>
            ) : (
              <>
                <AssetRow
                  asset={`${externalNetworkToken} Address`}
                  value={truncateAddressString(userMetamask.ethAddress)}
                />

                <AssetRow
                  asset={externalNetworkToken}
                  value={formatWithSixDecimals(userMetamask.ethBalance)}
                  selected={exchange.token === TOKEN.ETH}
                />

              </>
            )
          ) : (
            <WalletButton
              onClick={() => {
                userMetamask.signIn();
              }}
              error={userMetamask.error}
            >
              <img
                src="/metamask.svg"
                style={{ marginRight: 15, height: 22 }}
              />
              Metamask
            </WalletButton>
          )}
        </Box>

        <Box direction="column" margin={{ bottom: 'large' }}>
          <Box
            direction="row"
            align="center"
            justify="between"
            margin={{ bottom: 'xsmall' }}
          >
            <Box direction="column" align="center">
              <Box direction="row" align="center">
                <img
                  className={styles.imgToken}
                  style={{ height: 20 }}
                  src='/polygon-matic.jpg'
                />
                <Title margin={{ right: 'xsmall' }}>
                  Matic
                </Title>
              </Box>
              <Text style={{ marginTop: 0 }}>
                network:{' '}
                {process.env.NETWORK === 'mainnet' ? 'mainnet' : 'mumbai'}
              </Text>
            </Box>

            {userMatic.isAuthorized && (
              <Box
                direction="row"
                align="center"
                pad={{ horizontal: 'small', vertical: 'xxsmall' }}
                style={{
                  border: '1px solid #dedede',
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  userMatic.signOut();
                }}
              >
                {userMatic.isAuthorized && (
                  <>
                    <img
                      src="/metamask.svg"
                      style={{ marginTop: -2, marginRight: 5, height: 20 }}
                    />
                    <Text margin={{ right: '10px' }}>Metamask</Text>
                  </>
                )}

                <Icon
                  glyph="Logout"
                  size="24px"
                  style={{ opacity: 0.5 }}
                  color="BlackTxt"
                />
              </Box>
            )}
          </Box>

          {userMatic.isAuthorized ? (
            !userMatic.isNetworkActual ? (
              <Box>
                <Text>
                  You have authorised with Metamask, but the selected network
                  does not match{' '}
                  <span style={{ color: 'rgb(0, 173, 232)' }}>
                    Matic:{' '}
                    {process.env.NETWORK === 'mainnet' ? 'mainnet' : 'mumbai'}
                  </span>
                  . Please change network to {process.env.NETWORK === 'mainnet' ? 'mainnet' : 'mumbai'} for
                  transfer Matic -> {externalNetworkName} with Metamask.
                </Text>
              </Box>
            ) : (
              <>
                <AssetRow
                  asset="Matic Address"
                  value={truncateAddressString(userMatic.ethAddress)}
                />

                <AssetRow
                  asset="Matic"
                  value={formatWithSixDecimals(userMatic.ethBalance)}
                  selected={exchange.token === TOKEN.ETH}
                />

              </>
            )
          ) : (
            <WalletButton
              onClick={() => {
                userMatic.signIn();
              }}
              error={userMatic.error}
            >
              <img
                src="/metamask.svg"
                style={{ marginRight: 15, height: 22 }}
              />
              Metamask
            </WalletButton>
          )}
        </Box>

      </Box>
    </Box>
  );
});
