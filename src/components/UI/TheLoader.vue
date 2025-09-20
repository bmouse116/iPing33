<template>
    <div :style="{ width: size, height: size }" class="spinner"></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    size?: string
}>();

const size = props.size || '24px';
</script>

<style scoped lang="scss">
.spinner {
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: #38bdf8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
