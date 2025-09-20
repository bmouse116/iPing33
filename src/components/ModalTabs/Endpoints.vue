<template>
    <div class="endpoints">
        <h3>Эндпоинты</h3>

        <ul v-if="site?.endpoints?.length">
            <li v-for="ep in site.endpoints" :key="ep.id">
                <div class="endpoint-info">
                    <span class="path">{{ ep.path }}</span>
                    <a :href="(site.url.endsWith('/') ? site.url.slice(0, -1) : site.url) + (ep.path.startsWith('/') ? ep.path : '/' + ep.path)"
                        target="_blank" rel="noopener noreferrer">
                        🔗
                    </a>
                    <span class="meta">
                        Добавлен: {{ formatDate(ep.created_at) }}
                    </span>
                    <div class="status">
                        <span class="circle"
                            :class="{ green: ep.status === 'online', red: ep.status === 'offline' }"></span>
                        <span>{{ site.http_code }}</span>
                    </div>
                </div>
            </li>
        </ul>

        <p v-else>Нет данных об эндпоинтах</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ site: any }>();

// Простейшее форматирование даты
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
};

console.log(props)
</script>

<style scoped>
.endpoints {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: var(--font-regular);
    color: var(--white);
}

.endpoints h3 {
    margin-bottom: 10px;
    font-size: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 5px;
}

.endpoints ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.endpoints li {
    background: rgba(27, 39, 58, 0.8);
    padding: 10px 12px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.endpoint-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.path {
    font-weight: 600;
    color: #38bdf8;
    /* голубой */
}

.meta {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
}

p {
    color: rgba(255, 255, 255, 0.6);
}

.status {
    display: flex;
    gap: 10px;
    align-items: center;

    .circle {
        border-radius: 50%;
        width: 25px;
        height: 25px;

        &.green {
            background: var(--green);
        }

        &.red {
            background: var(--red);
        }
    }
}
</style>
