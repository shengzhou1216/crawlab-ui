<template>
  <div class="nav-action-button">
    <LabelButton
      v-if="buttonType === 'label'"
      :disabled="disabled"
      :icon="icon"
      :is-icon="!!icon"
      :label="label"
      :size="size"
      :tooltip="tooltip"
      :type="type"
      :id="id"
      :class-name="className"
      @click="onClick"
    />
    <FaIconButton
      v-else-if="buttonType === 'fa-icon'"
      :disabled="disabled"
      :icon="icon"
      :size="size"
      :tooltip="tooltip"
      :type="type"
      :id="id"
      :class-name="className"
      @click="onClick"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {buttonProps} from '@/components/button/Button.vue';
import LabelButton from '@/components/button/LabelButton.vue';
import FaIconButton from '@/components/button/FaIconButton.vue';

export default defineComponent({
  name: 'NavActionButton',
  components: {
    LabelButton,
    FaIconButton,
  },
  props: {
    buttonType: {
      type: String as PropType<ButtonType>,
      required: true,
    },
    label: {
      type: String,
    },
    icon: {
      type: [String, Array] as PropType<Icon>
    },
    onClick: {
      type: Function as PropType<() => void>
    },
    ...buttonProps,
  },
  setup(props, {emit}) {
    return {};
  },
});
</script>

<style lang="scss" scoped>

</style>
