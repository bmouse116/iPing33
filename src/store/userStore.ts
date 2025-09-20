import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<{ id: number; name: string; email: string; created_at: string } | null>(null);
  const token = ref<string | null>(localStorage.getItem('token') || null);

  const setUser = (userData: { id: number; name: string; email: string; created_at: string }, userToken: string) => {
    user.value = userData;
    token.value = userToken;
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  };

  const loadUser = async () => {
    if (token.value) {
      try {
        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token.value}` }
        });
        user.value = response.data;
      } catch (err) {
        logout();
      }
    }
  };

  return { user, token, setUser, logout, loadUser };
});
