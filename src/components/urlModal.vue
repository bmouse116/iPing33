<template>
    <div v-if="store.isModalOpen" class="url-modal">
        <div class="modal-overlay" @click="store.closeModal"></div>
        <div class="modal-content">
            <h2>Статус сайта</h2>

            <template v-if="store.urlData">
                <p><strong>URL:</strong> {{ store.urlData.url }}</p>
                <p><strong>Статус:</strong> {{ store.urlData.status }}</p>
                <p><strong>Время ответа:</strong> {{ store.urlData.response_time_ms }} ms</p>
            </template>

            <template v-else>
                <p>Данные загружаются...</p>
            </template>

            <TheButton btn-type="secondary" @click="store.closeModal">Закрыть</TheButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePublicUrl } from "@/store/publicUrlInfo";
import TheButton from "@/components/UI/TheButton.vue";

const store = usePublicUrl();
</script>

<style scoped lang="scss">
.url-modal {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    .modal-overlay {
        position: absolute;
        inset: 0;
        background: rgba(15, 23, 42, 0.7);
        backdrop-filter: blur(8px);
    }

    .modal-content {
        position: relative;
        background: rgba(27, 39, 58, 0.3);
        backdrop-filter: blur(16px);
        border-radius: 24px;
        padding: 30px 35px;
        width: 400px;
        max-width: 90%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        color: #fff;

        h2 {
            text-align: center;
            margin: 0 0 10px 0;
        }

        p {
            margin: 5px 0;
        }
    }
}
</style>
