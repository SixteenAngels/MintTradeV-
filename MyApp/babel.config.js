module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { "unstable_transformImportMeta": true }]],
    plugins: [
      // expo-router/babel is deprecated as of SDK 50+, babel-preset-expo includes needed transforms
      "react-native-reanimated/plugin", // must be last
    ],
  };
};