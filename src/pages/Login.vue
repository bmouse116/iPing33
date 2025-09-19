<template>
    <div class="register-page">
        <div class="register-container">
            <div class="form-wrapper">
                <form action="post" @submit.prevent="login">
                    <div class="form-block">
                        <h2>Авторизация</h2>
                        <div class="input-group">
                            <div class="group">
                                <label for="email">Email</label>
                                <TheInput id="email" input-type="email" placeholder-text="Введите email"
                                    v-model="emailValue"></TheInput>
                            </div>
                            <div class="group">
                                <label for="password">Пароль</label>
                                <TheInput id="password" input-type="password" placeholder-text="Введите пароль"
                                    v-model="passwordValue">
                                </TheInput>
                            </div>
                        </div>
                        <TheButton type="submit">Войти</TheButton>
                    </div>
                </form>
            </div>
        </div>
        <div class="back-btn">
            <TheButton btn-type="secondary" @click="back">Назад</TheButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import TheButton from '@/components/UI/TheButton.vue';
import TheInput from '@/components/UI/TheInput.vue';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const apiUrl = import.meta.env.VITE_API
const userStore = useUserStore()
const router = useRouter()
const emailValue = ref("")
const passwordValue = ref("")
const back = () => {
    router.push('/')
}

const login = async () => {
    if (!emailValue.value || !passwordValue.value) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }
    try {
        const response = await axios.post(`${apiUrl}/login`, {
            email: emailValue.value,
            password: passwordValue.value
        })
        userStore.setUser(response.data.user, response.data.token);
        router.push('/lk')
    }
    catch (error: any) {
        if (error.response) {
            alert("Ошибка авторизации: " + error.response.data.message);
            console.error("Ошибка сервера:", error.response.data);
        } else {
            console.error("Ошибка сети:", error.message);
        }
    }
}
</script>

<style scoped lang="scss">
.register-page {
    background-color: #0F172A;
    background-image: radial-gradient(circle at 10% 20%, rgba(96, 165, 250, 0.1), transparent 30%),
        radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.1), transparent 30%);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #E2E8F0;
    position: relative;

    .back-btn {
        position: absolute;
        top: 20px;
        left: 20px;
    }
}

.register-container {
    padding: 20px;
}

.form-wrapper form {
    background: rgba(27, 39, 58, 0.3);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);

    border: 1px solid rgba(255, 255, 255, 0.1);

    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

    border-radius: 24px;
    padding: 40px 35px;
    width: 400px;
    max-width: 100%;
}

.form-block {
    display: flex;
    flex-direction: column;
    gap: 30px;

    h2 {
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
        color: #FFFFFF;
        margin: 0;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;

        .group {
            display: flex;
            flex-direction: column;
            gap: 8px;
            text-align: left;

            label {
                font-size: 0.9rem;
                color: #94A3B8;
            }

            input {
                border: none;
                border-radius: 10px;
                padding: 10px 15px;
                color: var(--black);
                font-size: 16px;
                outline: none;
                backdrop-filter: blur(10px);
                transition: all 0.2s ease;

                &:focus {
                    box-shadow: 0 0 10px var(--primary);
                }
            }
        }
    }
}
</style>