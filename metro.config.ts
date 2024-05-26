import { getDefaultConfig } from 'metro-config';
import type { ConfigT } from 'metro-config';

export default (async (): Promise<ConfigT> => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-typescript-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true // Enables faster startup times by optimizing the way code is loaded
        }
      })
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg', 'ts', 'tsx']
    }
  };
})();
