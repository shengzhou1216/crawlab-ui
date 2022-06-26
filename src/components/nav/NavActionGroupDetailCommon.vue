<template>
  <NavActionGroup>
    <NavActionButton
      v-auth="ACTION_BACK"
      :disabled="disabled"
      :icon="['fa', 'undo']"
      button-type="label"
      :label="t('components.nav.actions.back')"
      type="primary"
      id="back-btn"
      class-name="back-btn"
      @click="() => $emit('back')"
    />
    <NavActionButton
      v-auth="ACTION_SAVE"
      :disabled="disabled"
      :icon="['fa', 'save']"
      button-type="label"
      :label="t('components.nav.actions.save')"
      type="success"
      id="save-btn"
      class-name="save-btn"
      @click="() => $emit('save')"
    />
  </NavActionGroup>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionButton from '@/components/nav/NavActionButton.vue';
import {useI18n} from 'vue-i18n';
import {ACTION_BACK, ACTION_SAVE} from '@/constants';

export default defineComponent({
  name: 'NavActionGroupDetailCommon',
  components: {NavActionButton, NavActionGroup},
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'back',
  ],
  setup() {
    const {t} = useI18n();

    return {
      t,
      ACTION_BACK,
      ACTION_SAVE,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
