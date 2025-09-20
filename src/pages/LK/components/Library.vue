<template>
    <div class="library">
        <div class="sites-list">
            <template v-if="librarySites.sites && librarySites.sites.length">
                <div class="site-card" v-for="site in librarySites.sites" :key="site.id"
                    @click="modal.openModal(site.id)">
                    <div class="main-info">
                        <h2>{{ site.url }}</h2>
                        <h4>Добавлен: {{ formatDate(site.created_at) }}</h4>
                    </div>
                    <div class="status">
                        <span class="circle"
                            :class="{ green: site.status === 'online', red: site.status === 'offline' }"></span>
                        <span>{{ site.status }}</span>
                    </div>
                </div>
            </template>

            <template v-else>
                <div class="loader-container">
                    <TheLoader size="30px" />
                </div>
            </template>
        </div>
    </div>
    <StatsModal />
</template>

<script setup lang="ts">
import StatsModal from '@/components/StatsModal.vue';
import TheLoader from '@/components/UI/TheLoader.vue';
import { useSitesStore } from '@/store/libraryStore';
import { useSiteModal } from '@/store/statsModal';
import { formatDate } from '@/utils/getDate';
const modal = useSiteModal()
const librarySites = useSitesStore()
</script>

<style scoped lang="scss">
.loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: calc(100% - 250px);
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(15, 23, 42, 0.95);
    z-index: 10;
}

.library {
    height: calc(100vh - 74px);
    overflow: auto;
    position: relative;
}

.sites-list {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .site-card {
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(56, 189, 248, 0.2);
        width: calc(100% - 250px);
        padding: 10px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--dark-white);

        .main-info {
            display: flex;
            flex-direction: column;
            gap: 10px;

            h4 {
                color: rgba(255, 255, 255, 0.6);
            }
        }

        .status {
            display: flex;
            gap: 10px;
            align-items: center;

            .circle {
                border-radius: 50%;
                width: 25px;
                height: 25px;

                &.green {
                    background: var(--green);
                }

                &.red {
                    background: var(--red);
                }
            }
        }
    }
}
</style>