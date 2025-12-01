// src/theme/system.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#E3F2FD" },
          100: { value: "#BBDEFB" },
          200: { value: "#90CAF9" },
          300: { value: "#64B5F6" },
          400: { value: "#42A5F5" },
          500: { value: "#1976D2" },
          600: { value: "#1565C0" },
          700: { value: "#115293" },
          800: { value: "#0D3B70" },
          900: { value: "#0A2B50" },
        },
        task: {
          todo: { value: "#42A5F5" },
          inProgress: { value: "#FFA726" },
          review: { value: "#AB47BC" },
          completed: { value: "#66BB6A" },
          optional: { value: "#FFCA28" },
          default: { value: "#90A4AE" },
        },
        grayCustom: {
          50: { value: "#FAFAFA" },
          100: { value: "#F0F0F0" },
          200: { value: "#E0E0E0" },
          300: { value: "#CFCFCF" },
          400: { value: "#B0B0B0" },
          500: { value: "#808080" },
          600: { value: "#616161" },
          700: { value: "#424242" },
          800: { value: "#212121" },
          900: { value: "#111111" },
        },
        white: { value: "#FFFFFF" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
