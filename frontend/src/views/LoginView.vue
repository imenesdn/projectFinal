<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()

const data = ref({ courriel: '', motDePasse: '' })

const submit = async () => {
    await authStore.login(data.value)
}

</script>

<template>
    <div class="">
        <v-container class="pa-md-10 pa-sm-2">
            <v-row align="center" justify="center">
                <v-col class="pa-10" cols="12" md="6">
                    <v-card class="mx-auto pa-5" width="500">
                        <h4 class="text-h4 text-center mb-3">Connexion</h4>
                        <v-form fast-fail @submit.prevent @submit="submit">
                            <v-text-field variant="outlined" v-model="data.courriel" type="email"
                                :rules="[(e) => !!e || 'This field is required']" label="Courriel"></v-text-field>
                            <v-text-field variant="outlined" type="password" v-model="data.motDePasse"
                                :rules="[(e) => !!e || 'This field is required']" label="Mot de passe"></v-text-field>

                            <v-btn class="mt-1 bg-primary" type="submit" block>Connexion</v-btn>
                        </v-form>
                    </v-card>

                </v-col>

            </v-row>
        </v-container>
    </div>


</template>

<style scoped></style>