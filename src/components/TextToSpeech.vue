<template>
    <div class="flex flex-col lg:flex-row items-center lg:gap-8">
        <!-- Champ de texte avec valeur par défaut "Bonjour" -->
        <div class="flex flex-col gap-4 w-full">
            <label for="textInput" class="text-lg text-gray-800">Text</label>
            <textarea
                id="textInput"
                v-model="textInput"
                maxlength="108"
                class="p-2 border border-[#008080] focus:outline-none rounded-md w-full h-12"
            ></textarea>

            <div class="flex flex-col lg:flex-row lg:gap-12 items-center">
                <!-- Sélecteur de langue -->
                <div class="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
                    <label for="voiceSelect" class="text-lg text-gray-800">Voice</label>
                    <select
                        id="voiceSelect"
                        v-model="selectedVoice"
                        class="p-2 border border-[#008080] focus:outline-none rounded-md w-full lg:w-auto"
                    >
                        <option value="French-Renee">French-Renee</option>
                        <option value="English-Allison">English (United States) - Allison</option>
                        <option value="English-Michael">English (United States) - Michael</option>
                        <option value="French-Nicolas">French-Nicolas</option>
                    </select>
                </div>
                <!-- Audio désactivé pour l'instant -->
                <div class="w-full lg:w-auto mt-4 lg:mt-0">
                    <label for="audioToggle" class="text-lg text-gray-800">Example</label>
                    <audio controls class="" disabled></audio>
                </div>
            </div>
        </div>
    </div>

    <!-- Bouton et barre de chargement -->
    <div class="flex flex-col lg:flex-row items-center gap-4 mt-6">
        <button @click="synthetizeSpeech" class="px-2 py-1 text-white bg-[#008080] rounded-md flex items-center gap-2">
            Synthetize
        </button>

        <!-- Barre de chargement visible pendant 5 secondes -->
        <div
            v-if="isLoading"
            class="loading flex items-center gap-1 min-w-[10px] lg:translate-y-[18px]"
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Texte à convertir et sélection de la voix
const textInput = ref('Bonjour');
const selectedVoice = ref('French-Renee');
const emit = defineEmits(['audioGenerated']);

// Variable pour afficher ou masquer la barre de chargement
const isLoading = ref(false);

// URL de l'audio généré
const audioUrl = ref('');

// Fonction pour démarrer l'animation de la barre de chargement et la cacher après 5 secondes
const startLoading = () => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 5000); // La barre se cache après 5 secondes
};

// Fonction pour générer l'audio et envoyer l'URL à la vue principale
const synthetizeSpeech = () => {
    startLoading();

    const synth = window.speechSynthesis;

    if (!synth) {
        console.error('Speech Synthesis API non supportée par ce navigateur.');
        return;
    }

    const voices = synth.getVoices();
    let selected = voices.find((voice) => voice.name === selectedVoice.value);

    if (!selected) {
        selected = voices.find((voice) => voice.lang === 'fr-FR') || voices[0];
    }

    const utterance = new SpeechSynthesisUtterance(textInput.value);
    utterance.voice = selected;

    synth.speak(utterance);

    setTimeout(() => {
        audioUrl.value = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

        emit('audioGenerated', audioUrl.value);
    }, 2000);

    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
};
</script>

<style scoped>
/* Importer la police Montserrat pour le titre */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');

/* Importer la police Inter Regular pour les textes simples */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');

label {
    font-family: 'Inter', sans-serif;
}

.loading {
    --speed-of-animation: 0.9s;
    --gap: 6px;
    --first-color: #008080;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    gap: 6px;
    height: 100px;
}

.loading span {
    width: 4px;
    height: 50px;
    background: var(--first-color);
    animation: scale var(--speed-of-animation) ease-in-out infinite;
}

.loading span:nth-child(2) {
    animation-delay: -0.8s;
}

.loading span:nth-child(3) {
    animation-delay: -0.7s;
}

.loading span:nth-child(4) {
    animation-delay: -0.6s;
}

.loading span:nth-child(5) {
    animation-delay: -0.5s;
}

@keyframes scale {
    0%,
    40%,
    100% {
        transform: scaleY(0.05);
    }

    20% {
        transform: scaleY(1);
    }
}
</style>
