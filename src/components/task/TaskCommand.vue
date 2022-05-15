<template>
  <Tag
    :key="data"
    :color="data.color"
    :icon="data.icon"
    :label="data.label"
    :size="size"
    :type="data.type"
    effect="plain"
    @click="$emit('click')"
  >
    <template #tooltip>
      <div class="tooltip" v-html="data.tooltip"/>
    </template>
  </Tag>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import {emptyObjectFunc} from '@/utils';
import Tag from '@/components/tag/Tag.vue';
import {useI18n} from 'vue-i18n';
import variables from '@/styles/variables.scss';

export default defineComponent({
  name: 'TaskCommand',
  components: {
    Tag,
  },
  emits: [
    'click',
  ],
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
    spider: {
      type: Object as PropType<Spider>,
      default: emptyObjectFunc,
    },
    size: {
      type: String as PropType<BasicSize>,
      required: false,
      default: 'default',
    },
  },
  setup(props: TaskConfigProps, {emit}) {
    const {t} = useI18n();

    const getLabel = (s?: string, n = 12) => {
      if (!s) return;
      return s.length > n ? `${s.substring(0, n)}...` : s;
    };

    const cmd = computed<string>(() => {
      const {task} = props;
      const arr = [];
      arr.push(task.cmd);
      if (task.param) arr.push(task.param);
      return arr.join(' ');
    });

    const type = computed<BasicType>(() => {
      const {task, spider} = props;
      if (!task.cmd) return 'info';
      if (!spider) return 'primary';
      if (spider.cmd === task.cmd && spider.param === task.param) return 'primary';
      return 'warning';
    });

    const color = computed<Color>(() => {
      switch (type.value) {
        case 'info':
          return variables.infoLightColor;
        case 'primary':
          return variables.primaryColor;
        case 'warning':
          return variables.warningColor;
        default:
          return variables.infoLightColor;
      }
    });

    const isCustomized = computed<boolean>(() => type.value === 'warning');

    const data = computed<TagData>(() => {
      return {
        type: type.value,
        label: getLabel(cmd.value) || '-',
        tooltip: `<div>${t('components.task.form.command')}${isCustomized.value ? ` (${t('components.task.form.tooltip.customized')})` : ''}:</div>
<div style="color: ${color.value};font-weight: 600">${cmd.value || '-'}</div>`,
      };
    });

    return {
      data,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
