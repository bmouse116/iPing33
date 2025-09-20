import { defineStore } from "pinia";
import { ref } from "vue";

export const useTabsVisible = defineStore('useTabsVisible', () => {
    const libraryVisible = ref(false)
    const settingsVisible = ref(false)
    const mainVisible = ref(true)
    const openLibrary = () => {
        libraryVisible.value = true
        settingsVisible.value = false
        mainVisible.value = false
    }

    const closeLibrary = () => {
        libraryVisible.value = false
    }

    const openMain = () => {
        mainVisible.value = true
        libraryVisible.value = false
        settingsVisible.value = false
    }
    const closeMain = () => mainVisible.value = false

    const openSettings = () => {
        settingsVisible.value = true
        mainVisible.value = false
        libraryVisible.value = true
    }

    const closeSettings = () => settingsVisible.value = false

    return {
        libraryVisible,
        settingsVisible,
        openLibrary,
        closeLibrary,
        openSettings,
        closeSettings,
        mainVisible,
        openMain,
        closeMain
    }
})