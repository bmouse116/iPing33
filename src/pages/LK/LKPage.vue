<template>
    <div class="lk">
        <div class="header">
            <TheButton @click="toBack">
                <IconArrowNarrowLeft class="icon" size="large" />
            </TheButton>
            <TheButton @click="logout">Выход</TheButton>
        </div>

        <SideBar @open-library="handleOpenLibrary" @open-settings="handleOpenSettings" />
        <div class="main-content" v-if="tabsVisible.mainVisible">
            <h1>Общая информация</h1>
            <div class="info-container">
                <div class="info-block">
                    <div class="info-value">{{ userStore.user?.email }}</div>
                    <div class="info-label">Email пользователя</div>
                </div>
                <div class="info-block">
                    <div class="info-value">{{ userStore.user?.created_at ? formatDate(userStore.user.created_at) : ''
                        }}</div>
                    <div class="info-label">Дата регистрации</div>
                </div>
                <div class="info-block">
                    <div class="info-value">{{ daysSinceRegistration(userStore.user?.created_at) }}</div>
                    <div class="info-label">Дней в проекте</div>
                </div>
                <div class="info-block">
                    <div class="info-value">
                        <template v-if="librarySites.sites.length !== 0">
                            {{ librarySites.sites.length }}
                        </template>
                        <template v-else>
                            <TheLoader size="20px" />
                        </template>
                    </div>
                    <div class="info-label">Сайтов в библиотеке</div>
                </div>
            </div>
            <div class="add-site">
                <h4>Добавить сайт в библиотеку</h4>
                <div class="actions">
                    <TheInput placeholder-text="Введите URL сайта" v-model="siteUrl" />
                    <TheButton @click="addInLibrary">
                        <IconSquarePlus class="icon"></IconSquarePlus>
                    </TheButton>
                </div>
            </div>
        </div>
        <Library v-if="tabsVisible.libraryVisible" />
    </div>
</template>

<script setup lang="ts">
import TheButton from '@/components/UI/TheButton.vue';
import Library from './components/Library.vue';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { IconArrowNarrowLeft, IconSquarePlus } from '@tabler/icons-vue';
import SideBar from './components/SideBar.vue';
import { formatDate } from '@/utils/getDate';
import { daysSinceRegistration } from '@/utils/daysInSite';
import TheInput from '@/components/UI/TheInput.vue';
import { onMounted, ref } from 'vue';
import { useSitesStore } from '@/store/libraryStore';
import { useTabsVisible } from '@/store/tabsVisible';
import TheLoader from '@/components/UI/TheLoader.vue';
const siteUrl = ref("")
const apiUrl = import.meta.env.VITE_API
const userStore = useUserStore()
const librarySites = useSitesStore()
const tabsVisible = useTabsVisible()
const router = useRouter()
const toBack = () => {
    router.push('/')
}
const logout = async () => {
    try {
        const response = await axios.post("api/logout", {}, {
            headers: {
                Authorization: `Bearer ${userStore.token}`
            }
        })
        if (response.status === 200) {
            userStore.logout()
            router.push('/')
        }
    }
    catch (error) {
        console.log(error)
    }
}

const handleOpenSettings = () => {

}

const handleOpenLibrary = () => {

}

const addInLibrary = async () => {
    if (!siteUrl.value) return;

    try {
        const response = await axios.post("api/sites",
            { url: siteUrl.value },
            {
                headers: { Authorization: `Bearer ${userStore.token}` }
            }
        );
        console.log("Успех", response.data);
        siteUrl.value = "";
        librarySites.addSite(response.data);
    } catch (error) {
        console.error("Ошибка при добавлении сайта:", error);
    }
};

// onMounted(async () => {
//     // Ждём, пока пользователь загрузится
//     if (!userStore.user) await userStore.loadUser();
//     await librarySites.loadSites();
// });
</script>

<style scoped lang="scss">
.lk {
    width: 100%;
    height: 100vh;
    background-color: var(--black-bg);

    .main-content {
        width: 100%;
        height: auto;
        padding: 15px 40px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .info-container {
            display: flex;
            align-items: center;
            gap: 20px;

            .info-block {
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(56, 189, 248, 0.2);
                border-radius: 18px;
                padding: 10px;
                height: 150px;
                color: var(--white);
                display: flex;
                flex-direction: column; // ставим вертикальный стек
                align-items: center;
                justify-content: center;
                min-width: 150px;
                font-family: var(--font-regular);

                .info-value {
                    font-size: 1rem;
                    font-weight: 500;
                }

                .info-label {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin-top: 5px;
                }
            }
        }

        .add-site {
            display: flex;
            flex-direction: column;
            gap: 15px;

            h4 {
                color: var(--white);
            }

            .actions {
                display: flex;
                align-items: center;
                gap: 10px;

                input {
                    width: 400px;
                }
            }
        }

        h1 {
            color: var(--dark-white);
        }
    }

    .header {
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(56, 189, 248, 0.2);
        padding: 15px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        transition: background 0.3s ease;
        height: 74px;

        button {
            &:first-child {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>