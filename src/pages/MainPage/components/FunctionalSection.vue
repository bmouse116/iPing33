<template>
    <div class="functional" ref="mainRef">
        <div class="container">
            <h2 class="title">Исследуйте нашу функциональную галактику</h2>
            <p class="subtitle">
                Все необходимые инструменты для полного контроля над вашими сайтами, собранные в одном месте.
            </p>
            <div class="functional-grid">
                <div class="feature-card" v-for="(feature, index) in features" :key="index">
                    <!-- НОВАЯ ОБЕРТКА ЗДЕСЬ -->
                    <div class="card-content">
                        <div class="icon-wrapper">
                            <component :is="feature.icon" stroke-width="1.5" />
                        </div>
                        <h3>{{ feature.title }}</h3>
                        <p>{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import {
    IconWorldCheck,
    IconClockHour4,
    IconBellRinging,
    IconGauge,
    IconHistory,
    IconCertificate,
} from '@tabler/icons-vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mainRef = ref<HTMLDivElement | null>(null);

const features = ref([
    {
        icon: IconClockHour4,
        title: 'Мониторинг доступности 24/7',
        description: 'Автоматические проверки доступности вашего сайта каждые 60 секунд. Мы не пропустим ни одного сбоя.',
    },
    {
        icon: IconWorldCheck,
        title: 'Глобальные чекпоинты',
        description: 'Проверяем ваш сайт из разных точек мира, чтобы убедиться, что он доступен для всех пользователей.',
    },
    {
        icon: IconBellRinging,
        title: 'Мгновенные уведомления',
        description: 'Получайте оповещения в Telegram, на Email, как только ваш сайт станет недоступен.',
    },
    {
        icon: IconGauge,
        title: 'Анализ скорости загрузки',
        description: 'Измеряем время ответа сервера и скорость загрузки страницы для оптимизации производительности.',
    },
    {
        icon: IconHistory,
        title: 'Подробные отчеты',
        description: 'Ведем историю всех проверок. Анализируйте аптайм и время отклика с помощью наглядных графиков.',
    },
    {
        icon: IconCertificate,
        title: 'Контроль SSL-сертификата',
        description: 'Мы заранее предупредим вас об истечении срока действия SSL, чтобы ваш сайт всегда был защищен.',
    },
]);
onMounted(() => {
    nextTick(() => {
        if (mainRef.value) {
            const cards = gsap.utils.toArray('.feature-card') as HTMLElement[];

            cards.forEach(card => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            });
        }
    });
});
</script>

<style scoped lang="scss">
.functional {
    padding: 120px 0;
    color: #fff;
    position: relative;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
}

.title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
}

.subtitle {
    font-size: 1.25rem;
    color: #a0aec0;
    max-width: 700px;
    margin: 0 auto 4rem auto;
}

.functional-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
}

.feature-card {
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 16px;
    text-align: left;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
    transform-origin: center;
    will-change: transform;

    &:hover {
        border-color: rgba(56, 189, 248, 0.5);
        box-shadow: 0 0 30px rgba(56, 189, 248, 0.3);
    }
}

.card-content {
    padding: 2.5rem 2rem;
    height: 100%;
}

.icon-wrapper {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
    margin-bottom: 1.5rem;

    svg {
        width: 36px;
        height: 36px;
    }
}

h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
}

p {
    color: #cbd5e1;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .title {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 1rem;
    }

    .functional-grid {
        grid-template-columns: 1fr;
    }
}
</style>