<template>
  <Form
      v-if="form"
      ref="formRef"
      :model="form"
      :selective="isSelectiveForm"
  >
    <!--Row-->
    <FormItem
        v-if="readonly"
        :offset="2"
        :span="2"
        :label="t('components.node.nodeForm.key')"
        not-editable
        prop="key"
    >
      <el-input :value="form.key" disabled/>
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="2"
        :label="t('components.node.nodeForm.name')"
        not-editable
        prop="name"
        required
    >
      <el-input
          v-model="form.name"
          :disabled="isFormItemDisabled('name')"
          :placeholder="t('components.node.nodeForm.name')"
      />
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.node.nodeForm.tags')"
        prop="tags"
    >
      <TagInput v-model="form.tags" :disabled="isFormItemDisabled('tags')"/>
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="2"
        :label="t('components.node.nodeForm.type')"
        not-editable
        prop="type"
    >
      <NodeType :is-master="form.is_master"/>
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.node.nodeForm.ip')"
        prop="ip"
    >
      <el-input
          v-model="form.ip"
          :disabled="isFormItemDisabled('ip')"
          :placeholder="t('components.node.nodeForm.ip')"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="2"
        :label="t('components.node.nodeForm.mac')"
        prop="mac"
    >
      <el-input
          v-model="form.mac"
          :disabled="isFormItemDisabled('mac')"
          :placeholder="t('components.node.nodeForm.mac')"
      />
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.node.nodeForm.hostname')"
        prop="hostname"
    >
      <el-input
          v-model="form.hostname"
          :disabled="isFormItemDisabled('hostname')"
          :placeholder="t('components.node.nodeForm.hostname')"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="2"
        :label="t('components.node.nodeForm.enabled')"
        prop="enabled"
    >
      <Switch v-model="form.enabled" :disabled="isFormItemDisabled('enabled')"/>
    </FormItem>
    <FormItem
        :span="2"
        :label="t('components.node.nodeForm.max_runners')"
        prop="max_runners"
    >
      <el-input-number
          v-model="form.max_runners"
          :disabled="isFormItemDisabled('max_runners')"
          :min="0"
          :placeholder="t('components.node.nodeForm.max_runners')"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
        :span="4"
        :label="t('components.node.nodeForm.description')"
        prop="description"
    >
      <el-input
          v-model="form.description"
          :disabled="isFormItemDisabled('description')"
          :placeholder="t('components.node.nodeForm.description')"
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

    return {
      ...useNode(store),
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
