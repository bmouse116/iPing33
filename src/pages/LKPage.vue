<template>
    <div class="lk">
        <TheButton @click="toBack">Назад</TheButton>
        <TheButton @click="logout">Выход</TheButton>
        <img src="https://i.gifer.com/UQKy.gif" alt="">
    </div>
</template>

<script setup lang="ts">
import TheButton from '@/components/UI/TheButton.vue';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import { useRouter } from 'vue-router';
const apiUrl = import.meta.env.VITE_API
const userStore = useUserStore()
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
</script>

<style scoped lang="scss">
.lk {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;

    img {
        width: 300px;
        height: 300px;
    }
}
</style>