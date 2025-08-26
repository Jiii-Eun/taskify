const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16, // 1rem = 16px
      propList: ["*"], // 모든 속성 변환
      exclude: /node_modules/i,
    },
  },
};

export default config;
