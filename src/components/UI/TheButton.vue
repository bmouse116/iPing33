<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">

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
</style>