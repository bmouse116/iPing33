import { defineStore } from "pinia";
import { ref } from "vue";

interface UrlData {
    status: string;
    url: string;
    response_time_ms: number;
}
export const usePublicUrl = defineStore('usePublicUrl', () => {
    const isModalOpen = ref(false);
    const urlValue = ref("");
    const urlData = ref<UrlData | null>(null);

    const openModal = () => { isModalOpen.value = true; };
    const closeModal = () => { isModalOpen.value = false; };

    const setUrlData = (data: UrlData) => { urlData.value = data; };

    return {
        isModalOpen,
        urlValue,
        urlData,
        openModal,
        closeModal,
        setUrlData
    }
})