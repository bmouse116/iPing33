<template>
  <button class="btn" :class="btnType">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  btnType: {
    type: String
  }
})
</script>

<style scoped lang="scss">
.btn {
  border-radius: 14px;
  height: 36px;
  padding: 0px 30px;
  color: var(--black);
  background-color: var(--primary);
  border: 2px solid var(--primary-stroke);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}

.secondary {
  background: transparent !important;
  border: 1px solid #38bdf8;
  color: #38bdf8;

  &:hover {
    background: rgba(56, 189, 248, 0.15) !important;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
  }
}
</style>
