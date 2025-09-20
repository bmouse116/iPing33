<template>
    <div class="performance-chart-container">
        <h4>Производительность</h4>
        <div class="time-controls">
            <button @click="setTimeRange('hour')" :class="{ active: timeRange === 'hour' }">Час</button>
            <button @click="setTimeRange('day')" :class="{ active: timeRange === 'day' }">Сутки</button>
            <button @click="setTimeRange('all')" :class="{ active: timeRange === 'all' }">Все время</button>
        </div>

        <div class="chart-wrapper">
            <canvas v-if="hasEvents" ref="chartRef"></canvas>
            <p v-else class="no-data">Нет данных о событиях за выбранный период.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";

interface IMonitoringEvent {
    time: string;
    status: string;
    http_code: number | null;
    response_time_ms: number;
    ssl_valid: number | null;
}

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const props = defineProps<{ stats: any }>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;
const timeRange = ref('day');

const filteredEvents = computed(() => {
    if (!props.stats?.events) return [];

    const now = Date.now();
    const allEvents = props.stats.events as IMonitoringEvent[];

    switch (timeRange.value) {
        case 'hour':
            const oneHourAgo = now - 60 * 60 * 1000;
            return allEvents.filter(e => new Date(e.time).getTime() >= oneHourAgo);
        case 'day':
            const oneDayAgo = now - 24 * 60 * 60 * 1000;
            return allEvents.filter(e => new Date(e.time).getTime() >= oneDayAgo);
        default:
            return allEvents;
    }
});

const hasEvents = computed(() => filteredEvents.value.length > 0);

const setTimeRange = (range: string) => {
    timeRange.value = range;
};

const chartData = computed(() => {
    const events = filteredEvents.value;

    return {
        labels: events.map(e => new Date(e.time).toLocaleTimeString()),
        datasets: [
            {
                label: 'Статус (1=Online, 0=Offline)',
                data: events.map(e => e.status === 'online' ? 1 : 0),
                borderColor: '#22c55e', // зеленый
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                stepped: true,
                yAxisID: 'yStatus',
            },
            {
                label: 'Время отклика (мс)',
                data: events.map(e => e.response_time_ms),
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                tension: 0.1,
                yAxisID: 'yResponseTime',
            },
        ],
    };
});

const createChart = () => {
    if (!chartRef.value || !hasEvents.value) return;
    if (chartInstance) chartInstance.destroy();

    const ctx = chartRef.value.getContext('2d');
    if (!ctx) return;

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: chartData.value,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                yResponseTime: {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'Время отклика (мс)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                yStatus: {
                    type: 'linear',
                    position: 'right',
                    min: 0,
                    max: 1,
                    ticks: { stepSize: 1, callback: value => (value === 1 ? 'Online' : 'Offline') },
                    title: { display: true, text: 'Статус' },
                    grid: { drawOnChartArea: false }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            },
        },
    });
};

watch(chartData, () => {
    nextTick(() => {
        createChart();
    });
}, { deep: true });

onMounted(() => {
    createChart();
});

onUnmounted(() => {
    if (chartInstance) {
        chartInstance.destroy();
    }
});
</script>

<style scoped>
.performance-chart-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: var(--white);
    height: 100%;
}

h4 {
    font-size: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 5px;
    flex-shrink: 0;
}

.time-controls {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
}

.time-controls button {
    padding: 6px 12px;
    border: 1px solid rgba(56, 189, 248, 0.5);
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.time-controls button:hover {
    background: rgba(56, 189, 248, 0.2);
    border-color: #38bdf8;
}

.time-controls button.active {
    background: #38bdf8;
    color: #0f172a;
    font-weight: bold;
}

.chart-wrapper {
    position: relative;
    background: rgba(15, 23, 42, 0.8);
    padding: 15px;
    border-radius: 12px;


    flex-grow: 1;

    min-height: 0;
}

.no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: rgba(255, 255, 255, 0.6);
}
</style>