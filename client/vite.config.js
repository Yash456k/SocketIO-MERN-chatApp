import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
