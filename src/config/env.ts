function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

export const JWT_SECRET = requiredEnv("JWT_SECRET");
export const JWT_EXPIRES_IN = requiredEnv("JWT_EXPIRES_IN")
export const MONGO_URI = requiredEnv("MONGO_URI");
export const PORT = Number(process.env.PORT ?? 3000);
