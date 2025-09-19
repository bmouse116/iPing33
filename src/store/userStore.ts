import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<{ id: number; name: string; email: string } | null>(null);
  const token = ref<string | null>(localStorage.getItem('token') || null);

  const setUser = (userData: { id: number; name: string; email: string }, userToken: string) => {
    user.value = userData;
    token.value = userToken;
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  };

  return { user, token, setUser, logout };
});
