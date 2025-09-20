import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from './userStore';

const apiUrl = import.meta.env.VITE_API;

export const useSitesStore = defineStore('sites', () => {
  const sites = ref<any[]>([]); // теперь можно хранить и endpoints
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

  const addSite = (site: any) => {
    sites.value.push(site);
  };

  // загружаем один сайт с эндпоинтами
  const loadSiteById = async (id: number) => {
    if (!userStore.token) return null;

    try {
      const response = await axios.get(`api/sites/${id}`, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });

      // обновляем в массиве sites
      const idx = sites.value.findIndex((s) => s.id === id);
      if (idx !== -1) {
        sites.value[idx] = response.data; // подменяем на полный объект
      } else {
        sites.value.push(response.data);
      }

      return response.data;
    } catch (err) {
      console.error('Ошибка при загрузке сайта:', err);
      return null;
    }
  };

  const deleteSiteById = async (id: number) => {
    if (!userStore.token) return;

    try {
      // Отправляем GET-запрос на эндпоинт удаления с токеном авторизации
      await axios.get(`api/sites/${id}/delete`, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });

      // При успехе - удаляем сайт из локального массива, чтобы UI обновился
      sites.value = sites.value.filter((site) => site.id !== id);
      
      console.log(`Сайт с ID ${id} успешно удален.`);

    } catch (err) {
      console.error(`Ошибка при удалении сайта с ID ${id}:`, err);
      // Здесь можно добавить логику для отображения ошибки пользователю
    }
  };

  return { sites, loadSites, addSite, loadSiteById, deleteSiteById };
});
