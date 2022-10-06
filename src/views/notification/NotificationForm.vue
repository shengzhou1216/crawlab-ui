<template>
  <Form :model="internalForm" ref="formRef">
    <FormItem :span="2" :label="t('views.notification.settings.form.name')" prop="name" required>
      <el-input v-model="internalForm.name" :placeholder="t('views.notification.settings.form.name')"
                @change="onChange"/>
    </FormItem>
    <FormItem :span="2" :label="t('views.notification.settings.form.description')" prop="description">
      <el-input
        v-model="internalForm.description"
        type="textarea"
        :placeholder="t('views.notification.settings.form.description')"
        @change="onChange"
      />
    </FormItem>
    <FormItem :span="2" :label="t('views.notification.settings.form.type')" prop="type">
      <el-select v-model="internalForm.type" @change="onChange">
        <el-option value="mail" :label="t('views.notification.settings.type.mail')"/>
        <el-option value="mobile" :label="t('views.notification.settings.type.mobile')"/>
      </el-select>
    </FormItem>
    <FormItem :span="2" :label="t('views.notification.settings.form.enabled')" prop="enabled">
      <Switch v-model="internalForm.enabled" @change="onChange"/>
    </FormItem>

    <template v-if="internalForm.type === 'mail'">
      <FormItem :span="2" :label="t('views.notification.settings.form.mail.smtp.server')" prop="mail.server" required>
        <el-input
          v-model="internalForm.mail.server"
          :placeholder="t('views.notification.settings.form.mail.smtp.server')"
          @change="onChange"
        />
      </FormItem>
      <FormItem :span="2" :label="t('views.notification.settings.form.mail.smtp.port')" prop="mail.port" required>
        <el-input
          v-model="internalForm.mail.port"
          :placeholder="t('views.notification.settings.form.mail.smtp.port')"
          @change="onChange"
        />
      </FormItem>
      <FormItem :span="2" :label="t('views.notification.settings.form.mail.smtp.user')" prop="mail.user">
        <el-input
          v-model="internalForm.mail.user"
          :placeholder="t('views.notification.settings.form.mail.smtp.user')"
          @change="onChange"
        />
      </FormItem>
      <FormItem :span="2" :label="t('views.notification.settings.form.mail.smtp.password')" prop="mail.password">
        <el-input
          v-model="internalForm.mail.password"
          :placeholder="t('views.notification.settings.form.mail.smtp.password')"
          @change="onChange"
        />
      </FormItem>
      <FormItem :span="2" :label="t('views.notification.settings.form.mail.smtp.sender.email')"
                prop="mail.sender_email">
        <el-input
          v-model="internalForm.mail.sender_email"
          :placeholder="t('views.notification.settings.form.mail.smtp.sender.email')"
          @change="onChange"
        />
      </FormItem>
      <FormItem :span="2" :label="t('views.notification.settings.form.mail.smtp.sender.identity')"
                prop="mail.sender_identity">
        <el-input
          v-model="internalForm.mail.sender_identity"
          :placeholder="t('views.notification.settings.form.mail.smtp.sender.identity')"
          @change="onChange"
        />
      </FormItem>
      <FormItem :span="2" :label="t('views.notification.settings.form.mail.to')" prop="mail.to" required>
        <el-input
          v-model="internalForm.mail.to"
          :placeholder="t('views.notification.settings.form.mail.to')"
          @change="onChange"
        />
      </FormItem>
      <FormItem :span="2" :label="t('views.notification.settings.form.mail.cc')" prop="mail.cc">
        <el-input
          v-model="internalForm.mail.cc"
          :placeholder="t('views.notification.settings.form.mail.cc')"
          @change="onChange"
        />
      </FormItem>
    </template>

    <template v-else-if="internalForm.type === 'mobile'">
      <FormItem :span="4" :label="t('views.notification.settings.form.mobile.webhook')" prop="mobile.webhook">
        <el-input
          v-model="internalForm.mobile.webhook"
          :placeholder="t('views.notification.settings.form.mobile.webhook')"
          @change="onChange"
        />
      </FormItem>
    </template>
  </Form>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from 'vue';
import {translate} from '@/utils';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import Switch from '@/components/switch/Switch.vue';

const t = translate;

export default defineComponent({
  name: 'NotificationForm',
  components: {
    Form,
    FormItem,
    Switch,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      }
    },
  },
  emits: [
    'update:modelValue',
  ],
  setup(props, {emit}) {
    const formRef = ref();

    const internalForm = ref<NotificationSetting>({
      name: '',
      description: '',
      type: 'mail',
      enabled: true,
      global: true,
      title: '',
      template: '',
      mail: {
        server: '',
        port: '465',
        user: '',
        password: '',
        sender_email: '',
        sender_identity: '',
        to: '',
        cc: '',
      },
      mobile: {
        webhook: '',
      },
    });

    onMounted(() => {
      internalForm.value = props.modelValue;
    });

    watch(() => props.modelValue, () => {
      internalForm.value = props.modelValue;
    });

    const onChange = () => {
      emit('update:modelValue', internalForm.value);
    };

    const validate = async () => {
      await formRef.value.validate();
    };

    return {
      formRef,
      internalForm,
      onChange,
      validate,
      t,
    };
  },
});
</script>

<style scoped>

</style>
