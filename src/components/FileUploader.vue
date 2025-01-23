<template>
    <div class="flex flex-col items-center gap-4 p-4">
        <!-- Zone de fichier -->
        <div
            class="w-full max-w-lg px-4 py-2 bg-white rounded-md flex flex-col md:flex-row items-center justify-between relative file">
            <p class="text-1xl text-black truncate w-full md:w-auto">
                <span>{{ selectedFileName || 'Choisir un fichier' }}</span>
            </p>
            <!-- Champ fichier -->
            <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                :accept="acceptedFileTypes" />
            <!-- Bouton upload -->
            <button
                @click="handleUpload"
                class="px-2 py-1 text-white bg-[#008080] rounded-md flex items-center gap-2"
                :disabled="!selectedFile">
                <svg-icon type="mdi" :path="mdiCloudUploadOutline"></svg-icon>
                Upload
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCloudUploadOutline } from '@mdi/js';

const props = defineProps({
    acceptedFileTypes: {
        type: String,
        default: '*' // ex: '.pdf,.doc,.docx'
    }
})

const emit = defineEmits(['file-selected', 'upload'])

const fileInput = ref(null)
const selectedFile = ref(null)
const selectedFileName = ref('')

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        selectedFile.value = file
        selectedFileName.value = file.name
        emit('file-selected', file)
    }
}

const handleUpload = () => {
    if (selectedFile.value) {
        emit('upload', selectedFile.value)
    }
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
p {
    font-family: 'Inter', sans-serif;
}

/* Styles personnalisés */
.file {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>
