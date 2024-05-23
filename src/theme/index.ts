import { createTheme, Drawer } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Manrope, sans-serif",
  colors: {
    blue: [
      "#f0f5ff",
      "#c2d5ff",
      "#94baff",
      "#6e9eff",
      "#4a7eff",
      "#2a5ee4",
      "#003db3",
      "#002884",
      "#001554",
      "#000b2b",
    ],
  },
  primaryShade: 5,
  primaryColor: "blue",
  cursorType: "pointer",
  components: {
    Drawer: Drawer.extend({
      defaultProps: {
        position: "right",
        padding: 24,
        overlayProps: { backgroundOpacity: 0.5, blur: 4 },
      },
    }),
  },
});
