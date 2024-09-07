module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
