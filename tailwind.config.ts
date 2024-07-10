import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "main" : "#009688",
                "bar": "rgba(0, 0, 0, .09)",
                "panel": "rgba(0, 0, 0, .03)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            screens: {
                "3xl": "2048px",
                "4xl": "2560px",
                "5xl": "3072px",
                "6xl": "4096px",
                "7xl": "5120px",
                "8xl": "6144px",
            },
            width: {
                "13": "52px"
            }
        },
    },
    plugins: [],
}
export default config
