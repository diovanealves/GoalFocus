/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonSheet: "#4551E6",
        cardBackground: "#0E0F11",
        cardBorder: "#202224",
      },
      fontFamily: {
        subtitle: "Inter_500Medium",
        body: "Inter_400Regular",
        title: "Inter_700Bold",
      },
    },
  },
  plugins: [],
};
