import { defineStore } from "pinia";
import { ref } from "vue";

export const focusStore = defineStore("focusStore", () => {
  const focusing = ref(false);

  return {
    focusing,
  };
});
