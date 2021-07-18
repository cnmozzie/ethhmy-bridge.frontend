import React, { useState } from 'react';
import { Box } from 'grommet';
import { Title, Text } from 'components/Base';
import * as styles from './faq-styles.styl';
import { PageContainer } from 'components/PageContainer';
import { BaseContainer } from 'components/BaseContainer';
import { Icon } from 'components/Base/components/Icons';

const faqConfig = [
  {
    label: 'What is Loser bridge?',
    text: () => (
      <p>
        Loser bridge is a cross-chain bridge that allows exchange of crypto assets
        (e.g., fungible/non-fungible tokens, stablecoins) between Ethereum,
        Binance Smart Chain and Matic blockchains.
        <br />
        <br />
        Loser bridge UI is accessible at{' '}
        <a href="https://bridge.harmony.one/" target="_blank">
          https://www.loserbridge.org/
        </a>
      </p>
    ),
  },
  {
    label: 'What is Loser bridge used for?',
    text: () => (
      <p>
        Loser bridge’s main purpose is to enable transfer of assets from Ethereum (or
        Binance Smart Chain) to Matic. Users holding assets on Ethereum (or
        Binance Smart Chain) can exchange them to corresponding assets on
        Matic (1:1). Loser bridge also allows redemption of the exchanged assets
        back to the user's Ethereum (or Binance Smart Chain) account at any
        time.
      </p>
    ),
  },
  {
    label: 'How does Loser bridge work?',
    text: () => (
      <p>
        Loser bridge is comprised of two core components:
        <ul>
          <li>
            A set of smart contracts deployed on both Ethereum (and Binance
            Smart Chain) and Matic blockchains
          </li>
          <li>
            A hidden validator that listens to events on both Ethereum (BSC) and
            Matic smart contracts. When a token lock action is detected
            on Ethereum (BSC) blockchain, the validator validates it and
            relays the finalized information to the Matic blockchain: here,
            the same amount of a bridged token is minted. On the opposite, when
            a bridged token lock is detected on Matic blockchain, the 
            validator validates it and relays the finalized information to the
            Ethereum (BSC) blockchain, where the same amount of the original token is
            unlocked.
          </li>
        </ul>
      </p>
    ),
  },
  {
    label: 'What kind of assets can be bridged using Loser bridge?',
    text: () => (
      <>
        <li>
          <b>From Ethereum:</b>
        </li>
        <ul>
          <li>None for Loser bridge for now...</li>
          <li>
            You can bridge your assets at{' '}
            <a href="https://wallet.matic.network/" target="_blank">
              Matic Web Walle
            </a>
          </li>
        </ul>
        <br />
        <li>
          <b>From Binance Smart Chain:</b>
        </li>
        <ul>
          <li>
            Lowb
          </li>
        </ul>
      </>
    ),
  },
  {
    label: 'How are assets mapped between Ethereum, Binance Smart Chain and Matic?',
    text: () => (
      <Box direction="column" gap="15px">
        <p>
          Assets are mapped 1:1. For example, 10 “lowb” on Ethereum after
          bridging will be available as 10 “lowb” on Matic.
        </p>
        <p>
          Same 1:1 mapping holds true for Binance Smart Chain.
        </p>
        <p>
          And, the “lowb“ on all three chains are interchangeable, meaning one
          can bridge lowb from Ethereum to Matic and then withdraw it on
          Binance Smart Chain.
        </p>
      </Box>
    ),
  },
  {
    label: 'Does the token supply increase when using Loser bridge?',
    text: () => (
      <p>
        No: The supply of the original token never change as a result of using
        Loser bridge: Loser bridge locks a certain amount of a token on Ethereum
        blockchain (essentially taking it out of circulation) and mints the
        exact same amount of tokens on the Matic blockchain, that represents
        in all respects the original token (i.e. regenerating the locked
        supply). As a result, the circulating supply of the original token will
        stay the same: it's just split across two different blockchains instead
        of one.
      </p>
    ),
  },
  {
    label: 'What happens to my original tokens if I sell the bridged tokens?',
    text: () => (
      <p>
        Once you use Loser bridge to transfer your original tokens from Ethereum (BSC) to
        Matic, the original tokens get stored and locked in the Loser bridge
        contracts: you do not own those tokens on Ethereum (BSC) anymore. On the other
        side, you now own the same amount of tokens that gets sent to you on the
        Matic blockchain.
      </p>
    ),
  },

  {
    label: 'Can I send my bridged tokens back from Matic to Ethereum (BSC)?',
    text: () => (
      <p>
        Yes: you can send the bridged tokens from Matic to Ethereum (BSC) at any
        time, and receive back the same amount of the original token on
        Ethereum (BSC).
      </p>
    ),
  },

  {
    label: 'Can I bridge as many tokens as I want, or is there a limit?',
    text: () => (
      <p>
        There is no limit on the amount of tokens that can be bridged from
        Ethereum (BSC) to Matic.
      </p>
    ),
  },

  {
    label: 'Are bridged tokens transferable?',
    text: () => (
      <p>
        Yes. You can transfer the bridged tokens to other users and they can
        redeem them back to their Ethereum (BSC) accounts. This is possible because
        when you lock your token, it gets pooled into a bridge smart contract
        from which any redeem request can be serviced without tying the locked
        tokens and redemption to a specific user account.
      </p>
    ),
  },

  {
    label: 'What’s the cost of using the bridge?',
    text: () => (
      <Box direction="column" gap="15px">
        <p>
          <b>Sending ERC20 from Binance Smart Chain to Matic</b>
          <br />
          Involves two transactions (approve and lock) that requires
          approximately 100,000 Ethereum gas in total and the cost will be paid
          by the user. 
          Another 100 lowb will pay for the validators.
        </p>
        <p>
          <b>
            Sending ERC20 to Binance Smart Chain or redeeming the bridged tokens back
            to Binance Smart Chain
          </b>{' '}
          <br />
          1000 lowb will pay for the validators.
        </p>
      </Box>
    ),
  },

  {
    label: 'Is Loser bridge audited?',
    text: () => (
      <p>
        No, the Loser bridge is not audited yet. Take your own risk.
      </p>
    ),
  },

  {
    label: 'Is there a tutorial explaining how to use Loser bridge?',
    text: () => (
      <p>
        You can turn to {' '}
        <a
          href="https://t.me/loser_coin"
          target="_blank"
        >
          Chinese Telegram 
        </a>
        {' '}or{' '}
        <a
          href="https://t.me/loser_coin_english"
          target="_blank"
        >
          English Telegram 
        </a>
        {' '}for help.
      </p>
    ),
  },

  {
    label: 'Is Loser bridge open source?',
    text: () => (
      <p>
        Yes: Loser bridge code is open source, you can find it on GitHub:
        <a href="https://github.com/cnmozzie/ethhmy-bridge.frontend" target="_blank">
            https://github.com/cnmozzie/ethhmy-bridge.frontend
        </a>
      </p>
    ),
  },

  {
    label: 'Explaination of the bridge fee?',
    text: () => (
      <Box direction="column" gap="15px">
        <li>
          The Loser bridge has still the lowest cost for Ethereum (BSC) to Matic
          transfers, however Matic to Ethereum (BSC) transfers will be expensive (at
          high Ethereum (BSC) gas price). The Ethereum (BSC) gas cost for our bridge is
          comparable to every other bridge that is currently on Ethereum (BSC)
          mainnet.
        </li>
      </Box>
    ),
  },

  {
    label: 'Bridge issues and need help?',
    text: () => (
      <p>
        <b>
          Report any issues to our {' '}
        <a
          href="https://t.me/loser_coin"
          target="_blank"
        >
          Chinese Telegram 
        </a>
        {' '}or{' '}
        <a
          href="https://t.me/loser_coin_english"
          target="_blank"
        >
          English Telegram 
        </a>
        {' '} with one or more of the
          following informations:
        </b>
        <Box direction="column" gap="10px" margin={{ top: '10px' }}>
          <p>1) your transaction hashes on Ethereum or Binance Smart Chain or Matic</p>
          <p>2) your ETH/BSC/Matic account address</p>
        </Box>
      </p>
    ),
  },
];

