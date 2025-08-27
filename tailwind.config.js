import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"], // shadcn/ui 호환 위해 class 모드 사용
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      tablet: "376px",
      pc: "745px",
      colors: {
        black: "var(--black)",
        white: "var(--white)",
        gray: {
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
        },
        violet: {
          50: "var(--violet-50)",
          500: "var(--violet-500)",
        },
        red: "var(--red)",
        green: "var(--green)",
        purple: "var(--purple)",
        orange: "var(--orange)",
        blue: "var(--blue)",
        pink: "var(--pink)",
      },

      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        eng: ["var(--font-eng)", ...fontFamily.sans],
      },
      fontSize: {
        /* Text-3xl */
        "text-3xl-bold": [
          "var(--text-3xl)",
          { lineHeight: "var(--leading-3xl)", fontWeight: "var(--font-bold)" },
        ],
        "text-3xl-semibold": [
          "var(--text-3xl)",
          { lineHeight: "var(--leading-3xl)", fontWeight: "var(--font-semibold)" },
        ],

        /* Text-2xl */
        "text-2xl-bold": [
          "var(--text-2xl)",
          { lineHeight: "var(--leading-2xl)", fontWeight: "var(--font-bold)" },
        ],
        "text-2xl-semibold": [
          "var(--text-2xl)",
          { lineHeight: "var(--leading-2xl)", fontWeight: "var(--font-semibold)" },
        ],
        "text-2xl-medium": [
          "var(--text-2xl)",
          { lineHeight: "var(--leading-2xl)", fontWeight: "var(--font-medium)" },
        ],
        "text-2xl-regular": [
          "var(--text-2xl)",
          { lineHeight: "var(--leading-2xl)", fontWeight: "var(--font-regular)" },
        ],

        /* Text-xl */
        "text-xl-bold": [
          "var(--text-xl)",
          { lineHeight: "var(--leading-xl)", fontWeight: "var(--font-bold)" },
        ],
        "text-xl-semibold": [
          "var(--text-xl)",
          { lineHeight: "var(--leading-xl)", fontWeight: "var(--font-semibold)" },
        ],
        "text-xl-medium": [
          "var(--text-xl)",
          { lineHeight: "var(--leading-xl)", fontWeight: "var(--font-medium)" },
        ],
        "text-xl-regular": [
          "var(--text-xl)",
          { lineHeight: "var(--leading-xl)", fontWeight: "var(--font-regular)" },
        ],

        /* Text-2lg */
        "text-2lg-bold": [
          "var(--text-2lg)",
          { lineHeight: "var(--leading-2lg)", fontWeight: "var(--font-bold)" },
        ],
        "text-2lg-semibold": [
          "var(--text-2lg)",
          { lineHeight: "var(--leading-2lg)", fontWeight: "var(--font-semibold)" },
        ],
        "text-2lg-medium": [
          "var(--text-2lg)",
          { lineHeight: "var(--leading-2lg)", fontWeight: "var(--font-medium)" },
        ],
        "text-2lg-regular": [
          "var(--text-2lg)",
          { lineHeight: "var(--leading-2lg)", fontWeight: "var(--font-regular)" },
        ],

        /* Text-lg */
        "text-lg-bold": [
          "var(--text-lg)",
          { lineHeight: "var(--leading-lg)", fontWeight: "var(--font-bold)" },
        ],
        "text-lg-semibold": [
          "var(--text-lg)",
          { lineHeight: "var(--leading-lg)", fontWeight: "var(--font-semibold)" },
        ],
        "text-lg-medium": [
          "var(--text-lg)",
          { lineHeight: "var(--leading-lg)", fontWeight: "var(--font-medium)" },
        ],
        "text-lg-regular": [
          "var(--text-lg)",
          { lineHeight: "var(--leading-lg)", fontWeight: "var(--font-regular)" },
        ],

        /* Text-md */
        "text-md-bold": [
          "var(--text-md)",
          { lineHeight: "var(--leading-md)", fontWeight: "var(--font-bold)" },
        ],
        "text-md-semibold": [
          "var(--text-md)",
          { lineHeight: "var(--leading-md)", fontWeight: "var(--font-semibold)" },
        ],
        "text-md-medium": [
          "var(--text-md)",
          { lineHeight: "var(--leading-md)", fontWeight: "var(--font-medium)" },
        ],
        "text-md-regular": [
          "var(--text-md)",
          { lineHeight: "var(--leading-md)", fontWeight: "var(--font-regular)" },
        ],

        /* Text-sm */
        "text-sm-semibold": [
          "var(--text-sm)",
          { lineHeight: "var(--leading-sm)", fontWeight: "var(--font-semibold)" },
        ],
        "text-sm-medium": [
          "var(--text-sm)",
          { lineHeight: "var(--leading-sm)", fontWeight: "var(--font-medium)" },
        ],

        /* Text-xs */
        "text-xs-semibold": [
          "var(--text-xs)",
          { lineHeight: "var(--leading-xs)", fontWeight: "var(--font-semibold)" },
        ],
        "text-xs-medium": [
          "var(--text-xs)",
          { lineHeight: "var(--leading-xs)", fontWeight: "var(--font-medium)" },
        ],
        "text-xs-regular": [
          "var(--text-xs)",
          { lineHeight: "var(--leading-xs)", fontWeight: "var(--font-regular)" },
        ],
      },
    },
  },
  plugins: [],
};
