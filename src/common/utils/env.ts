import { createServerOnlyFn } from "@tanstack/react-start";

export const getEnv = createServerOnlyFn(() => {
  return {
    API_URL: process.env.API_URL || "",
  };
});