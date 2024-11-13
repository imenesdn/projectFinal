<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useProductStore } from './stores/product';

const authStore = useAuthStore()
const productStore = useProductStore()

const pathName = ref('/');
const route = useRoute();

const footerlinks = [
  {
    title: 'LIENS UTILES',
    items: [
      {
        title: 'Acceuil',
        link: '/',
      },
      {
        title: 'Menu',
        link: '/',
      },
      {
        title: 'Commande',
        link: '/',
      },
      {
        title: 'Panier',
        link: '/',
      },
      {
        title: 'About',
        link: '/',
      },
    ]
  },

]
// console.log(pathName.value)

watch(
  () => route.path,
  async (to, from) => {
    // console.log(to, from);
    pathName.value = to
  }
);

onMounted(async () => {
  await authStore.getUser()
  await productStore.getPrducts()
  if (authStore.isAuthenticated) {
    await productStore.getPaniers()
  }
})

</script>

<template>
  <!--  :color=" '/' === pathName ? 'grey-lighten-4' : 'rgb(255,255,255,0.8)'"  -->
  <v-app>
    <v-app-bar height="70" flat color="black">
      <v-app-bar-title>
        <RouterLink to="/"><img width="60" height="50" src="@/assets/logo.png" />
        </RouterLink>
      </v-app-bar-title>
      <RouterLink to="/" :class="'/' !== pathName ? 'text-white' : 'text-primary text-decoration-underline'">
        <v-btn>Accueil
        </v-btn>
      </RouterLink>
      <RouterLink to="/about" :class="'/about' !== pathName ? 'text-white' : 'text-primary text-decoration-underline'">
        <v-btn>Menu</v-btn>
      </RouterLink>
      <template v-if="authStore.isAuthenticated">
        <RouterLink to="/panier"
          :class="'/panier' !== pathName ? 'text-grey-darken-3' : 'text-pink-lighten-3 text-decoration-underline'">
          <template v-if="productStore.paniers.length > 0">
            <v-badge color="red" :content="productStore.paniers.length">
              <v-btn class="bg-primary ">
                <v-icon class="mr-1">mdi-cart-outline</v-icon>
                Panier</v-btn>
            </v-badge>
          </template>

          <v-btn v-else class="bg-primary ">
            <v-icon class="mr-1">mdi-cart-outline</v-icon>
            Panier</v-btn>

        </RouterLink>

        <v-btn class="bg-primary ml-3" @click="authStore.logout">Disconnexion</v-btn>

      </template>
      <template v-else>


        <RouterLink to="/register"
          :class="'/register' !== pathName ? 'text-grey-darken-3 ' : 'text-pink-lighten-3 text-decoration-underline'">
          <v-btn class="bg-primary ">Inscription</v-btn>
        </RouterLink>
        <RouterLink to="/login"
          :class="'/login' !== pathName ? 'text-grey-darken-3' : 'text-pink-lighten-3 text-decoration-underline'">
          <v-btn class="bg-primary ml-3">Connexion</v-btn>
        </RouterLink>
      </template>


    </v-app-bar>

    <v-main>
      <Transition mode="out-in" appear>
        <RouterView />
      </Transition>
    </v-main>

    <v-footer class="pb-6 pt-4 footer">
      <v-row>
        <v-col cols="2">
          <img width="90" height="80" src="@/assets/logo.png" />
        </v-col>
        <v-col cols="4">
          <div v-for="(item, idx) in footerlinks" :key="idx" class="d-flex items-center flex-column ">
            <div class="text-h5">{{ item.title }}</div>
            <RouterLink class="hover-link text-grey text-title hover-link" style="text-decoration: none;" :to="x.link"
              v-for="(x, xid) in item.items" :key="xid">{{ x.title }}
            </RouterLink>

          </div>
        </v-col>
        <v-col cols="3">
          <div class="d-flex items-center flex-column ">
            <div class="text-h5">Contacts</div>
            <div class="text-grey text-subtitle-1">
              Horaires
            </div>
            <div class="text-white">
              Lundi-Dimanche
              <div>

                11:00-00:00
              </div>
            </div>
            <div class="text-grey text-subtitle-1">
              Address
            </div>
            <div>
              801 Aviation Pkwy, Ottawa
            </div>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="d-flex items-center flex-column ">
            <div class="text-h5">NOUS JOINDRE</div>
            <a href="tel:+1234567890" class="text-primary text-subtitle-1">
              +1 (234) 567-890
            </a>
            <a href="tel:+9999999999" class="text-primary text-subtitle-1">
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
    <v-snackbar v-model="authStore.snack" right :timeout="3000">
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
