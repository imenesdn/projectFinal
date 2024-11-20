<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { useProductStore } from "./stores/product";

const authStore = useAuthStore();
const productStore = useProductStore();

const pathName = ref("/");
const route = useRoute();

const footerlinks = [
  {
    title: "LIENS UTILES",
    items: [
      {
        title: "Acceuil",
        link: "/",
      },
      {
        title: "Menu",
        link: "/",
      },
      {
        title: "Commande",
        link: "/",
      },
      {
        title: "Panier",
        link: "/",
      },
      {
        title: "About",
        link: "/",
      },
    ],
  },
];
// console.log(pathName.value)

watch(
  () => route.path,
  async (to, from) => {
    // console.log(to, from);
    pathName.value = to;
  },
);

onMounted(async () => {
  await authStore.getUser();
  await productStore.getPrducts();
  if (authStore.isAuthenticated) {
    await productStore.getPaniers();
  }
});
</script>

<template>
  <!--  :color=" '/' === pathName ? 'grey-lighten-4' : 'rgb(255,255,255,0.8)'"  -->
  <v-app>
    <v-app-bar color="black" flat height="75">
      <v-app-bar-title>
        <RouterLink to="/"
          ><img height="75" src="@/assets/logo.png" width="80" />
        </RouterLink>
      </v-app-bar-title>
      <RouterLink
        :class="
          '/' !== pathName
            ? 'text-white'
            : 'text-primary text-decoration-underline'
        "
        to="/"
      >
        <v-btn>Accueil </v-btn>
      </RouterLink>
      <RouterLink
        :class="
          '/about' !== pathName
            ? 'text-white'
            : 'text-primary text-decoration-underline'
        "
        to="/about"
      >
        <v-btn>Menu</v-btn>
      </RouterLink>
      <template v-if="authStore.isAuthenticated">
        <RouterLink
          :class="
            '/panier' !== pathName
              ? 'text-grey-darken-3'
              : 'text-pink-lighten-3 text-decoration-underline'
          "
          to="/panier"
        >
          <template v-if="productStore.paniers.length > 0">
            <v-badge :content="productStore.paniers.length" color="red">
              <v-btn class="bg-primary">
                <v-icon class="mr-1">mdi-cart-outline</v-icon>
                Panier
              </v-btn>
            </v-badge>
          </template>

          <v-btn v-else class="bg-primary">
            <v-icon class="mr-1">mdi-cart-outline</v-icon>
            Panier
          </v-btn>
        </RouterLink>

        <v-btn class="bg-primary ml-3" @click="authStore.logout"
          >Disconnexion</v-btn
        >
      </template>
      <template v-else>
        <RouterLink
          :class="
            '/register' !== pathName
              ? 'text-grey-darken-3 '
              : 'text-pink-lighten-3 text-decoration-underline'
          "
          to="/register"
        >
          <v-btn class="bg-primary">Inscription</v-btn>
        </RouterLink>
        <RouterLink
          :class="
            '/login' !== pathName
              ? 'text-grey-darken-3'
              : 'text-pink-lighten-3 text-decoration-underline'
          "
          to="/login"
        >
          <v-btn class="bg-primary ml-3">Connexion</v-btn>
        </RouterLink>
      </template>
    </v-app-bar>

    <v-main>
      <Transition appear mode="out-in">
        <RouterView />
      </Transition>
    </v-main>

    <v-footer class="pb-6 pt-4 footer">
      <v-row>
        <v-col cols="2">
          <img height="80" src="@/assets/logo.png" width="90" />
        </v-col>
        <v-col cols="4">
          <div
            v-for="(item, idx) in footerlinks"
            :key="idx"
            class="d-flex items-center flex-column"
          >
            <div class="text-h5">{{ item.title }}</div>
            <RouterLink
              v-for="(x, xid) in item.items"
              :key="xid"
              :to="x.link"
              class="hover-link text-grey text-title hover-link"
              style="text-decoration: none"
              >{{ x.title }}
            </RouterLink>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="d-flex items-center flex-column">
            <div class="text-h5">Contacts</div>
            <div class="text-grey text-subtitle-1">Horaires</div>
            <div class="text-white">
              Lundi-Dimanche
              <div>11:00-00:00</div>
            </div>
            <div class="text-grey text-subtitle-1">Address</div>
            <div>801 Aviation Pkwy, Ottawa</div>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="d-flex items-center flex-column">
            <div class="text-h5">NOUS JOINDRE</div>
            <a class="text-primary text-subtitle-1" href="tel:+1234567890">
              +1 (234) 567-890
            </a>
            <a class="text-primary text-subtitle-1" href="tel:+9999999999">
              +9 (999) 999-999
            </a>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="text-center text-grey text-title">
            © Collège La Cité | 2AMK
          </div>
        </v-col>
      </v-row>
    </v-footer>
    <v-snackbar v-model="authStore.snack" :timeout="3000" right>
      {{ authStore.snackText }}

      <template v-slot:actions>
        <v-btn :color="snackColor" @click="authStore.snack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style lang="scss" scoped>
// v-app-bar
.v-toolbar__content {
  a {
    text-decoration: none;
  }
}

.footer {
  background: radial-gradient(at 50% 10%, #472018, black, black);
  color: white;
  width: 100%;
}

.hover-link:hover {
  color: white !important;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
