// stores/counter.js
import { defineStore } from "pinia";
import { api } from "../services/axios";

export const useProductStore = defineStore("product", {
  state: () => {
    return {
      products: [],
      paniers: [],
    };
  },
  actions: {
    async getPrducts() {
      try {
        const res = await api.get("/api/produits");
        this.products = res;
      } catch (err) {
        console.log(err);
      }
    },
    async getPaniers() {
      try {
        const res = await api.get("api/panier");
        this.paniers = res;
      } catch (err) {
        console.log(err);
      }
    },
    async addToCart(p_id, qty) {
      const data = {
        produitId: p_id,
        quantite: qty,
      };

      return await api.post("/api/panier/produit", data);
    },
    async updateQuantity(p_id, qty) {
      const data = {
        quantite: qty,
      };
      return await api.patch(`/api/panier/produit/${p_id}`, data);
    },
    async removeItem(p_id) {
      return await api.delete(`/api/panier/produit/${p_id}`);
    },
    async resetPanier() {
      return await api.delete(`/api/panier`);
    },
    async place() {
      return await api.patch(`/api/panier/soumettre`);
    },
  },
});
