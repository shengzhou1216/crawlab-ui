<template>
  <div class="notification-tab">
    <el-tabs v-model="tabName" type="card">
      <el-tab-pane name="mail" label="Mail">
        <Form>
          <FormItem :span="2" label="Name" required>
            <!--            <el-input v-model="name" size="small" placeholder="name"/>-->
          </FormItem>
        </Form>
      </el-tab-pane>
      <el-tab-pane name="mobile" label="Mobile">
        <Form :model="form.mobile">
          <FormItem :span="4" label="Enabled" prop="enabled">
            <Switch v-model="form.mobile.enabled"/>
          </FormItem>
          <FormItem :span="4" label="Webhook" prop="webhook" :required="form.mobile.enabled">
            <el-input
              v-model="form.mobile.webhook"
              :disabled="!form.mobile.enabled"
              placeholder="Webhook"
              @change="onSave"
            />
          </FormItem>
        </Form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import Switch from '@/components/switch/Switch.vue';

export default defineComponent({
  name: 'NotificationTab',
  components: {
    Form,
    FormItem,
    Switch,
  },
  setup() {
    const tabName = ref('mail');

    const form = ref({
      mail: {},
      mobile: {},
    });

    const onSave = async () => {
      // do nothing
    };

    return {
      tabName,
      form,
      onSave,
    };
  },
});
</script>

<style scoped>
.notification-tab {
  margin: 20px;
}
</style>
