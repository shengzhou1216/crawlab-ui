<template>
  <Form
    :key="JSON.stringify(form)"
    :model="form"
  >
    <FormItem :span="4" prop="key" :label="t('views.env.deps.settings.form.key')">
      <el-input v-model="internalForm.key" disabled/>
    </FormItem>
    <FormItem :span="4" prop="name" :label="t('views.env.deps.settings.form.name')">
      <el-input v-model="internalForm.name" disabled/>
    </FormItem>
    <FormItem :span="4" prop="description" :label="t('views.env.deps.settings.form.description')">
      <el-input
        :model-value="t(`views.env.deps.settings.lang.${internalForm.key}.description`)"
        type="textarea"
        disabled
      />
    </FormItem>
    <FormItem :span="4" prop="cmd" :label="t('views.env.deps.settings.form.cmd')">
      <el-input v-model="internalForm.cmd" :placeholder="t('views.env.deps.settings.form.cmd')" @change="onChange"/>
    </FormItem>
    <FormItem :span="4" prop="proxy" :label="t('views.env.deps.settings.form.proxy')">
      <el-input v-model="internalForm.proxy" :placeholder="t('views.env.deps.settings.form.proxy')" @change="onChange"/>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, ref, watch} from 'vue';
import {emptyObjectFunc, translate} from '@/utils';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';

const t = translate;

export default defineComponent({
  name: 'DependencySettingForm',
  components: {
    Form,
    FormItem,
  },
  props: {
    form: {
      type: Object,
      default: emptyObjectFunc,
    }
  },
  emits: [
    'change',
  ],
  setup(props, {emit}) {
    const internalForm = ref({});

    const onChange = () => {
      emit('change', internalForm.value);
    };

    watch(() => props.form, () => {
      internalForm.value = {...props.form};
    });

    onBeforeMount(() => {
      internalForm.value = {...props.form};
    });

    return {
      internalForm,
      onChange,
      t,
    };
  },
});
</script>

<style scoped>

</style>
