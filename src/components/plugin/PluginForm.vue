<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :selective="isSelectiveForm"
  >
    <template v-if="isCreate">
      <!--Row-->
      <FormItem
          :span="2"
          :label="t('components.plugin.form.installType')"
      >
        <el-radio-group v-model="form.install_type" type="button" size="small" @change="onInstallTypeChange">
          <el-radio-button label="name">{{ t('components.plugin.installType.name') }}</el-radio-button>
          <el-radio-button label="git">{{ t('components.plugin.installType.git') }}</el-radio-button>
          <el-radio-button label="local">{{ t('components.plugin.installType.local') }}</el-radio-button>
        </el-radio-group>
      </FormItem>
      <FormItem
          :span="2"
          :label="t('components.plugin.form.autoStart')"
      >
        <cl-switch v-model="form.auto_start"/>
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <template v-if="form.install_type === PLUGIN_INSTALL_TYPE_NAME">
        <FormItem
            :span="4"
            :label="t('components.plugin.form.name')"
            prop="name"
            required
        >
          <el-input
              v-model="form.name"
              :placeholder="t('components.plugin.form.name')"
          />
        </FormItem>
      </template>
      <template v-else-if="form.install_type === PLUGIN_INSTALL_TYPE_GIT">
        <FormItem
            :span="4"
            :label="t('components.plugin.form.installUrl')"
            prop="install_url"
            required
        >
          <el-input
              v-model="form.install_url"
              :placeholder="t('components.plugin.form.installUrl')"
          />
        </FormItem>
      </template>
      <template v-else-if="form.install_type === PLUGIN_INSTALL_TYPE_LOCAL">
        <FormItem
            :span="4"
            :label="t('components.plugin.form.installPath')"
            prop="install_url"
            required
        >
          <el-input
              v-model="form.install_url"
              :placeholder="t('components.plugin.form.installPath')"
          />
        </FormItem>
      </template>
      <!--./Row-->
    </template>

    <template v-else>
      <!--Row-->
      <FormItem
          :span="2"
          :offset="2"
          :label="t('components.plugin.form.name')"
          not-editable
          prop="name"
          required
      >
        <el-input
            v-model="form.name"
            disabled
            :placeholder="t('components.plugin.form.name')"
        />
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem
          :span="2"
          :label="t('components.plugin.form.command')"
          prop="cmd"
      >
        <el-input
            v-model="form.cmd"
            disabled
            :placeholder="t('components.plugin.form.command')"
        />
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem
          :span="4"
          :label="t('components.plugin.form.description')"
          prop="description"
      >
        <el-input
            v-model="form.description"
            disabled
            :placeholder="t('components.plugin.form.description')"
            type="textarea"
        />
      </FormItem>
    </template>

  </Form>
  <!--./Row-->
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useStore} from 'vuex';
import usePlugin from '@/components/plugin/plugin';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {PLUGIN_INSTALL_TYPE_GIT, PLUGIN_INSTALL_TYPE_LOCAL, PLUGIN_INSTALL_TYPE_NAME} from '@/constants/plugin';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'PluginForm',
  props: {
    readonly: {
      type: Boolean,
    }
  },
  components: {
    Form,
    FormItem,
  },
  setup(props, {emit}) {
    // i18n
    const {t} = useI18n();

    // store
    const ns = 'plugin';
    const store = useStore();
    const {plugin: state} = store.state as RootStoreState;

    const isCreate = computed<boolean>(() => state.activeDialogKey === 'create');

    const installFromUrl = ref<boolean>(false);

    const onInstallTypeChange = (value: PluginInstallType) => {
      // resetForm();
    };

    return {
      ...usePlugin(store),
      isCreate,
      installFromUrl,
      onInstallTypeChange,
      PLUGIN_INSTALL_TYPE_NAME,
      PLUGIN_INSTALL_TYPE_GIT,
      PLUGIN_INSTALL_TYPE_LOCAL,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
