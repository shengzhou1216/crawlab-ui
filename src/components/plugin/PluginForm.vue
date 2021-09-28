<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :selective="isSelectiveForm"
  >
    <template v-if="isCreate">
      <!--Row-->
      <FormItem :span="2" label="Type">
        <el-radio-group v-model="form.install_type" type="button" size="small" @change="onInstallTypeChange">
          <el-radio-button label="name">Name</el-radio-button>
          <el-radio-button label="git">Git</el-radio-button>
          <el-radio-button label="local">Local</el-radio-button>
        </el-radio-group>
      </FormItem>
      <FormItem :span="2" label="Auto Start">
        <cl-switch v-model="form.auto_start"/>
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <template v-if="form.install_type === PLUGIN_INSTALL_TYPE_NAME">
        <FormItem :span="4" label="Name" prop="name" required>
          <el-input v-model="form.name" placeholder="Name"/>
        </FormItem>
      </template>
      <template v-else-if="form.install_type === PLUGIN_INSTALL_TYPE_GIT">
        <FormItem :span="4" label="Install URL" prop="install_url" required>
          <el-input v-model="form.install_url" placeholder="Install URL"/>
        </FormItem>
      </template>
      <template v-else-if="form.install_type === PLUGIN_INSTALL_TYPE_LOCAL">
        <FormItem :span="4" label="Install Path" prop="install_url" required>
          <el-input v-model="form.install_url" placeholder="Install Path"/>
        </FormItem>
      </template>
      <!--./Row-->
    </template>

    <template v-else>
      <!--Row-->
      <FormItem :span="2" :offset="2" label="Name" not-editable prop="name" required>
        <el-input v-model="form.name" disabled placeholder="Name"/>
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem :span="2" label="Execute Command" prop="cmd">
        <el-input
            v-model="form.cmd"
            disabled
            placeholder="cmd"
        />
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem :span="4" label="Description" prop="description">
        <el-input
            v-model="form.description"
            disabled
            placeholder="Description"
            type="textarea"
        />
      </FormItem>
    </template>

  </Form>
  <!--./Row-->
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeUnmount, ref} from 'vue';
import {useStore} from 'vuex';
import usePlugin from '@/components/plugin/plugin';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {PLUGIN_INSTALL_TYPE_GIT, PLUGIN_INSTALL_TYPE_LOCAL, PLUGIN_INSTALL_TYPE_NAME} from '@/constants/plugin';

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
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
