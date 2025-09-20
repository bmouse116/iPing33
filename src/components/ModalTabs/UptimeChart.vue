<template>
    <div class="uptime-chart">
        <canvas v-show="stats" ref="chartRef" width="400" height="400"></canvas>
        <div v-if="!stats" class="overlay-loader">
            <TheLoader size="40px" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
import TheLoader from "@/components/UI/TheLoader.vue";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const props = defineProps<{
    site: any;
    stats: any;
}>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

watch(() => props.stats, (newStats) => {
    if (chartRef.value && newStats) {
        const { uptime_percent, down_time_percent } = newStats;

        if (chartInstance) chartInstance.destroy();
        chartInstance = new Chart(chartRef.value, {
            type: "doughnut",
            data: {
                labels: ["Время работы", "Время простоя"],
                datasets: [{
                    data: [uptime_percent, down_time_percent],
                    backgroundColor: ["#22c55e", "#ef4444"],
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';

                                if (label) {
                                    label += ': ';
                                }

                                if (context.formattedValue !== null) {
                                    label += context.formattedValue + ' %';
                                }

                                return label;
                            }
                        }
                    }
                }
            },
        });
    }
}, { immediate: true }); 
</script>

<style scoped>
/* Ваши стили остаются без изменений */
.uptime-chart {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
}

.overlay-loader {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(15, 23, 42, 0.6);
    border-radius: 8px;
}
</style>