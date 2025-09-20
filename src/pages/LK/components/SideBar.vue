<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <div class="name">
                <div class="miniature">
                    {{ userStore.user?.name.slice(0, 1) }}
                </div>
                <h4>
                    {{ userStore.user?.name }}
                </h4>
            </div>
        </div>
        <ul class="menu">
            <li @click="goToMain">Мой профиль</li>
            <li @click="goToLibrary">Библиотека</li>
            <li @click="goToSettings">Настройки</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { useTabsVisible } from "@/store/tabsVisible";
const userStore = useUserStore();
const tabsVisible = useTabsVisible()
const goToLibrary = () => {
    tabsVisible.openLibrary()
};
const goToMain = () => {
    tabsVisible.openMain()
};

const goToSettings = () => {
    tabsVisible.openSettings()
};

</script>

<style scoped lang="scss">
.sidebar {
    position: fixed;
    top: 74px;
    /* под Header */
    right: 0;
    width: 250px;
    height: calc(100vh - 74px);
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(12px);
    border-left: 1px solid rgba(56, 189, 248, 0.2);
    padding: 20px;
    display: flex;
    flex-direction: column;
    z-index: 98;
    align-items: start;
    gap: 50px;

    .sidebar-header {
        .name {
            display: flex;
            align-items: center;
            gap: 20px;

            h4 {
                color: #ffffff;
                text-align: center;
                font-size: 24px;
            }

            .miniature {
                width: 100px;
                height: 100px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--black-bg);
                color: #ffffff;
                font-family: var(--font-bold);
                font-size: 36px;
                user-select: none;
            }
        }
    }

    .menu {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 15px;

        li {
            cursor: pointer;
            color: #cbd5e1;
            transition: color 0.3s;
            font-family: var(--font-regular);

            &:hover {
                color: #38bdf8;
            }
        }
    }
}
</style>
