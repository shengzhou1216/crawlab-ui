<template>
  <Form
    v-if="form"
    ref="formRef"
    :model="form"
    :selective="isSelectiveForm"
  >
    <!--Row-->
    <FormItem
      :span="2"
      :label="t('components.node.form.name')"
      not-editable
      prop="name"
      required
    >
      <el-input
        v-locate="'name'"
        v-model="form.name"
        :disabled="isFormItemDisabled('name')"
        :placeholder="t('components.node.form.name')"
      />
    </FormItem>
    <FormItem
      v-if="readonly"
      :span="2"
      :label="t('components.node.form.key')"
      not-editable
      prop="key"
    >
      <el-input
        v-locate="'key'"
        :model-value="form.key"
        disabled
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <!--TODO: implement tags later-->
    <FormItem
      v-if="false"
      :span="2"
      :label="t('components.node.form.tags')"
      prop="tags"
    >
      <TagInput v-locate="'tags'" v-model="form.tags" :disabled="isFormItemDisabled('tags')"/>
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
      :span="2"
      :label="t('components.node.form.type')"
      not-editable
      prop="type"
    >
      <NodeType
        v-locate="'type'"
        :is-master="form.is_master"
      />
    </FormItem>
    <FormItem
      :span="2"
      :label="t('components.node.form.ip')"
      prop="ip"
    >
      <el-input
        v-locate="'ip'"
        v-model="form.ip"
        :disabled="isFormItemDisabled('ip')"
        :placeholder="t('components.node.form.ip')"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
      :span="2"
      :label="t('components.node.form.mac')"
      prop="mac"
    >
      <el-input
        v-locate="'mac'"
        v-model="form.mac"
        :disabled="isFormItemDisabled('mac')"
        :placeholder="t('components.node.form.mac')"
      />
    </FormItem>
    <FormItem
      :span="2"
      :label="t('components.node.form.hostname')"
      prop="hostname"
    >
      <el-input
        v-locate="'hostname'"
        v-model="form.hostname"
        :disabled="isFormItemDisabled('hostname')"
        :placeholder="t('components.node.form.hostname')"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
      :span="2"
      :label="t('components.node.form.enabled')"
      prop="enabled"
    >
      <Switch
        v-locate="'enabled'"
        v-model="form.enabled"
        :disabled="isFormItemDisabled('enabled')"
        @change="onEnabledChange"
      />
    </FormItem>
    <FormItem
      :span="2"
      :label="t('components.node.form.max_runners')"
      prop="max_runners"
    >
      <el-input-number
        v-locate="'max_runners'"
        v-model="form.max_runners"
        :disabled="isFormItemDisabled('max_runners')"
        :min="0"
        :placeholder="t('components.node.form.max_runners')"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
      :span="4"
      :label="t('components.node.form.description')"
      prop="description"
    >
      <el-input
        v-locate="'description'"
        v-model="form.description"
        :disabled="isFormItemDisabled('description')"
        :placeholder="t('components.node.form.description')"
        type="textarea"
      />
    </FormItem>
  </Form>
  <!--./Row-->
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import useNode from '@/components/node/node';
import TagInput from '@/components/input/TagInput.vue';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import NodeType from '@/components/node/NodeType.vue';
import Switch from '@/components/switch/Switch.vue';
import {useI18n} from 'vue-i18n';
import {sendEvent} from '@/admin/umeng';

export default defineComponent({
  name: 'NodeForm',
  props: {
    readonly: {
      type: Boolean,
    }
  },
  components: {
    Switch,
    NodeType,
    Form,
    FormItem,
    TagInput,
  },
  setup(props, {emit}) {
    // i18n
    const {t} = useI18n();

    // store
    const store = useStore();

    const onEnabledChange = (value: boolean) => {
      sendEvent(value ? 'click_node_form_enable' : 'click_node_form_disable');
    };

    return {
      ...useNode(store),
      onEnabledChange,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
