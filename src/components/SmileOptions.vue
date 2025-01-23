<template>
    <div class="space-y-6 p-4">
        <!-- Smile effect -->
        <div>
            <label class="block text-base font-medium ">Smile effect</label>
            <div class="flex items-center space-x-4 mt-2">
                <input type="range"  max="1.3" step="0.1" v-model="smileEffect"
                    class="flex-1  h-2 bg-gray-300 rounded-lg">
                <input type="number" v-model="smileEffect" min="1" max="1.3"
                    class="w-16 p-1 border border-gray-300 rounded text-center">
                <button @click="resetsmileEffect" class="text-[#008080] underline text-base">Reset</button>
            </div>
            <p class="text-base mt-1">Alpha parameter of the smile effect. The bigger the value, the more smily should
                be the effect</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Variables pour les sliders
const smileEffect = ref(1);

// Fonctions de reset
function resetsmileEffect() {
    smileEffect.value = 1;
}

</script>

<style scoped>
/* Importer la police Montserrat pour le titre */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');

/* Importer la police Inter Regular pour les textes simples */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');

/* Styles supplémentaires pour les sliders si nécessaire */
input[type="range"] {
    transition: all 0.2s ease;
}

input[type="range"]:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 128, 128, 0.5);
}


/* Appliquer la police Inter aux textes simples */
body,
label,
p,
a,
button {
    font-family: 'Inter', sans-serif;
}

p {
    font-style: italic;
    text-align: justify;
}

label {
    font-weight: 600;
}
</style>