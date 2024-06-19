/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroud: "#0E0F11",
      },
      fontFamily: {
        medium: "Inter_500Medium",
        regular: "Inter_400Regular",
        bold: "Inter_700Bold",
      },
    },
  },
  plugins: [],
};
