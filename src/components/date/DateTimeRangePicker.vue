<template>
  <RangePicker
    class-name="date-time-range-picker"
    type="datetimerange"
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
        text: t('components.date.dateRangePicker.shortcuts.pastNMinutes', {n: 10}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 10 * 60 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNMinutes', {n: 30}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 30 * 60 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNHours', {n: 1}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNHours', {n: 3}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3 * 3600 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNHours', {n: 6}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 6 * 3600 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNHours', {n: 12}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 12 * 3600 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNDays', {n: 1}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 24 * 3600 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNDays', {n: 3}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3 * 24 * 3600 * 1e3);
          return [start, end];
        }
      },
      {
        text: t('components.date.dateRangePicker.shortcuts.pastNDays', {n: 7}),
        value: () => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 7 * 24 * 3600 * 1e3);
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
