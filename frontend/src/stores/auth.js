// stores/counter.js
import { defineStore, getActivePinia } from "pinia";
import router from "../router";
import { api } from "../services/axios";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: null,
      isAuthenticated: false,
      snack: false,
      snackText: "",
      snackColor: "blue",
    };
  },
  actions: {
    async login(data) {
      try {
        const res = await api.post("/auth/connexion", data);
        this.isAuthenticated = true;
        this.user = res.user;
        localStorage.setItem("token", res.token);
        router.push("/");
        this.showSnack("Login Success");
      } catch (err) {
        this.showSnack(err?.data?.error);
      }
    },
    async register(data) {
      try {
        const res = await api.post("/auth/inscription", data);
        router.push("/login");
        this.showSnack("Registeration success");
      } catch (err) {
        this.showSnack(err?.data?.error);
      }
    },
    async getUser() {
      if (!localStorage.getItem("token")) return;
      try {
        const res = await api.get("/auth/user");
        console.log("sdawa", res);
        this.isAuthenticated = true;
        this.user = res;
      } catch (err) {
        this.logout();
      }
    },
    logout() {
      localStorage.removeItem("token");
      router.push("/");
      getActivePinia()._s.forEach((store) => store.$reset());
    },

    showSnack(text, color = "blue") {
      this.snackText = text;
      this.color = color;
      this.snack = true;
    },
  },
});
