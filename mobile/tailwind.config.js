/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroud: "#0E0F11",
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
