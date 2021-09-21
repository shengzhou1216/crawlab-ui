<template>
  <router-view />
</template>
<script lang="ts">
import {defineComponent, onBeforeMount} from 'vue';
import {initPlugins} from '@/utils/plugin';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    onBeforeMount(() => {
      // router
      const router = useRouter();

      // store
      const store = useStore();
    });

    return {};
  },
});
</script>
