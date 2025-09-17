<template>
  <input :type="inputType" :placeholder="placeholderText" ref="inputRef" />
</template>

<script setup lang="ts">
import { focusStore } from "@/store/focusStore";
import { onMounted, ref, watch } from "vue";
const store = focusStore();

const props = defineProps({
  placeholderText: {
    type: String,
  },
  inputType: {
    type: String,
    default: "text"
  }
});

const inputRef = ref<HTMLInputElement | null>(null);

// Слежение за изменением пропса focus
watch(
  () => store.focusing,
  (newVal) => {
    if (newVal && inputRef.value) {
      inputRef.value.focus();

      // 2. (Улучшение) Сбрасываем состояние после фокусировки.
      // Это позволит кнопке сработать снова.
      store.focusing = false;
    }
  },
);
</script>

<style scoped lang="scss">
input {
  font-family: var(--font-medium);
  font-size: 14px;
  //width: 600px;
  height: 40px;
  outline: none;
  padding: 10px;
  color: var(--black);
  border: none;
  border-radius: 14px;

  &:focus {
    border: 2px solid var(--primary-stroke);
  }
}
</style>
