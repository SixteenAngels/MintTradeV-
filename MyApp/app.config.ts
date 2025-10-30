import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'MintTrade',
  slug: 'MintTrade',
  extra: {
    router: {
      origin:
        'https://8082-firebase-minttrade-1761661143811.cluster-64pjnskmlbaxowh5lzq6i7v4ra.cloudworkstations.dev',
    },
    eas: {
      projectId: '3c9c8369-1439-4383-b922-9b2659e9842f',
    },
  },
});
