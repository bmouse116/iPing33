<template>
  <div class="main-search container" ref="mainRef">
    <div class="input" ref="inputRef">
      <div class="description">
        <h1>
          iPing33 - многофункциональный сервис мониторинга доступности сайтов
        </h1>
        <h4>
          Введите URL сайта для изучения его статуса, информации и доступности
        </h4>
        <h4>Авторизуйтесь для получения более детальной статистики</h4>
      </div>
      <div class="check-status">
        <TheInput placeholder-text="Введите URL" v-model="store.urlValue" />
        <TheButton @click="checkUrl">
          <IconBroadcast class="icon">Проверить</IconBroadcast>
        </TheButton>
      </div>
    </div>
    <div class="image-group">
      <img src="/src/assets/img/042.svg" alt="" class="img-1" />
      <img src="/src/assets/img/042.svg" alt="" class="img-2" />
      <img ref="firstPlanetRef" src="/src/assets/img/042.svg" alt="" class="img-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TheInput from "@/components/UI/TheInput.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TheButton from "@/components/UI/TheButton.vue";
import { checkStatus } from "@/composables/publicUrlStatus";
import { IconBroadcast } from "@tabler/icons-vue";
import { usePublicUrl } from "@/store/publicUrlInfo";
const urlValue = ref("")
const store = usePublicUrl()
const checkUrl = async () => {
  if (!store.urlValue) return alert("Введите URL!");

  store.openModal(); // открываем модалку до запроса
  store.setUrlData(null); // обнуляем предыдущие данные

  try {
    const response = await checkStatus(store.urlValue);
    store.setUrlData(response); // сохраняем данные в стор
  } catch (error) {
    console.error(error);
    store.setUrlData({
      url: store.urlValue,
      status: "Ошибка",
      response_time_ms: 0,
      ssl_valid: false,
      ssl_expires_at: "",
      ssl_days_left: "",
      ssl_error: "Ошибка при получении данных"
    });
  }
};

gsap.registerPlugin(ScrollTrigger);

const mainRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLDivElement | null>(null);
const firstPlanetRef = ref<HTMLImageElement | null>(null);

onMounted(() => {
  if (mainRef.value) {
    let ctx = gsap.context(() => {
      if (inputRef.value && firstPlanetRef.value) {
        gsap.to(inputRef.value, {
          opacity: 0,
          y: -50,
          ease: "power2.out",
          scrollTrigger: {
            trigger: firstPlanetRef.value,
            start: "top 10%",
            toggleActions: "play none reverse none",
          },
        });
      }
    }, mainRef.value);

    return () => ctx.revert();
  }
});
</script>

<style scoped lang="scss">
.main-search {
  .image-group {
    position: relative;
    width: 1000px;
    height: 100%;

    img {
      position: absolute;

      &.img-1 {
        right: 0;
        top: 50vh;
        z-index: 1;
        width: 250px;
        height: 250px;
      }

      &.img-2 {
        top: 80vh;
        z-index: 3;
        left: 10%;
        width: 400px;
        height: 400px;
      }

      &.img-3 {
        top: 100vh;
        left: 70%;
        z-index: 3;
        width: 500px;
        height: 500px;
      }
    }
  }

  .input {
    position: fixed;
    top: 20vh;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    z-index: 2;

    .description {
      text-align: center;
      color: var(--white);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .check-status {
      display: flex;
      width: 800px;
      gap: 20px;
      justify-content: center;
      align-items: center;

      input {
        z-index: 2;
        width: 600px;
      }

      .icon {
        color: white;
      }
    }
  }
}
</style>