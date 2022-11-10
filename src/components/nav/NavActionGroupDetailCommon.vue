<template>
  <NavActionGroup>
    <NavActionItem>
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
    </NavActionItem>
    <NavActionItem>
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
    </NavActionItem>
  </NavActionGroup>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useI18n} from 'vue-i18n';
import {ACTION_BACK, ACTION_SAVE} from '@/constants';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionButton from '@/components/nav/NavActionButton.vue';

export default defineComponent({
  name: 'NavActionGroupDetailCommon',
  components: {NavActionButton, NavActionGroup, NavActionItem},
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
