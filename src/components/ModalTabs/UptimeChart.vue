<template>
    <div class="uptime-chart">
        <canvas ref="chartRef" width="400" height="400"></canvas>
        <div v-if="loading" class="overlay-loader">
            <TheLoader size="40px" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { useUserStore } from "@/store/userStore";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import TheLoader from "@/components/UI/TheLoader.vue";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const props = defineProps<{ site: any }>();

const userStore = useUserStore();
const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;
const loading = ref(false);

const fetchStats = async () => {
    if (!props.site) return;

    loading.value = true;
    await nextTick(); // гарантируем, что canvas есть в DOM

    const params = {
        url: props.site.url,
        date_from: "2025-09-19",
        date_to: "2025-09-20",
    };

    try {
        const response = await axios.get(`api/sites/${props.site.id}/stats`, {
            headers: { Authorization: `Bearer ${userStore.token}` },
            params,
        });

        const { uptime_percent, down_time_percent } = response.data;

        if (chartRef.value) {
            if (chartInstance) chartInstance.destroy();
            chartInstance = new Chart(chartRef.value, {
                type: "doughnut",
                data: {
                    labels: ["Время работы", "Время простоя"],
                    datasets: [
                        {
                            data: [uptime_percent, down_time_percent],
                            backgroundColor: ["#22c55e", "#ef4444"],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: "bottom" },
                    },
                },
            });
        }
    } catch (err) {
        console.error("Ошибка при загрузке статистики:", err);
    } finally {
        loading.value = false;
    }
};

// загружаем при первом рендере и при смене сайта
onMounted(() => {
    if (props.site) fetchStats();
});
watch(() => props.site, () => fetchStats(), { immediate: false });
</script>

<style scoped>
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
