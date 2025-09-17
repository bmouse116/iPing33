<template>
    <div class="dashboard-preview" ref="sectionRef">
        <div class="container">
            <h2 class="title">От простого статуса до командного центра</h2>
            <p class="subtitle">
                Зарегистрируйтесь, чтобы получить доступ к подробной аналитике, истории проверок и персональным отчетам
                для каждого вашего сайта.
            </p>

            <div class="preview-stage">
                <div class="preview-card main-panel">
                    <h4>Мои проекты</h4>
                    <ul>
                        <li class="site-item active">
                            <span>my-shop.com</span>
                            <span class="status-ok">В сети</span>
                        </li>
                        <li class="site-item">
                            <span>corp-blog.io</span>
                            <span class="status-ok">В сети</span>
                        </li>
                        <li class="site-item">
                            <span>landing-page.pro</span>
                            <span class="status-error">Недоступен</span>
                        </li>
                    </ul>
                </div>

                <div class="preview-card graph-card">
                    <h5>Время отклика (ms)</h5>
                    <img src="@/assets/img/graph-response-time.svg" alt="Response time graph" />
                </div>

                <div class="preview-card uptime-card">
                    <h5>Аптайм за 30 дней</h5>
                    <img src="@/assets/img/pie-chart-uptime.svg" alt="Uptime pie chart" />
                    <span class="uptime-percent">99.98%</span>
                </div>

                <div class="preview-card events-card">
                    <h5>Последние события</h5>
                    <ul>
                        <li>
                            <IconCircleCheck class="icon-status icon-success" />
                            <span>Сайт my-shop.com снова в сети.</span>
                        </li>
                        <li>
                            <IconCircleX class="icon-status icon-error" />
                            <span>Сайт landing-page.pro недоступен.</span>
                        </li>
                        <li>
                            <IconShieldCheck class="icon-status icon-success" />
                            <span>SSL-сертификат для corp-blog.io в порядке.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IconCircleCheck, IconCircleX, IconShieldCheck } from '@tabler/icons-vue';
const sectionRef = ref<HTMLElement | null>(null);


onMounted(() => {
    if (!sectionRef.value) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in-view');
                }
            });
        },
        {
            threshold: 0.7,
        }
    );

    observer.observe(sectionRef.value);

    onUnmounted(() => {
        if (sectionRef.value) {
            observer.unobserve(sectionRef.value);
        }
    });
});
</script>

<style scoped lang="scss">
.dashboard-preview {
    padding: 120px 0;
    color: #fff;
    overflow: hidden;
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
    margin: 0 auto 5rem auto;
}

.preview-stage {
    position: relative;
    min-height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-card {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 16px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    position: absolute;

    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.main-panel {
    width: 350px;
    padding: 1.5rem;
    z-index: 10;
    transition-delay: 0s;

    h4 {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
        text-align: left;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    .site-item {
        display: flex;
        justify-content: space-between;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        margin-bottom: 0.5rem;

        &.active {
            background: rgba(56, 189, 248, 0.15);
        }

        .status-ok {
            color: #4ade80;
        }

        .status-error {
            color: #f87171;
        }
    }
}

.graph-card {
    width: 450px;
    top: 0;
    left: 0;
    padding: 1.5rem;
    transform: translate(-20px, 20px) rotate(-5deg);
    transition-delay: 0.2s;

    h5 {
        font-size: 1rem;
        margin-bottom: 1rem;
        color: #a0aec0;
        text-align: left;
    }

    img {
        width: 100%;
    }
}

.uptime-card {
    width: 280px;
    height: 280px;
    bottom: 0;
    right: 0;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translate(20px, -20px) rotate(4deg);
    transition-delay: 0.3s;

    h5 {
        font-size: 1rem;
        color: #a0aec0;
    }

    img {
        width: 120px;
        margin: 1rem 0;
    }

    .uptime-percent {
        font-size: 2rem;
        font-weight: bold;
    }
}

.events-card {
    width: 320px;
    bottom: 40px;
    left: 80px;
    padding: 1.5rem;
    transform: translate(0, 0) rotate(3deg);
    z-index: 11;
    transition-delay: 0.4s;

    h5 {
        font-size: 1rem;
        margin-bottom: 1rem;
        color: #a0aec0;
        text-align: left;
    }

    ul {
        list-style: none;
        padding: 0;
        text-align: left;
        font-size: 0.9rem;
    }

    li {
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .icon-status {
        flex-shrink: 0;
        width: 22px;
        height: 22px;
    }

    .icon-success {
        color: #4ade80;
    }

    .icon-error {
        color: #f87171;
    }
}


.is-in-view .preview-card {
    opacity: 1;
    transform: translateY(0) rotate(0);
}

.is-in-view .graph-card {
    transform: translate(-20px, 20px) rotate(-5deg);
}

.is-in-view .uptime-card {
    transform: translate(20px, -20px) rotate(4deg);
}

.is-in-view .events-card {
    transform: translate(0, 0) rotate(3deg);
}

@media (max-width: 1200px) {
    .preview-stage {
        transform: scale(0.85);
        margin-top: -50px;
    }
}

@media (max-width: 768px) {
    .title {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 1rem;
        margin-bottom: 2rem;
    }

    .preview-stage {
        transform: scale(0.7);
        margin-top: -100px;
        min-height: 450px;
    }
}

@media (max-width: 500px) {
    .preview-stage {
        transform: scale(0.55);
        margin-top: -150px;
    }
}
</style>