const pkg = require('./package.json');
const config = {
  expo: {
    name: 'Bob',
    slug: 'bob',
    version: pkg.version,
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'bobthealgorithm',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'pro.mortenolsen.bob',
      buildNumber: pkg.version,
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'pro.mortenolsen.bob',
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    // hooks: {
    //   postPublish: [
    //     {
    //       file: 'sentry-expo/upload-sourcemaps',
    //       config: {
    //         setCommits: true,
    //       },
    //     },
    //   ],
    // },
  },
};

module.exports = config;
