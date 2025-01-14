/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1700px",
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
          hover: "hsl(var(--tertiary-hover))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: {
            DEFAULT: "hsl(var(--accent-light))",
            hover: "hsl(var(--accent-light-hover))",
          },
          hover: "hsl(var(--accent-hover))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          light: "hsl(var(--success-light))",
          hover: "hsl(var(--success-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          light: "hsl(var(--destructive-light))",
          hover: "hsl(var(--destructive-hover))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
          light: "hsl(var(--info-light))",
          hover: "hsl(var(--info-hover))",
        },
        warn: {
          DEFAULT: "hsl(var(--warn))",
          foreground: "hsl(var(--warn-foreground))",
          light: "hsl(var(--warn-light))",
          hover: "hsl(var(--warn-hover))",
        },
        gray: {
          DEFAULT: "hsl(var(--gray-primary))",
          secondary: "hsl(var(--gray-secondary))",
          tertiary: "hsl(var(--gray-tertiary))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        button: "var(--button-shadow)",
        elevation: "var(--elevation-shadow)",
        userPanel: "var(--cta-user-panel)",
        cta: "var(--cta-shadow)",
        general: "var(--general-shadow)",
      },
      spacing: {
        navbar: "72px",
      },
      lineHeight: {
        header: "var(--header-lineheight)",
      },
      letterSpacing: {
        sm: "var(--sm-letterspacing)",
      },
      keyframes: {
        bounceLeft: {
          "35%": {
            left: "-11%",
          },
          "50%": {
            left: "-8%",
          },
          "70%": {
            left: "-9%",
          },
          "90%": {
            left: "-8%",
          },
          "100%": {
            left: "-8%",
          },
        },
      },
      animation: {
        "toast-icon": "bounceLeft 1s ease-in-out forwards",
      },
      fontFamily: {
        madefor: ['"Wix Madefor"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
};
