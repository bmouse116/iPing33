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
        <div class="spam-container">
            <div class="spam-item">
                <TheButton>
                    <a href="https://t.me/iPing33bot" target="_blank" rel="noopener noreferrer">
                        <IconBrandTelegram class="icon" />
                    </a>
                </TheButton>
                <input type="checkbox" v-model="active.telegram" @change="updateNotifications" class="switch" />
            </div>

            <div class="spam-item inactive">
                <TheButton>
                    <IconMail class="icon" />
                </TheButton>
                <input type="checkbox" v-model="active.mail" @change="updateNotifications" class="switch" />
            </div>

            <div class="spam-item inactive">
                <TheButton>
                    <IconDeviceMobile class="icon" />
                </TheButton>
                <input type="checkbox" v-model="active.phone" @change="updateNotifications" class="switch" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { useTabsVisible } from "@/store/tabsVisible";
import TheButton from "@/components/UI/TheButton.vue";
import { IconBrandTelegram, IconDeviceMobile, IconMail } from "@tabler/icons-vue";

const userStore = useUserStore();
const tabsVisible = useTabsVisible();

const goToLibrary = () => tabsVisible.openLibrary();
const goToMain = () => tabsVisible.openMain();
const goToSettings = () => tabsVisible.openSettings();

const active = ref({
    telegram: false,
    mail: false,
    phone: false
});

watch(
    () => userStore.user,
    (user) => {
        if (user) {
            active.value.telegram = Boolean(user.notify_telegram);
            active.value.mail = Boolean(user.notify_email);
            active.value.phone = Boolean(user.notify_mobile);
        }
    },
    { immediate: true }
);

const updateNotifications = async () => {
    try {
        await axios.post(
            "api/user/notifications",
            {
                notify_telegram: active.value.telegram,
                notify_email: active.value.mail,
                notify_mobile: active.value.phone
            },
            {
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            }
        );
        console.log("Уведомления обновлены", active.value);
    } catch (err) {
        console.error("Ошибка при обновлении уведомлений", err);
    }
};
</script>

<style scoped lang="scss">
.sidebar {
    position: fixed;
    top: 74px;
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

.spam-container {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .spam-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;

        .icon {
            font-size: 28px;
        }

        button {
            border: none;
        }

        &.inactive {
            button {
                background: rgba(203, 213, 225, 0.4);
                border: none;
                cursor: auto;
                transition: none;

                &:hover {
                    transform: none;
                }
            }
        }

        .switch {
            width: 40px;
            height: 20px;
            -webkit-appearance: none;
            background: #ccc;
            outline: none;
            border-radius: 10px;
            position: relative;
            cursor: pointer;
            transition: 0.3s;

            &:checked {
                background: #38bdf8;
            }

            &:checked::after {
                left: 20px;
            }

            &::after {
                content: "";
                width: 18px;
                height: 18px;
                background: white;
                border-radius: 50%;
                position: absolute;
                top: 1px;
                left: 1px;
                transition: 0.3s;
            }
        }
    }
}
</style>
