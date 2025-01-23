<template>

    <!-- Card Container -->
    <div
        class="bg-[#f9fefa] border border-[#0F5B5D] shadow-md rounded-md w-full max-w-3xl min-h-[90vh] p-8 overflow-auto">
        <!-- Card Content -->
        <slot>
            <!-- Titre centré avec police Montserrat -->
            <h2 class="text-xl font-semibold text-[#008080] mb-6 text-center"
                style="font-family: 'Montserrat', sans-serif;">
                Choose your audio input
            </h2>

            <!-- Liste des options avec inputs radio -->
            <ul class="space-y-4">
                <li class="flex items-center">
                    <input type="radio" id="upload-file" name="audio-input" value="upload-file"
                        class="form-radio h-5 w-5 text-[#008080] focus:ring-[#008080] cursor-pointer"
                        v-model="selectedOption" />
                    <label for="upload-file" class="ml-3 text-sm font-normal ">
                        Upload a file (raw, wav, or mp3)
                    </label>
                </li>
                <FileUploader v-if="selectedOption === 'upload-file'" />

                <li class="flex items-center">
                    <input type="radio" id="record-microphone" name="audio-input" value="record-microphone"
                        class="form-radio h-5 w-5 text-[#008080] focus:ring-[#008080] cursor-pointer"
                        v-model="selectedOption" />
                    <label for="record-microphone" class="ml-3 text-sm font-normal ">
                        Record from microphone
                    </label>
                </li>
                <!-- Affichage du composant d'enregistrement si 'record-microphone' est sélectionné -->
                <StartRecording v-if="selectedOption === 'record-microphone'"
                    @recording-finished="onRecordingFinished" />

                <li class="flex items-center">
                    <input type="radio" id="generate-text" name="audio-input" value="generate-text"
                        class="form-radio h-5 w-5 text-[#008080] focus:ring-[#008080] cursor-pointer"
                        v-model="selectedOption" />
                    <label for="generate-text" class="ml-3 text-sm font-normal ">
                        Generate from text
                    </label>
                </li>
                <!-- Affichage du composant de génération de voix si 'generate-text' est sélectionné -->
                <TextToSpeech @audioGenerated="handleAudioGenerated" v-if="selectedOption === 'generate-text'" />
            </ul>

            <hr class="my-8">

            <div v-if="audioUrl" class="flex flex-col items-center gap-6">
                <h2 class="text-xl font-semibold text-[#008080] mb-6 text-center"
                    style="font-family: 'Montserrat', sans-serif;">
                    Current audio input
                </h2>
                <div class="-mt-4 flex items-center gap-4 justify-center w-full">
                    <!-- Lecteur audio -->
                    <audio :src="audioUrl" controls
                        class="w-[70%] sm:w-full md:w-[60%] base:w-[50%] xl:w-[40%] rounded-md"></audio>
                    <!-- Bouton de téléchargement -->
                    <a :href="audioUrl" download="audio-recording.ogx"
                        class="px-2 py-1 bg-[#008080] text-white rounded-md flex items-center gap-2">
                        Download Audio
                        <svg-icon type="mdi" :path="mdiCloudDownloadOutline" class="text-white" />
                    </a>
                </div>
            </div>

            <hr v-if="audioUrl" class="my-8">

            <div>
                <h2 class="text-xl font-semibold text-[#008080] mb-6 text-center"
                    style="font-family: 'Montserrat', sans-serif;">
                    Choose your transformation and processing options
                </h2>
                <Transformation class="mt-8"
                    @transformation-selected="(transformation, outputFormat) => { selectedTransformation = transformation; addAudio('TTS.wav', transformation, outputFormat, 'path/to/audio.wav') }"
                    @toggle-custom-options="handleToggleCustomOptions" />
            </div>

            <hr class="my-8">

            <div>
                <a class="text-[#008080] underline text-xl" href="">Reset Params</a>
                <div v-if="selectedTransformation === 'Custom'">
                    <CustomOptions />
                </div>
                <div v-else-if="selectedTransformation === 'Smile'">
                    <SmileOptions />
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <!-- Bouton Process Audio -->
                    <button :disabled="!audioUrl" @click="onProcessAudio"
                        class="px-4 py-1 text-sm text-white bg-[#008080] rounded-md flex items-center disabled:bg-[#30adad] disabled:cursor-not-allowed">
                        Process Audio
                    </button>

                    <!-- Conteneur des barres de chargement avec espace réservé -->
                    <div class="flex items-center gap-1 min-w-[80px] h-[20px]">
                        <div v-if="isLoading" class="loading flex items-center gap-1 min-w-[10px] translate-y-[2px]">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="my-8">

            <div v-if="audioList.length === 0" class="text-center">
                <p class="text-[#008080] text-xl font-semibold" style="font-family: 'Montserrat', sans-serif;">
                    Download generated files
                </p>
                <p class="mt-2">Nothing to display.</p>
            </div>

            <div v-if="isAudioProcessed && audioList.length > 0" class="text-center">
                <p class="text-[#008080] text-xl font-semibold" style="font-family: 'Montserrat', sans-serif;">
                    Download generated files
                </p>
                <AudioTable :audioList="audioList" @removeAudio="removeAudio" />
            </div>

        </slot>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import FileUploader from '@/components/FileUploader.vue';
