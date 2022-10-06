<template>
  <Transfer
    :titles="titles"
    :data="triggerList"
    :value="enabled"
    @change="onChange"
  />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {translate} from '@/utils';
import Transfer from '@/components/transfer/Transfer.vue';

const t = translate;

export default defineComponent({
  name: 'NotificationDetailTabTriggers',
  components: {
    Transfer,
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
    triggerList: {
      type: Array,
      default: () => {
        return [];
      },
    }
  },
  emits: [
    'change',
  ],
  setup(props, {emit}) {
    const titles = computed(() => [
      t('components.transfer.titles.available'),
      t('components.transfer.titles.enabled'),
    ]);

    const enabled = computed(() => {
      const {triggers} = props.form;
      return triggers || [];
    });

    const onChange = (value: string) => {
      emit('change', value);
    };

    return {
      titles,
      enabled,
      onChange,
    };
  },
});
</script>

<style scoped>

</style>
