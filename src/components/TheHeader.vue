<template>
    <header class="header">
        <div class="logo">
            <img src="../assets/img/logo.svg" alt="iPing33 Logo" />
        </div>
        <nav class="links">
            <a @click="focusInput">Отследить сайт</a>
            <a href="#" @click.prevent="scrollToInstruments">Инструменты</a>
        </nav>
        <div class="actions">
            <template v-if="!userStore.user">
                <TheButton @click="login" btn-type="secondary">Вход</TheButton>
                <TheButton @click="register">Регистрация</TheButton>
            </template>

            <!-- Если пользователь авторизован -->
            <template v-else>
                <TheButton @click="goToProfile">{{ userStore.user.name }}</TheButton>
            </template>
        </div>
    </header>
</template>

<script setup lang="ts">
import { focusStore } from "@/store/focusStore";
import TheButton from "./UI/TheButton.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
const store = focusStore();
const userStore = useUserStore()
const focusInput = () => {
    store.focusing = true;
};

const router = useRouter()

const register = () => {
    router.push('/register')
}
const login = () => {
    router.push('/login')
}

const goToProfile = () => {
    router.push('/lk')
}

const scrollToInstruments = () => {
    const el = document.querySelector('#instruments');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<style scoped lang="scss">
.header {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(56, 189, 248, 0.2);

    padding: 15px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
    transition: background 0.3s ease;
}

.logo {
    img {
        height: 40px;
        transition: filter 0.3s ease;
    }

    &:hover img {
        filter: drop-shadow(0 0 5px rgba(56, 189, 248, 0.7));
    }
}

.links {
    display: flex;
    align-items: center;
    gap: 60px;

    a {
        color: #cbd5e1;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        padding: 10px 0;
        position: relative;
        transition: color 0.3s ease;

        &::after {
            content: '';
            position: absolute;
            width: 0%;
            height: 2px;
            background-color: #38bdf8;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            transition: width 0.3s ease;
        }

        &:hover {
            color: #ffffff;

            &::after {
                width: 100%;
            }
        }
    }
}

.actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

:deep(.btn-secondary) {
    background: transparent !important;
    border: 1px solid #38bdf8;
    color: #38bdf8;

    &:hover {
        background: rgba(56, 189, 248, 0.15) !important;
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
    }
}
</style>
