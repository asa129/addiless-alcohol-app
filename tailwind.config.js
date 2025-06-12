/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html", // For Vite's index.html
    "./src/**/*.{js,ts,jsx,tsx}", // All files in src
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Refined light blue palette for a more sophisticated feel
        brand: {
          // Soft, slightly richer blues
          blue: {
            light: "#D0EEFF", // Pale, airy blue for backgrounds/accents
            DEFAULT: "#80C0F0", // Main soft blue for primary elements
            dark: "#4080C0", // Deeper blue for hover/active states
          },
          // Muted, sophisticated blue-grays for text and strong elements
          navy: {
            light: "#7A90A8", // Lighter blue-gray
            DEFAULT: "#4A6078", // Main text color, slightly deeper
            dark: "#2A3848", // Darkest blue-gray for headings/strong contrast
          },
          // Gentle, desaturated teal for subtle accents
          teal: {
            light: "#E0F5F5", // Very pale teal
            DEFAULT: "#70C0C0", // Soft medium teal
            dark: "#408080", // Slightly deeper teal for accents
          },
          // Pure white for main background, ensuring cleanliness
          cream: {
            light: "#FFFFFF", // Pure white
            DEFAULT: "#FFFFFF", // Pure white
            dark: "#F8FBFD", // Very subtle off-white
          },
          // Clean, subtle grays for borders and muted text
          gray: {
            light: "#E8EDF2", // Lightest gray for subtle borders
            DEFAULT: "#D0D8E0", // Medium gray for borders
            dark: "#909AA8", // Darker gray for muted text
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-subtle": "linear-gradient(120deg, #FFFFFF 0%, #E8EDF2 100%)", // Updated to new grays/creams
        "blue-gradient": "linear-gradient(135deg, #80C0F0 0%, #D0EEFF 100%)", // Updated to new blues
        "teal-gradient": "linear-gradient(135deg, #70C0C0 0%, #E0F5F5 100%)", // Updated to new teals
        "light-blue-gradient":
          "linear-gradient(135deg, #D0EEFF 0%, #FFFFFF 100%)", // Updated to new light blues/creams
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
};
