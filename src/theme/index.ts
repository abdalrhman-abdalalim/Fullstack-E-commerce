import { extendTheme, ThemeConfig, StyleFunctionProps } from "@chakra-ui/react";

// Define the color mode configuration
const config: ThemeConfig = {
  initialColorMode: "system", // You can change this to 'light' or 'dark'
  useSystemColorMode: false, // Whether to use the system color mode preference
};

// Extend the theme
const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
      },
    }),
  },
});

export default theme;
