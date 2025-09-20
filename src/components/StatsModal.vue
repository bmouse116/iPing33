<template>
    <div v-if="modal.isOpen" class="site-modal">
        <div class="overlay" @click="modal.closeModal"></div>
        <div class="content">
            <div class="modal-header">
                <h2>{{ currentSite?.url }}</h2>
                <TheButton class="close" @click="modal.closeModal">
                    <IconSquareX class="icon" />
                </TheButton>
            </div>

            <div class="modal-body">
                <div class="main">
                    <canvas ref="chartRef" width="400" height="400"></canvas>
                </div>

                <div class="sidebar">
                    <h4>Меню</h4>
                    <ul>
                        <li>Время работы</li>
                        <li>SSL</li>
                        <li>Еще какая то диаграмма</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useSitesStore } from "@/store/libraryStore";
import { useSiteModal } from "@/store/statsModal";
import TheButton from "./UI/TheButton.vue";
import { IconSquareX } from "@tabler/icons-vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const modal = useSiteModal();
const useSite = useSitesStore();
const userStore = useUserStore();
const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const currentSite = computed(() => {
    return useSite.sites.find(site => site.id === modal.siteId) || null;
});

const fetchStats = async () => {
    const site = currentSite.value;
    if (!site) return;

    const params = {
        url: site.url,
        date_from: "2025-09-19",
        date_to: "2025-09-20",
    };

    try {
        const response = await axios.get(`api/sites/${site.id}/stats`, {
            headers: { Authorization: `Bearer ${userStore.token}` },
            params,
        });

        const { uptime_percent, down_time_percent } = response.data;

        if (chartRef.value) {
            if (chartInstance) chartInstance.destroy(); // удаляем старую диаграмму
            chartInstance = new Chart(chartRef.value, {
                type: "doughnut",
                data: {
                    labels: ["Время работы", "Время простоя"],
                    datasets: [
                        {
                            data: [uptime_percent, down_time_percent],
                            backgroundColor: ["#22c55e", "#ef4444"], // зелёный и красный
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
        console.log(response.data)
    } catch (err) {
        console.error("Ошибка при загрузке сайта:", err);
    }
};

watch(
    () => modal.siteId,
    () => {
        fetchStats();
    }
);

onMounted(() => {
    fetchStats();
});
</script>


<style scoped lang="scss">
.site-modal {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    padding: 50px;

    .overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
    }

    .content {
        position: relative;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(12px);
        border-radius: 18px;
        width: 100%;
        max-width: 1200px;
        height: calc(100vh - 100px);
        display: flex;
        flex-direction: column;
        padding: 20px;
        color: var(--white);

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(56, 189, 248, 0.2);
            padding-bottom: 10px;
            margin-bottom: 20px;

            h2 {
                font-size: 1.5rem;
                color: var(--dark-white);
            }

            .close {
                padding: 5px;
            }
        }

        .modal-body {
            display: flex;
            gap: 20px;
            flex: 1;
            overflow: hidden;

            .main {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 15px;
                overflow-y: auto;
                padding-right: 10px;

            }

            .sidebar {
                width: 250px;
                background: rgba(27, 39, 58, 0.8);
                border-radius: 15px;
                padding: 15px;

                h4 {
                    margin-bottom: 10px;
                    color: var(--dark-white);
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;

                    li {
                        margin-bottom: 10px;
                        cursor: pointer;
                        transition: color 0.2s;

                        &:hover {
                            color: var(--cyan-400);
                        }
                    }
                }
            }
        }
    }
}
</style>
