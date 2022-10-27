module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  // main process' webpack config

  webpack: (config, env) => {
    // do some stuff here
    return config;
  },
};
