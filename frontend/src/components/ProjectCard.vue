<script setup>
const props = defineProps({
  projectIcon: String,
  projectTitle: String,
  projectDescription: String,
  preImg: String,
  tags: Array,
  themeColor: String,
});
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :color="themeColor || '#E5ECF7'"
      :elevation="isHovering ? 12 : 2"
      class="pa-md-8 pa-sm-2"
      rounded="lg"
      theme="light"
      v-bind="props"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="5">
            <div>
              <div class="pl-4 pb-2">
                <div
                  :style="{ backgroundImage: 'url(' + projectIcon + ')' }"
                  class="logo"
                ></div>
              </div>
              <v-card-title class="text-h5">
                {{ projectTitle || "Project Title" }}
              </v-card-title>

              <v-card-subtitle
                ><p class="text-subtitle-1">
                  {{ projectDescription || "project description" }}
                </p>
              </v-card-subtitle>

              <div class="px-3 pt-5 d-none d-md-block">
                <v-chip v-for="(tag, i) in tags" :key="i" class="ma-1" label>{{
                  tag
                }}</v-chip>
              </div>

              <!-- <div class="px-3">
                  <v-chip class="ma-1" label>UX</v-chip>
                  <v-chip class="ma-1" label>iOS</v-chip>
              </div> -->
            </div>
          </v-col>
          <v-col cols="12" md="7">
            <v-img
              :src="
                preImg ||
                'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
              "
              cover
            >
              <template v-slot:placeholder>
                <v-row align="center" class="fill-height ma-0" justify="center">
                  <v-progress-circular
                    color="grey-lighten-5"
                    indeterminate
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>

<style scoped>
.logo {
  height: 50px;
  width: 100%;
  /* background-image: url("@/assets/avatar-bg.png"); */
  background-size: contain;
}
</style>
