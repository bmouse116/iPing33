<template>
    <div class="main-search container">
        <div class="input" :class="{ 'scrolled-away': isScrolled }">
            <div class="description">
                <h1>iPing33 - многофункциональный сервис мониторинга доступности сайтов</h1>
                <h4>Введите URL сайта для изучения его статуса, информации и доступности</h4>
                <h4>Авторизуйтесь для получения более детальной статистики</h4>
            </div>
            <TheInput placeholder-text="Введите URL" />
        </div>
        <div class="image-group">
            <img src="/src/assets/img/042.svg" alt="" class="img-1">
            <img src="/src/assets/img/042.svg" alt="" class="img-2">
            <img ref="firstPlanetRef" src="/src/assets/img/042.svg" alt="" class="img-3">
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import TheInput from './UI/TheInput.vue';

const isScrolled = ref(false);
const firstPlanetRef = ref<HTMLImageElement | null>(null);

const handleScroll = () => {
    if (!firstPlanetRef.value) {
        return;
    }

    const planetRect = firstPlanetRef.value.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.1;

    if (planetRect.top < triggerPoint) {
        isScrolled.value = true;
    } else {
        isScrolled.value = false;
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.main-search {
    .image-group {
        position: relative;
        width: 1000px;
        height: 100%;

        img {
            position: absolute;

            &.img-1 {
                right: 0;
                top: 50vh;
                z-index: 1;
                width: 250px;
                height: 250px;
            }

            &.img-2 {
                top: 80vh;
                z-index: 3;
                left: 10%;
                width: 400px;
                height: 400px;
            }

            &.img-3 {
                top: 100vh;
                left: 70%;
                z-index: 3;
                width: 500px;
                height: 500px;
            }
        }
    }

    .input {
        position: fixed;
        top: 20vh;
        left: 50%;
        transform: translateX(-50%);
        width: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        z-index: 2;
        transition: opacity 0.5s ease-out, transform 0.5s ease-out; // Плавный переход

        // Класс, который будет применяться при скролле
        &.scrolled-away {
            opacity: 0; // Делаем элемент прозрачным
            transform: translateX(-50%) translateY(-50px); // Смещаем немного вверх для эффекта "улетания"
            pointer-events: none; // Отключаем возможность взаимодействия с невидимым элементом
        }

        .description {
            text-align: center;
            color: var(--white);
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        input {
            z-index: 2;
        }
    }
}
</style>