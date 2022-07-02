<template>
  <DemoLayout active-name="basic">
    <Form>
      <FormItem
        :span="4"
        label="Form"
      >
        {{ form }}
      </FormItem>
      <FormItem
        :span="2"
        :offset="2"
        label="Names"
      >
        <InputList
          v-model="form.names"
        />
      </FormItem>
      <FormItem
        :span="2"
        :offset="2"
        label="Ids"
      >
        <InputList
          v-model="form.ids"
          disabled
        />
      </FormItem>
      <FormItem
        :span="2"
        :offset="2"
        label="Empty"
      >
        <InputList
          v-model="form.empty"
        />
      </FormItem>
    </Form>
  </DemoLayout>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import DemoLayout from '@/demo/layouts/DemoLayout.vue';
import InputList from '@/components/input/InputList.vue';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';

export default defineComponent({
  name: 'DemoInputList',
  components: {FormItem, Form, InputList, DemoLayout},
  setup() {
    const form = ref({
      names: [
        'Alpha',
        'Beta',
        'Gamma',
      ],
      ids: [
        '1',
        '2',
        '3,'
      ]
    });

    return {
      form,
    };
  }
});
</script>

<style lang="scss" scoped>
.form {
  margin: 20px;
}
</style>
