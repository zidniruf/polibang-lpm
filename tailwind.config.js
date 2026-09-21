import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },

            colors: {
                blue: {
                    50: colors.green[100],
                    100: colors.green[200],
                    200: colors.green[300],
                    300: colors.green[400],
                    400: colors.green[500],
                    500: colors.green[600],
                    600: colors.green[700],
                    700: colors.green[800],
                    800: colors.green[900],
                    900: colors.green[950],
                    950: colors.green[950],
                },
            },
        },
    },

    plugins: [
        forms,
        typography,
    ],
};
