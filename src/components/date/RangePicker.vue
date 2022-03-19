<template>
  <div class="range-picker" :class="className">
    <el-date-picker
      v-model="internalValue"
      :type="type"
      :shortcuts="shortcuts"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import {computed, defineComponent, onBeforeMount, PropType, ref, watch} from 'vue';
import {emptyArrayFunc} from '@/utils/func';

export const rangePickerProps = {
  modelValue: {
    type: Object as PropType<DateRange>,
  },
  className: {
    type: String,
  },
  type: {
    type: String as PropType<RangePickerType>,
    default: 'daterange',
  },
  shortcuts: {
    type: Array as PropType<RangePickerShortcut[]>,
    default: emptyArrayFunc,
  },
};

export default defineComponent({
  name: 'RangePicker',
  props: {
    ...rangePickerProps,
  },
  emits: [
    'change',
  ],
  setup(props: RangePickerProps, {emit}) {
    const internalValue = ref<[Date | undefined, Date | undefined]>();

    const dateRangeValue = computed<DateRange>(() => {
      return {
        start: dayjs(internalValue.value?.[0]),
        end: dayjs(internalValue.value?.[1]),
      };
    });

    const onChange = () => {
      emit('change', dateRangeValue.value);
    };

    const updateInternalValue = () => {
      internalValue.value = [props.modelValue?.start?.toDate(), props.modelValue?.end?.toDate()];
    };
    onBeforeMount(updateInternalValue);
    watch(() => props.modelValue, updateInternalValue);

    return {
      internalValue,
      onChange,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
