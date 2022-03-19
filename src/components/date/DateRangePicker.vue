<template>
  <RangePicker
    class-name="date-range-picker"
    type="daterange"
    :model-value="modelValue"
    :shortcuts="shortcutItems"
    @change="value => $emit('change', value)"
  />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import RangePicker, {rangePickerProps} from '@/components/date/RangePicker.vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'DateRangePicker',
  components: {RangePicker},
  props: {
    ...rangePickerProps,
  },
  emits: [
    'change',
  ],
  setup(props: DateRangePickerProps, {emit}) {
    const {t} = useI18n();

    const shortcutItems = computed<RangePickerShortcut[]>(() => [
      {
        text: t('components.date.dateRangePicker.shortcuts.today'),
        value: () => {
          const end = new Date();
          const start = new Date();
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.yesterday'),
        value: () => {
          const end = new Date();
          end.setTime(end.getTime() - 3600 * 24 * 1e3);
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 24 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNDays', {n: 7}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 7 * 3600 * 24 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNDays', {n: 7}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 14 * 3600 * 24 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNDays', {n: 30}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 30 * 3600 * 24 * 1e3);
          return [start, end];
        }
      },
    ]);

    return {
      shortcutItems,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
