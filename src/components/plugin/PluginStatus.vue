<template>
  <Tag
      class="plugin-status"
      :key="data"
      :icon="data.icon"
      :label="data.label"
      :spinning="data.spinning"
      :type="data.type"
      :size="size"
      @click="$emit('click')"
  >
    <template #tooltip>
      <div v-html="data.tooltip"/>
    </template>
  </Tag>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import {
  PLUGIN_STATUS_STOPPED,
  PLUGIN_STATUS_RUNNING,
  PLUGIN_STATUS_ERROR, PLUGIN_STATUS_INSTALLING,
} from '@/constants/plugin';
import Tag from '@/components/tag/Tag.vue';
import colors from '@/styles/color.scss';

export default defineComponent({
  name: 'PluginStatus',
  components: {
    Tag,
  },
  props: {
    status: {
      type: String as PropType<PluginStatus>,
      required: false,
    },
    size: {
      type: String as PropType<BasicSize>,
      required: false,
      default: 'mini',
    },
    error: {
      type: String,
      required: false,
    }
  },
  emits: ['click'],
  setup(props: PluginStatusProps, {emit}) {
    const data = computed<TagData>(() => {
      const {status, error} = props;
      switch (status) {
        case PLUGIN_STATUS_INSTALLING:
          return {
            label: 'Installing',
            tooltip: 'Installing plugin',
            type: 'warning',
            icon: ['fa', 'spinner'],
            spinning: true,
          };
        case PLUGIN_STATUS_STOPPED:
          return {
            label: 'Stopped',
            tooltip: 'Plugin is stopped',
            type: 'info',
            icon: ['fa', 'stop'],
          };
        case PLUGIN_STATUS_RUNNING:
          return {
            label: 'Running',
            tooltip: 'Plugin is currently running',
            type: 'success',
            icon: ['fa', 'check'],
          };
        case PLUGIN_STATUS_ERROR:
          return {
            label: 'Error',
            tooltip: `Plugin stopped with an error:<br><span style="color: ${colors.red}">${error}</span>`,
            type: 'danger',
            icon: ['fa', 'times'],
          };
        default:
          return {
            label: 'Unknown',
            tooltip: 'Unknown plugin status',
            type: 'info',
            icon: ['fa', 'question'],
          };
      }
    });

    return {
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
.plugin-status {
}
</style>
