import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from './userStore';

const apiUrl = import.meta.env.VITE_API;

export const useSitesStore = defineStore('sites', () => {
  const sites = ref<{ id: number; url: string; created_at: string; status: string }[]>([]);
  const userStore = useUserStore();

  const loadSites = async () => {
    if (!userStore.token) return;

    try {
      const response = await axios.get("api/sites", {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      sites.value = response.data;
    } catch (err) {
      console.error('Ошибка при загрузке сайтов:', err);
    }
  };

  const addSite = (site: { id: number; url: string; created_at: string; status: string }) => {
    sites.value.push(site);
  };

  return { sites, loadSites, addSite };
});
