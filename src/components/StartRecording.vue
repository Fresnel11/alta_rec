<template>
    <div class="flex flex-col sm:flex-row items-center w-full -space-y-8 sm:-space-y-0">
        <!-- Boutons d'enregistrement -->
        <button v-if="!isRecording" @click="startRecording"
            class="px-2 py-1 bg-[#008080] text-white rounded-md flex items-center gap-1 w-full sm:w-auto justify-center text-center">
            Start Recording
            <svg-icon type="mdi" :path="mdiMicrophone" class="transition-all duration-300" />
        </button>

        <button v-if="isRecording" @click="stopRecording"
            class="px-2 py-1 bg-[#008080] text-white rounded-md flex items-center gap-1 w-full sm:w-auto justify-center text-center">
            Stop Recording
            <svg-icon type="mdi" :path="mdiRecordCircle" class="animate-pulse text-red-600" />
        </button>

        <!-- Indicateur d'enregistrement -->
        <div class="loading flex items-center gap-1 min-w-[10px] translate-y-[18px] sm:translate-y-0">
            <span v-if="isRecording"></span>
            <span v-if="isRecording"></span>
            <span v-if="isRecording"></span>
            <span v-if="isRecording"></span>
            <span v-if="isRecording"></span>
        </div>

        <!-- Timer -->
        <span v-if="isRecording" class="text-gray-800 translate-y-[18px] sm:translate-y-0 text-lg min-w-[50px] text-center">
            {{ isRecording ? formatTime(elapsedTime) : '00:00' }}
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMicrophone, mdiRecordCircle } from '@mdi/js';

// Déclaration des variables et fonctions
let mediaRecorder;
let audioChunks = [];
const isRecording = ref(false);
const audioUrl = ref(null);
const elapsedTime = ref(0);
let timerInterval;

// Définition de l'événement d'émission pour le parent
const emit = defineEmits();

const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        audioUrl.value = URL.createObjectURL(audioBlob);
        emit('recording-finished', audioUrl.value); // Envoi de l'audio au parent
    };
    mediaRecorder.start();
    isRecording.value = true;
    startTimer();
};

const stopRecording = () => {
    mediaRecorder.stop();
    isRecording.value = false;
    stopTimer();
};

// Fonction du timer
const startTimer = () => {
    elapsedTime.value = 0;
    timerInterval = setInterval(() => {
        elapsedTime.value++;
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timerInterval);
};

// Formatage du temps (mm:ss)
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
};
</script>

<style scoped>
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
    0%, 40%, 100% {
        transform: scaleY(0.05);
    }
    20% {
        transform: scaleY(1);
    }
}
</style>
