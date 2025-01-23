<template>
    <div class="space-y-6 p-4">
        <!-- Pitch Scaling -->
        <div>
            <label class="block text-base font-medium ">Pitch scaling</label>
            <div class="flex items-center space-x-4 mt-2">
                <input type="range" min="0" max="10" step="0.1" v-model="pitchScaling"
                    class="flex-1  h-2 bg-gray-300 rounded-lg">
                <input type="number" v-model="pitchScaling" max="10"
                    class="w-16 p-1 border border-gray-300 rounded text-center">
                <button @click="resetPitchScaling" class="text-[#008080] underline text-base">Reset</button>
            </div>
            <p class="text-base mt-1">Pitch scaling coefficient. This should not go above ps_max.</p>
        </div>
        <hr class="my-8">
        <!-- Preserve Envelope -->
        <div class="flex items-center justify-between  mt-2">
            <label class="text-base font-medium">Preserve envelope</label>
            <input type="checkbox" v-model="preserveEnvelope" class="w-5 h-5 ml-auto">
        </div>
        <div class="mt-2">
            <p class="text-base">When a pitch scaling is applied, preserve the spectral envelope as is.</p>
        </div>

        <hr class="my-8">
        <!-- Frequency Warping -->
        <div>
            <label class="block text-base font-medium ">Frequency warping</label>
            <div class="flex items-center space-x-4 mt-2">
                <input type="range" min="-1" max="1" step="0.1" v-model="frequencyWarping"
                    class="flex-1  h-2 bg-gray-300 rounded-lg">
                <input type="number" max="1" v-model="frequencyWarping"
                    class="w-16 p-1 border border-gray-300 rounded text-center">
                <button @click="resetFrequencyWarping" class="text-[#008080] underline text-base">Reset</button>
            </div>
            <p class="text-base mt-1">
                Frequency warping coefficient. This warps the amplitude spectral envelope of the spectrum (push the
                smooth shapes higher (with fw&#x276F;1.0), or lower (with fw&#x276E;1.0)). </p>
        </div>
        <hr class="my-8">
        <!-- Smile effect -->
        <div>
            <label class="block text-base font-medium ">Smile effect</label>
            <div class="flex items-center space-x-4 mt-2">
                <input type="range" min="-1" max="1" step="0.1" v-model="baseileEffect"
                    class="flex-1  h-2 bg-gray-300 rounded-lg">
                <input type="number" v-model="baseileEffect" max="1"
                    class="w-16 p-1 border border-gray-300 rounded text-center">
                <button @click="resetbaseileEffect" class="text-[#008080] underline text-base">Reset</button>
            </div>
            <p class="text-base mt-1">Alpha parameter of the smile effect. The bigger the value, the more smily should
                be the effect. 1 is the original, &#x276E;1 will unsmile. </p>
        </div>
        <hr class="my-8">
        <!-- Intelligibility Effect -->
        <div>
            <label class="block text-base font-medium ">Intelligibility effect</label>
            <div class="flex items-center space-x-4 mt-2">
                <input type="range" min="0" max="1" step="0.1" v-model="intelligibilityEffect"
                    class="flex-1  h-2 bg-gray-300 rounded-lg">
                <input type="number" max="1" v-model="intelligibilityEffect"
                    class="w-16 p-1 border border-gray-300 rounded text-center">
                <button @click="resetIntelligibilityEffect" class="text-[#008080] underline text-base">Reset</button>
            </div>
            <p class="text-base mt-1">Size effect of the Intelligibility effect, 0.0 means no effect, 1.0 is maximum
                effect</p>
        </div>
        <hr class="my-8">
        <!-- Denoiser Effect -->
        <div>
            <label class="block text-base font-medium ">Denoiser effect</label>
            <div class="flex items-center space-x-4 mt-2">
                <input type="range" min="-128" max="128" step="1" v-model="denoiserEffect"
                    class="flex-1  h-2 bg-gray-300 rounded-lg">
                <input type="number" max="128" v-model="denoiserEffect"
                    class="w-16 p-1 border border-gray-300 rounded text-center">
                <button @click="resetDenoiserEffect" class="text-[#008080] underline text-base">Reset</button>
            </div>
            <p class="text-base mt-1">Bias, in dB for the automatic audio level of the Denoiser effect. The higher the
                value, the more denoised the sound.</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Variables pour les sliders
const pitchScaling = ref(1);
const preserveEnvelope = ref(false);
const frequencyWarping = ref(0);
const baseileEffect = ref(1);
const intelligibilityEffect = ref(0);
const denoiserEffect = ref(-128);

// Fonctions de reset
function resetPitchScaling() {
    pitchScaling.value = 1;
}

function resetFrequencyWarping() {
    frequencyWarping.value = 0;
}

function resetbaseileEffect() {
    baseileEffect.value = 1;
}

function resetIntelligibilityEffect() {
    intelligibilityEffect.value = 0;
}

function resetDenoiserEffect() {
    denoiserEffect.value = -128;
}

// Fonction pour traiter l'audio
function processAudio() {
    console.log('Processing audio with settings:', {
        pitchScaling: pitchScaling.value,
        preserveEnvelope: preserveEnvelope.value,
        frequencyWarping: frequencyWarping.value,
        baseileEffect: baseileEffect.value,
        intelligibilityEffect: intelligibilityEffect.value,
        denoiserEffect: denoiserEffect.value,
    });
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