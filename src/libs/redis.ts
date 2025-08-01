import Redis from "ioredis";

// src/libs/redis.ts
import { redisConfig } from "@/config/redis";

export const redis = new Redis(redisConfig);
