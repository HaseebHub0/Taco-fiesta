/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#D7263D", // Mexican Red (Chili / Salsa Vibe)
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F8B400", // Mustard Yellow (Cheese / Corn Tortilla)
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#3A7D44", // Deep Green (Avocado / Jalapeño)
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#FFF3E0", // Warm Beige (Taco Shell / Queso)
          foreground: "#000000",
        },
        dark: {
          DEFAULT: "#2E1A17", // Dark Brown (Traditional Mexican Clay Pots)
          foreground: "#FFFFFF",
        },
        "taco-orange": "#FF9800",
        "taco-yellow": "#FFC107",
      },
      fontFamily: {
        heading: ['var(--font-lobster)'],
        sans: ['var(--font-poppins)'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

