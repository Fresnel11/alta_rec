<template>
    <div class="bg-[#f9fefa] border border-[#0F5B5D]  shadow-lg rounded-lg w-full max-w-3xl  p-8 overflow-auto">
            <h2 class="text-xl font-semibold text-[#008080] text-center mb-2">Alta Rec</h2>
            <p class="text-sm mb-4">
                Alta Rec, by <a href="https://alta-voce.tech/" class="text-[#008080] underline">Alta voce</a>, let you apply transformations
                on audio samples for research and experimentation purpose.
            </p>
            <p class="text-sm">
                Internally, it uses <a href="https://alta-voce.tech/sdk/" class="text-[#008080] underline">Pyvoimo</a>
                (<a href="http://voimooo.alta-voce.tech/python/" class="text-[#008080] underline">documentation</a>), a Python SDK.
            </p>
        </div>
</template>

<script setup>
// Aucun script nécessaire pour ce composant simple
</script>

<style scoped>
/* Importer la police Montserrat pour le titre */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');

/* Importer la police Inter Regular pour les textes simples */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
p {
    font-family: 'Inter', sans-serif;
}
</style>