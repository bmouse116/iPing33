<template>
    <TheHeader />
    <div class="main-page">
        <section class="main-section">
            <MainSearch />
        </section>
    </div>
</template>

<script setup lang="ts">
import MainSearch from '@/components/MainSearch.vue';
import TheHeader from '@/components/TheHeader.vue';

</script>

<style scoped lang="scss">
.main-page {
    .main-section {
        height: 200vh;
        background-image: url('/src/assets/img/Stars\ -\ Start.png');
        background-repeat: repeat;
        background-size: cover;
    }
}
</style>