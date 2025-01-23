<template>
    <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
            <label for="selectedOption1" class="text-sm text-black">Transformation</label>
            <select v-model="selectedOption1" @change="emitSelectedOptions"
                class="block w-full p-2 text-sm text-black border border-[#008080] rounded-md shadow-sm focus:outline-none">
                <option v-for="option in options1" :key="option" :value="option" class="text-black">{{ option }}
                </option>
            </select>
        </div>

        <div class="flex-1 min-w-[200px]">
            <label for="selectedOption2" class="text-sm text-black">Output format</label>
            <select v-model="selectedOption2" @change="emitSelectedOptions"
                class="block w-full p-2 text-sm text-black border border-[#008080] rounded-md shadow-sm focus:outline-none">
                <option v-for="option in options2" :key="option" :value="option" class="text-black">{{ option }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Déclaration des événements que le composant peut émettre
const emit = defineEmits(['transformation-selected', 'toggle-custom-options']);

// Options disponibles
const options1 = ref(['Passthrough', 'Custom', 'Smile']);
const options2 = ref(['WAV', 'WAV (20kHz, 8 bits, unsigned)', 'RAW (20kHz, 8 bits)']);

// Valeurs sélectionnées
const selectedOption1 = ref(options1.value[0]);
const selectedOption2 = ref(options2.value[0]);

// Émettre les valeurs sélectionnées au parent
function emitSelectedOptions() {
    emit('transformation-selected', selectedOption1.value, selectedOption2.value);

    // Gérer l'affichage des CustomOptions en fonction de l'option sélectionnée
    if (selectedOption1.value === 'Custom') {
        emit('toggle-custom-options', true); // Afficher CustomOptions
    } else {
        emit('toggle-custom-options', false); // Masquer pour toutes les autres options
    }
}
</script>

<style scoped>
/* Importer la police Inter Regular pour les textes simples */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');

label,
option {
    font-family: 'Inter', sans-serif;
}
</style>
