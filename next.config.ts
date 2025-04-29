import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['rsuite/esm/locales'],
  // experimental: {
  //   esmExternals: 'loose', // faz o Next aceitar exports ESM
  // },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
