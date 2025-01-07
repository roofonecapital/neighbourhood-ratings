import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'roofone-green-bg': '#A3C64F',
        'roofone-green-primary': "#9FC131",
        'roofone-secondary':"#0D98BA"
      },
    },
  },
  plugins: [],
} satisfies Config;
