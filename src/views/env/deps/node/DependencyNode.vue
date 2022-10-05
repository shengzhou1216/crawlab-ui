<template>
  <DependencyLang
    lang="node"
    :path-func="name => `https://npmjs.com/package/${name}`"
    :icon="['fab', 'node']"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DependencyLang from '@/views/env/deps/components/lang/DependencyLang.vue';

export default defineComponent({
  name: 'DependencyPython',
  components: {
    DependencyLang
  },
});
</script>

