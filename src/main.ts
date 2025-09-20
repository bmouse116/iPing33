import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/styles/style.scss";
import { useUserStore } from "./store/userStore";
import { useSitesStore } from "./store/libraryStore";
const app = createApp(App);
app.use(createPinia());
const userStore = useUserStore()
const libraryStore = useSitesStore()
userStore.loadUser()
libraryStore.loadSites()
app.use(router);

app.mount("#app");
