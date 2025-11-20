/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/w320/**",
        search: "",
        port: "",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/thumb/**",
        search: "",
        port: "",
      },
    ],
  },
};

export default nextConfig;
