type NextConfig = {
  reactStrictMode?: boolean;
  images?: {
    remotePatterns?: Array<{
      protocol?: string;
      hostname?: string;
    }>;
  };
  experimental?: Record<string, any>;
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default nextConfig;
