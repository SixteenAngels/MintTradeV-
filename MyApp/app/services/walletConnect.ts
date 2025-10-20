import { createWeb3Modal } from '@web3modal/wagmi/react';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export const web3modal = projectId
  ? createWeb3Modal({ wagmiConfig, projectId })
  : undefined;
