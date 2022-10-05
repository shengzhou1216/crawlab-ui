<template>
  <DependencyLang
    lang="python"
    :path-func="name => `https://pypi.org/project/${name}`"
    :icon="['fab', 'python']"
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