export const FAQPage = () => {
  const [expandedIdxs, setExpandedIdxs] = useState([]);

  const addExpanded = idx => setExpandedIdxs(expandedIdxs.concat([idx]));
  const removeExpanded = idx =>
    setExpandedIdxs(expandedIdxs.filter(item => item !== idx));

  return (
    <BaseContainer>
      <PageContainer>
        <Box
          className={styles.faqContainer}
          pad={{ horizontal: 'large', top: 'large' }}
        >
          <Box direction="row" justify="center" margin={{ bottom: 'medium' }}>
            <Title
              style={{
                // color: '#47b8eb',
                fontWeight: 600,
                letterSpacing: 0.2,
              }}
              size="large"
            >
              FAQ
            </Title>
          </Box>
          <Box style={{ background: 'white', borderRadius: 5 }} pad="xlarge">
            {faqConfig.map((item, idx) => {
              const isExpanded = expandedIdxs.includes(idx);

              return (
                <Box
                  className={styles.item}
                  direction="column"
                  key={String(idx)}
                  onClick={() =>
                    isExpanded ? removeExpanded(idx) : addExpanded(idx)
                  }
                >
                  <Box className={styles.label} direction="row" align="center">
                    <Box className={styles.labelIcon}>
                      {isExpanded ? '-' : '+'}
                    </Box>
                    {/*<Icon*/}
                    {/*  styles={{ marginBottom: 2 }}*/}
                    {/*  glyph={isExpanded ? 'Minus' : 'Plus'}*/}
                    {/*/>*/}
                    <Text size="large" style={{ marginLeft: 10 }} bold>
                      {item.label}
                    </Text>
                  </Box>
                  {isExpanded ? (
                    <Box className={styles.textContainer}>
                      <ul>
                        <li>
                          <Text size="medium" className={styles.text}>
                            {item.text()}
                          </Text>
                        </li>
                      </ul>
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};
