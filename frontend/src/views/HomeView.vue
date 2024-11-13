<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="main-bg ">
    <v-container class="pa-md-10 pa-sm-2">
      <v-row>
        <v-col class="px-5 py-10" cols="12" md="6">
          <h1 class="font-weight-regular   text-primary">
            DE 11 AM A 12 PM
          </h1>

          <p class="text-h2 font-weight-bold text-white" style="line-height: 1.3;letter-spacing: 3px !important;">NOUS
            LIVRONS
            LE GOÛT DE
            LA VIE</p>
          <RouterLink to="/about">

            <v-btn class="bg-primary" size="large">Commandez</v-btn>
          </RouterLink>
        </v-col>

      </v-row>
    </v-container>
  </div>





</template>

<style scoped>
.main-bg {
  /* width: 100; */
  /* height: 500px; */
  height: calc(100vh - 75px);
  background-image: url("@/assets/accueilMain.png");
  background-size: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>