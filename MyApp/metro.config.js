const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro config with targeted deep-import aliases to reduce noisy export warnings
 * emitted by dependencies that import private subpaths.
 */
module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const aliasMap = new Map([
    ['@noble/hashes/crypto.js', '@noble/hashes'],
    ['uint8arrays/cjs/src/concat.js', 'uint8arrays/concat'],
    ['uint8arrays/cjs/src/to-string.js', 'uint8arrays/to-string'],
    ['uint8arrays/cjs/src/from-string.js', 'uint8arrays/from-string'],
    ['multiformats/cjs/src/basics.js', 'multiformats/basics'],
  ]);

  const originalResolveRequest = config.resolver.resolveRequest;

  config.resolver.resolveRequest = (context, moduleName, platform) => {
    const redirected = aliasMap.get(moduleName);
    if (redirected) {
      return originalResolveRequest
        ? originalResolveRequest(context, redirected, platform)
        : context.resolveRequest(context, redirected, platform);
    }
    return originalResolveRequest
      ? originalResolveRequest(context, moduleName, platform)
      : context.resolveRequest(context, moduleName, platform);
  };

  // This allows the web app to be accessed from any origin.
  config.server = { ...config.server, allowAnonymousOrigins: true };

  return config;
})();
