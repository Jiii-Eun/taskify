/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "376px",
        pc: "745px",
      },
      colors: {
        brandGray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
        },
        brandViolet: {
          50: "#eef2ff",
          500: "#8b5cf6",
        },
        brandRed: "#ef4444",
        brandGreen: "#22c55e",
        brandPurple: "#a855f7",
        brandOrange: "#f97316",
        brandBlue: "#3b82f6",
        brandPink: "#ec4899",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        eng: ["var(--font-eng)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "3xl-bold": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        "3xl-semibold": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "600" }],

        "2xl-bold": ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        "2xl-semibold": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        "2xl-medium": ["1.5rem", { lineHeight: "2rem", fontWeight: "500" }],
        "2xl-regular": ["1.5rem", { lineHeight: "2rem", fontWeight: "400" }],

        "xl-bold": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "700" }],
        "xl-semibold": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "xl-medium": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "500" }],
        "xl-regular": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "400" }],

        "2lg-bold": ["1.125rem", { lineHeight: "1.625rem", fontWeight: "700" }],
        "2lg-semibold": ["1.125rem", { lineHeight: "1.625rem", fontWeight: "600" }],
        "2lg-medium": ["1.125rem", { lineHeight: "1.625rem", fontWeight: "500" }],
        "2lg-regular": ["1.125rem", { lineHeight: "1.625rem", fontWeight: "400" }],

        "lg-bold": ["1rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        "lg-semibold": ["1rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        "lg-medium": ["1rem", { lineHeight: "1.5rem", fontWeight: "500" }],
        "lg-regular": ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],

        "md-bold": ["0.9375rem", { lineHeight: "1.375rem", fontWeight: "700" }],
        "md-semibold": ["0.9375rem", { lineHeight: "1.375rem", fontWeight: "600" }],
        "md-medium": ["0.9375rem", { lineHeight: "1.375rem", fontWeight: "500" }],
        "md-regular": ["0.9375rem", { lineHeight: "1.375rem", fontWeight: "400" }],

        "sm-semibold": ["0.875rem", { lineHeight: "1.25rem", fontWeight: "600" }],
        "sm-medium": ["0.875rem", { lineHeight: "1.25rem", fontWeight: "500" }],
        "sm-regular": ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }],

        "xs-semibold": ["0.75rem", { lineHeight: "1rem", fontWeight: "600" }],
        "xs-medium": ["0.75rem", { lineHeight: "1rem", fontWeight: "500" }],
        "xs-regular": ["0.75rem", { lineHeight: "1rem", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};

export default config;
