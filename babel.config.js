module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./apps/finderbox/src'],
          alias: {
            '@services': './apps/finderbox/src/services',
            '@components': './apps/finderbox/src/components',
            '@screens': './apps/finderbox/src/screens',
            '@assets': './apps/finderbox/src/assets', // se mover as imagens para src/assets
          },
        },
      ],
    ],
  };
};


