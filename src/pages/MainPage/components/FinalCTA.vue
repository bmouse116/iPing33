<template>
    <div class="final-cta">
        <div class="container">
            <div class="cta-content">
                <h2 class="title">Начните мониторинг за 60 секунд</h2>
                <p class="subtitle">
                    Регистрация бесплатна и не требует привязки карты. Получите полное спокойствие, зная, что ваш сайт
                    под надежным наблюдением.
                </p>
                <div class="cta-action">
                    <TheButton class="cta-button" @click="register">Зарегистрироваться бесплатно</TheButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TheButton from "@/components/UI/TheButton.vue";
import { useRouter } from "vue-router";
const router = useRouter()

const register = () => {
    router.push('/register')
}

</script>

<style scoped lang="scss">
.final-cta {
    padding: 120px 0;
    color: #fff;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
}

.cta-content {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 24px;
    padding: 4rem 3rem;
    box-shadow: 0 0 40px rgba(56, 189, 248, 0.1);
}

.title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
}

.subtitle {
    font-size: 1.25rem;
    color: #a0aec0;
    line-height: 1.7;
    margin: 0 auto 2.5rem auto;
    max-width: 600px;
}

.cta-action {
    :deep(.cta-button) {
        // padding: 18px 48px;
        //font-size: 1.25rem;
        border-radius: 30px;
        animation: pulse 2s infinite;
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
    }

    50% {
        transform: scale(1.05);
        box-shadow: 0 0 35px rgba(56, 189, 248, 0.7);
    }

    100% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
    }
}


@media (max-width: 768px) {
    .title {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 1rem;
    }

    .cta-content {
        padding: 3rem 1.5rem;
    }

    :deep(.cta-button) {
        padding: 16px 32px;
        font-size: 1rem;
    }
}
</style>