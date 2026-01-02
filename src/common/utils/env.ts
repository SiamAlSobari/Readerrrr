import { createServerOnlyFn } from "@tanstack/react-start";

export const getEnv = createServerOnlyFn(() => {
  return {
    API_URL: process.env.API_URL || "",
  };
});

export const API_URL = import.meta.env.VITE_API_URL_CLIENT;