import { createApp } from "vue";
import { createRouter, createMemoryHistory } from "vue-router";
import ui from "@nuxt/ui/vue-plugin";
import App from "./App.vue";
import "./style.css";

const router = createRouter({ history: createMemoryHistory(), routes: [] });

createApp(App).use(router).use(ui).mount("#app");
