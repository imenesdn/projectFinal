// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const myTheme = {
  dark: false,
  colors: {
    background: "#F5F5F5FF",
    surface: "#FFFFFF",
    primary: "#FBB731",
    secondary: "#10E49C",
    error: "#F14668",
    info: "#3E8ED0",
    success: "#48C78EFF",
    warning: "#ffdd80",
  },
};

export default createVuetify(
  {
    theme: {
      defaultTheme: "myTheme",
      themes: {
        myTheme,
      },
    },
  }
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
);
