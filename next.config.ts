import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MYSQL_HOST: "localhost",
    MYSQL_PORT: "3306",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "",
    MYSQL_DATABASE: "ws_db",
  },
};

export default nextConfig;