<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const data = ref({
  email: "",
  motPasse: "",
  prenom: "",
  nom: "",
});

const submit = async () => {
  await authStore.register(data.value);
};
</script>

<template>
  <div class="">
    <v-container class="pa-md-10 pa-sm-2">
      <v-row align="center" justify="center">
        <v-col class="pa-10" cols="12" md="6">
          <v-card class="mx-auto pa-5" width="500">
            <h4 class="text-h4 text-center mb-3">Inscription</h4>
            <v-form fast-fail @click="submit" @submit.prevent>
              <v-text-field
                v-model="data.nom"
                :rules="[(e) => !!e || 'This field is required']"
                label="Nom"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="data.prenom"
                :rules="[(e) => !!e || 'This field is required']"
                label="Prenom"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="data.email"
                :rules="[(e) => !!e || 'This field is required']"
                label="Courriel"
                type="email"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="data.motPasse"
                :rules="[(e) => !!e || 'This field is required']"
                label="Mot de passe"
                type="password"
                variant="outlined"
              ></v-text-field>

              <v-btn block class="mt-1 bg-primary" type="submit"
                >Inscription</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
