import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "gsap/ScrollSmoother": path.resolve(__dirname, "src/plugins/ScrollSmoother.js"),
      "gsap/SplitText": path.resolve(__dirname, "src/plugins/SplitText.js"),
      "gsap-trial/ScrollSmoother": path.resolve(__dirname, "src/plugins/ScrollSmoother.js"),
      "gsap-trial/SplitText": path.resolve(__dirname, "src/plugins/SplitText.js"),
    },
  },
});
