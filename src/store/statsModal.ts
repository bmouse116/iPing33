import { defineStore } from "pinia";
import { ref } from "vue";

export const useSiteModal = defineStore('siteModal', () => {
    const isOpen = ref(false);
    const siteId = ref<number | null>(null);

    const openModal = (id: number) => {
        siteId.value = id;
        isOpen.value = true;
    };

    const closeModal = () => {
        siteId.value = null;
        isOpen.value = false;
    };

    return { isOpen, siteId, openModal, closeModal };
});
