<template>
    <div class="header">
        <div class="logo">
            <img src="../assets/img/logo.svg" alt="">
        </div>
        <div class="links">
            <a @click="focusInput">Отследить сайт</a>
            <a href="">Инструменты</a>
        </div>
        <div class="actions">
            <TheButton>Вход</TheButton>
            <TheButton>Регистрация</TheButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { focusStore } from '@/store/focusStore';
import TheButton from './UI/TheButton.vue';
const store = focusStore()
const focusInput = () => {
    store.focusing = true
}
</script>

<style scoped lang="scss">
.header {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;

    .actions {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .links {
        display: flex;
        align-items: center;
        gap: 70px;
    }
}
</style>