import StartRecording from '@/components/StartRecording.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import Transformation from '@/components/Transformation.vue';
import AudioTable from '../components/AudioTable.vue';
import CustomOptions from '../components/CustomOptions.vue';
import SmileOptions from '../components/SmileOptions.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCloudDownloadOutline } from '@mdi/js';

const selectedOption = ref('generate-text'); // Gestion de l'option sélectionnée
const audioUrl = ref(null);
const audioList = ref([]);
const nextId = ref(1);
const isLoading = ref(false);
const selectedTransformation = ref(null);
const showCustomOptions = ref(false);
const isAudioProcessed = ref(false);

function handleToggleCustomOptions(shouldShow) {
    showCustomOptions.value = shouldShow;
    console.log('Custom Options visibility toggled:', shouldShow);
}

function addAudio(inputFile, transformation, outputFormat, outputUrl) {
    audioList.value.push({
        id: nextId.value++,
        inputFile: inputFile || 'TTS.wav',
        transformation,
        outputFormat,
        outputUrl,
    });
    console.log('Transformation:', transformation);
    console.log('Output Format:', outputFormat);
    // Exemple : Ajouter l'audio transformé
}

function removeAudio(index) {
    audioList.value.splice(index, 1);
}

// Fonction pour recevoir l'URL de l'audio depuis l'enfant
function onRecordingFinished(url) {
    audioUrl.value = url;
}

const handleAudioGenerated = (url) => {
    audioUrl.value = url;
};

function onProcessAudio() {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        addAudio('TTS.wav', 'Smile', 'mp3', 'path/to/processed/audio.mp3');
        isAudioProcessed.value = true;
    }, 2000);
}
</script>

<style scoped>
/* Importer la police Montserrat pour le titre */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');

/* Importer la police Inter Regular pour les textes simples */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');

/* Appliquer la police Inter aux textes simples */
body,
label,
p,
a,
button {
    font-family: 'Inter', sans-serif;
}

.loading {
    --speed-of-animation: 0.9s;
    --gap: 6px;
    --first-color: #008080;
    --second-color: #008080;
    --third-color: #008080;
    --fourth-color: #008080;
    --fifth-color: #008080;
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
    background: var(--second-color);
    animation-delay: -0.8s;
}

.loading span:nth-child(3) {
    background: var(--third-color);
    animation-delay: -0.7s;
}

.loading span:nth-child(4) {
    background: var(--fourth-color);
    animation-delay: -0.6s;
}

.loading span:nth-child(5) {
    background: var(--fifth-color);
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
