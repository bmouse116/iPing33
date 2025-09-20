import { defineStore } from "pinia";
import { ref } from "vue";

interface UrlData {
    status: string;
    url: string;
    response_time_ms: number;
    ssl_valid: boolean;
    ssl_expires_at: string;
    ssl_days_left: string;
    ssl_error: string;
}
export const usePublicUrl = defineStore('usePublicUrl', () => {
    const isModalOpen = ref(false);
    const urlValue = ref("");
    const urlData = ref<UrlData | null>(null);

    const openModal = () => { isModalOpen.value = true; };
    const closeModal = () => { isModalOpen.value = false; };

    const setUrlData = (data: UrlData | null) => { urlData.value = data; };

    return {
        isModalOpen,
        urlValue,
        urlData,
        openModal,
        closeModal,
        setUrlData
    }
})