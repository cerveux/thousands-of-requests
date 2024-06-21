import dotenv from "dotenv";

dotenv.config();

interface InterfaceConfig {
  port: number;
  nodeEnv: string;
}

export const config: InterfaceConfig = {
  nodeEnv: process.env.NODE_ENV ? process.env.NODE_ENV : "dev",
  port: Number( process.env.PORT ) || 3000,
};
