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
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default nextConfig;
