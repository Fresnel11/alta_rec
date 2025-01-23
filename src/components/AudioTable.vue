<template>
    <div class="mt-8 overflow-x-auto">
        <table class="w-full border-collapse text-sm text-left">
            <thead class="bg-[#008080] text-white">
                <tr>
                    <th class="p-2">ID</th>
                    <th class="p-2">Input File</th>
                    <th class="p-2">Transformation</th>
                    <th class="p-2">Output</th>
                    <th class="p-2"></th>
                    <th class="p-2">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(audio, index) in audioList" :key="audio.id" class="hover:bg-gray-100">
                    <td class="p-2">{{ audio.id }}</td>
                    <td class="p-2">{{ audio.inputFile }}</td>
                    <td class="p-2">{{ audio.transformation }}</td>
                    <td class="p-2">
                        <a :href="audio.outputUrl" download
                            class="px-2 py-1 bg-[#008080] text-white rounded-md text-xs">
                            Download
                        </a>
                    </td>
                    <td>
                        <span v-if="audio.outputFormat === 'RAW (20kHz, 8 bits)'">
                            Not playable
                        </span>
                        <audio v-else :src="audio.outputUrl" controls class="w-48"></audio>
                    </td>
                    <td class="p-2 text-center">
                        <button @click="removeAudio(index)"
                            class="px-2 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700">
                            Remove
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    audioList: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['removeAudio']);

function removeAudio(index) {
    emit('removeAudio', index);
}
</script>

<style scoped>
table th,
table td {
    text-align: left;
    font-family: 'Inter', sans-serif;
}
</style>
