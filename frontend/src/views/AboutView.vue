<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../stores/product";
import { useAuthStore } from "../stores/auth";
import { baseUrl } from "../services/axios";

const productStore = useProductStore();
const authStore = useAuthStore();

const addToCart = async (id) => {
  if (authStore.isAuthenticated) {
    try {
      const res = await productStore.addToCart(id, 1);
      authStore.showSnack(res?.message);
      await productStore.getPaniers();
    } catch (err) {
      authStore.showSnack(err?.data.message);
    }
  } else {
    authStore.showSnack("Login to add Item to cart");
  }
};

onMounted(async () => {
  await productStore.getPrducts();
});
</script>

<template>
  <div style="background-color: rgb(254, 251, 246)">
    <v-container class="px-2 py-5">
      <v-row>
        <v-col cols="12">
          <h2 class="pb-1 text-h4 font-weight-medium text-grey-darken-3">
            NOS PRODUITS
          </h2>
          <hr class="shortLine" />
        </v-col>
      </v-row>
      <v-row class="py-2">
        <v-col
          v-for="(p, id) in productStore.products"
          :key="id"
          md="3"
          sm="12"
        >
          <v-card class="mx-auto Card" max-width="344">
            <v-img
              :src="
                p.cheminImage
                  ? `${baseUrl + p.cheminImage}`
                  : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
              "
              class="rounded"
              cover
              height="200px"
            ></v-img>

            <v-card-title>
              {{ p.nom }}
            </v-card-title>
            <v-card-actions>
              <v-btn class="bg-primary" rounded @click="addToCart(p.produitId)">
                Commandez
              </v-btn>
              <v-spacer />
              <div class="text-h6">${{ p.prix }}</div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.myavatar {
  width: 350px;
  height: 350px;
  background-image: url("@/assets/avatar.png");
  background-size: cover;
}

.shortLine {
  width: 80px;
  border: 1px solid #444;
  margin-left: 0px;
}

.Card:hover {
  transform: scale(1.01);
  transition: transform 0.2s ease-in-out;
}
</style>
