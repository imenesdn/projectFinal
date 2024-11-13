<script setup>
import { computed, ref } from 'vue'
import { projectMetaData } from "@/components/projects/projectMeta";
const data = ref(projectMetaData)

const props = defineProps({
  projectTitle: String,
  coverImg: String,
  projectComponent: Object,
  themeColor: String,
  id: String,
})

const currentProjectIndex = computed(() => (projectMetaData.findIndex( project => project.id === props.id)))
const prevProjectId = computed(() => (data.value[currentProjectIndex.value-1]?.id))
const nextProjectId = computed(() => (data.value[currentProjectIndex.value+1]?.id))
// console.log(prevProjectId.value, nextProjectId.value)

const items = computed(() => [
  {
    text: 'Home',
    disabled: false,
    to: '/',
  },
  {
    text: 'Projects',
    disabled: false,
    to: '/',
  },
  {
    text: props.projectTitle,
    disabled: true,
    to: '#',
  },
])

</script>

<template>

  <v-card
  :color=" themeColor||'#E5ECF7'"
  rounded="0"
  elevation="0"
  >
    <v-container
    align="center"
    justify="center"
    height="400"
    >
      <!-- <div 
      class="coverImg"
      :style="{backgroundImage: 'url(' + coverImg ?? 'https://cdn.vuetifyjs.com/images/parallax/material.jpg' +')'}"
      ></div> -->

      <v-parallax 
      :src="coverImg || 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'"
      height="400"
      scale="1"
      transition="false"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-parallax>

    </v-container>
  </v-card>

  <v-card
  class="mx-auto"
  rounded="0"
  flat
  >
    <v-container class="pa-md-10 pa-sm-2 text-grey-darken-3">
      <v-row>
        <v-col cols="12" class="pa-10">
          <div>
            <v-breadcrumbs
              :items="items"
              large
            ></v-breadcrumbs>
          </div>

          <v-card-title class="text-h5">
            {{ projectTitle || 'Project Title'}}
          </v-card-title>
          
            <component :is="projectComponent" />
          
        </v-col>
      </v-row>
    </v-container>
  </v-card>


  <!-- <div>
    <h1>{{ projectTitle }}</h1>
    <component :is="projectComponent" />
  </div> -->

  <v-card
  class="mx-auto"
  rounded="0"
  flat
  >
    <v-card-actions class="justify-center">
      <router-link 
      :to="`/project/${prevProjectId}`" 
      class="text-decoration-none"
      custom
      v-slot="{ navigate }"
      >
        <v-btn
        :disabled=" !prevProjectId " 
        class="text-grey-darken-4"
        @click="navigate"
        >
          <v-icon
            large
          >
            mdi-chevron-left
          </v-icon>
          prev - {{prevProjectId ?? "No Project"}}
        </v-btn>
      </router-link>
      <v-icon
        large
        class="ml-1"
      >
        mdi-circle-small
      </v-icon>
      <router-link 
      :to="`/project/${nextProjectId}`" 
      class="text-decoration-none"
      custom
      v-slot="{ navigate }"
      >
        <v-btn 
        :disabled=" !nextProjectId "
        class="text-grey-darken-4"
        @click=" navigate "
        >
          {{nextProjectId  ?? "No Project"}} - next
          <v-icon
            large
          >
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>

</template>

<style lang="scss" scoped>
.coverImg{
  width: 80%;
  height: 400px;
  background-size: cover;
}
</style>