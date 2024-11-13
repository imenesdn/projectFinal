<script setup>
import { computed, onMounted, ref } from 'vue'
import { useProductStore } from '../stores/product';
import { useAuthStore } from '../stores/auth';
import { baseUrl } from '../services/axios';

const productStore = useProductStore()
const authStore = useAuthStore()

const icons = ref([
    'mdi-linkedin',
    'mdi-email',
    'mdi-github',
    'mdi-facebook',
])

const email = ref('')

onMounted(async () => {
    await productStore.getPaniers()
})

const updateQuantity = async (p_id, quantite) => {
    try {
        const res = await productStore.updateQuantity(p_id, quantite)
        authStore.showSnack(res?.message)
        await productStore.getPaniers()
    }
    catch (err) {
        authStore.showSnack(err?.data?.message)
    }
}

const removeItem = async (p_id) => {
    try {
        const res = await productStore.removeItem(p_id)
        authStore.showSnack(res?.message)
        await productStore.getPaniers()
    }
    catch (err) {
        authStore.showSnack(err?.data?.message)
    }
}

const reset = async () => {
    try {
        const res = await productStore.resetPanier()
        authStore.showSnack(res?.message)
        await productStore.getPaniers()
    }
    catch (err) {
        authStore.showSnack(err?.data?.message)
    }
}
const place = async () => {
    try {
        const res = await productStore.place()
        authStore.showSnack(res?.message)
        await productStore.getPaniers()
    }
    catch (err) {
        authStore.showSnack(err?.data?.message)
    }
}

const gTotal = computed(() =>
    productStore.paniers.reduce((accumulator, current) => {
        return accumulator + current.prixTotal;
    }, 0)
)

</script>

<template>

    <div>
        <v-container class="px-2 py-5">
            <v-row>
                <v-col cols="12">
                    <h2 class="pb-1 text-h4 font-weight-medium text-grey-darken-3">Panier</h2>
                    <hr class="shortLine">
                </v-col>
            </v-row>
            <v-row class="pa-0 ma-0">
                <v-col cols="1 text-h6">
                    Produits
                </v-col>
                <v-col cols="3 text-h6">
                    Nom
                </v-col>
                <v-col cols="2 text-h6">
                    Prix
                </v-col>
                <v-col cols="2 text-h6">
                    Quantite
                </v-col>
                <v-col cols="2 text-h6">
                    Total
                </v-col>
                <v-col cols="2 text-h6">
                    Action
                </v-col>
            </v-row>

            <v-row class="ma-0 pa-0" align="center" v-for="(item, idx) in productStore.paniers" :key="idx"
                style="border-bottom: 1px solid #ebebeb;">
                <v-col cols="1">
                    <img class="rounded" width="50" :src="`${baseUrl + item.produit.cheminImage}`" />
                </v-col>
                <v-col cols="3">
                    {{ item.produit.nom }}

                </v-col>
                <v-col cols="2">
                    ${{ item.produit.prix }}
                </v-col>
                <v-col cols="2" class="d-flex items-center " style="gap: 10px;">
                    <v-btn :disabled="item.quantite < 2" density="compact" color="primary"
                        style="color: white !important;"
                        @click="updateQuantity(item.produit.produitId, item.quantite - 1)" class=" text-white"
                        icon="mdi-minus"></v-btn>
                    <div style="width: 30px;">
                        <input :value="item.quantite" readonly="true"
                            style="width: 30px;height: 30px;border: 1px solid grey;text-align: center;" type="number" />
                    </div>
                    <v-btn @click="updateQuantity(item.produit.produitId, item.quantite + 1)" density="compact"
                        color="primary" style="color: white !important;" class=" text-white" icon="mdi-plus"></v-btn>

                </v-col>
                <v-col cols="2">
                    ${{ item.prixTotal }}
                </v-col>
                <v-col cols="2">
                    <v-btn @click="removeItem(item.produit.produitId)" density="compact" color="red"
                        style="color: white !important;" class=" text-white" icon="mdi-close"></v-btn>
                </v-col>
            </v-row>

            <v-row class="mt-8" align="center">
                <v-col cols="8">
                    <v-text-field style="width: 80%;" v-model="email" label="Enter votre addresse" rounded
                        variant="outlined">
                        <template v-slot:append-inner>
                            <v-btn color="primary"> Submit</v-btn>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <div class="text-right">

                        <v-btn :disabled="productStore.paniers.length < 1" @click="reset" color="primary" round>EFFACER
                            PANIER </v-btn>
                    </div>
                    <v-divider class="my-3" color="primary"></v-divider>
                    <div>
                        <div class="d-flex item-center justify-space-between mb-2">
                            <div>
                                Addition
                            </div>
                            <div class="font-weight-bold">
                                ${{ gTotal }}
                            </div>
                        </div>
                        <div class="d-flex item-center justify-space-between mb-2">
                            <div>
                                Livraison
                            </div>
                            <div class="font-weight-bold">
                                $0
                            </div>
                        </div>
                        <div class="d-flex item-center justify-space-between mb-2">
                            <div>
                                Addition
                            </div>
                            <div class="font-weight-bold">
                                ${{ gTotal }}
                            </div>
                        </div>
                        <div class="text-right">
                            <v-btn @click="place" :disabled="productStore.paniers.length < 1" color="primary"
                                size="small">Payez</v-btn>
                        </div>

                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>

<style scoped>
.shortLine {
    width: 80px;
    border: 1px solid #444;
    margin-left: 0px;
}

.Card:hover {
    transform: scale(1.01);
    transition: transform 0.2s ease-in-out;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
    /* Firefox */
}
</style>