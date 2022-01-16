import {RouteRecordRaw} from "vue-router";
import Disclaimer from "@/views/misc/Disclaimer.vue";

const endpoint = 'misc';

export default [
  {
    name: 'Disclaimer',
    path: `${endpoint}/disclaimer`,
    component: Disclaimer,
  }
] as Array<RouteRecordRaw>;
