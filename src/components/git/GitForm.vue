<template>
  <Form
    v-if="form"
    ref="formRef"
    :model="form"
    :selective="isSelectiveForm"
  >
    <!--Row-->
    <FormItem
      :span="4"
      :label="t('components.git.form.remoteUrl')"
      prop="url"
    >
      <el-input
        v-model="form.url"
        :placeholder="t('components.git.form.remoteUrl')"
        id="url"
        class="url"
        @change="onUrlChange"
      />
    </FormItem>
    <!--./Row-->

    <!--Row-->
    <FormItem
      :span="1"
      :offset="3"
      :label="t('components.git.form.authType')"
      prop="auth_type"
    >
      <el-radio-group
        v-model="form.auth_type"
        id="auth_type"
        class="auth_type"
      >
        <el-radio-button label="http">HTTP</el-radio-button>
        <el-radio-button label="ssh">SSH</el-radio-button>
      </el-radio-group>
    </FormItem>
    <!--./Row-->

    <template v-if="form.auth_type === 'http'">
      <!--Row-->
      <FormItem
        :span="2"
        :offset="2"
        :label="t('components.git.form.username')"
        prop="username"
      >
        <el-input
          v-model="form.username"
          :placeholder="t('components.git.form.username')"
          id="username"
          class="username"
          @change="onUsernameChange"
        />
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem
        :span="2"
        :offset="2"
        :label="t('components.git.form.password')"
        prop="password"
      >
        <el-input
          v-model="form.password"
          :placeholder="t('components.git.form.password')"
          type="password"
          id="password"
          class="password"
          @change="onPasswordChange"
        />
      </FormItem>
      <!--./Row-->
    </template>

    <template v-else-if="form.auth_type === 'ssh'">
      <!--Row-->
      <FormItem
        :span="2"
        :offset="2"
        :label="t('components.git.form.username')"
        prop="username"
      >
        <el-input
          v-model="form.username"
          :placeholder="t('components.git.form.username')"
          id="username"
          class="username"
          @change="onUsernameChange"
        />
      </FormItem>
      <!--./Row-->

      <!--Row-->
      <FormItem
        :span="4"
        :label="t('components.git.form.privateKey')"
        prop="password"
      >
        <el-input
          v-model="form.password"
          :placeholder="t('components.git.form.privateKey')"
          type="textarea"
          rows="20"
          id="password"
          class="password"
          @change="onPasswordChange"
        />
      </FormItem>
      <!--./Row-->
    </template>
  </Form>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, watch} from 'vue';
import {useStore} from 'vuex';
import useGit from '@/components/git/git';
import Form from '@/components/form/Form.vue';
import FormItem from '@/components/form/FormItem.vue';
import {useI18n} from 'vue-i18n';
import {emptyArrayFunc} from '@/utils';

export default defineComponent({
  name: 'GitForm',
  components: {FormItem, Form},
  props: {
    branchSelectOptions: {
      type: Array as PropType<SelectOption[]>,
      default: emptyArrayFunc,
    },
  },
  emits: [
    'change',
  ],
  setup(props: GitFormProps, {emit}) {
    // i18n
    const {t} = useI18n();

    // store
    const ns = 'git';
    const store = useStore();
    const {
      git: state,
    } = store.state as RootStoreState;

    const onUrlChange = (url: string) => {
      let authType;
      let username;
      if (url.match(/^http|^\/\//)) {
        authType = 'http';
      } else if (url.match(/^ssh|@/)) {
        authType = 'ssh';
        username = url.match(/(\w+)@/)?.[1];
      } else {
        authType = 'http';
      }
      const payload = {
        ...state.form,
        auth_type: authType,
      };
      if (username) payload.username = username;
      store.commit(`${ns}/setForm`, payload);
      emit('change', state.form);
    };

    const onCurrentBranchChange = (currentBranch: string) => {
      store.commit(`${ns}/setForm`, {
        ...state.form,
        current_branch: currentBranch,
      });
      emit('change', state.form);
    };

    const onUsernameChange = (username: string) => {
      store.commit(`${ns}/setForm`, {
        ...state.form,
        username,
      });
      emit('change', state.form);
    };

    const onPasswordChange = (password: string) => {
      store.commit(`${ns}/setForm`, {
        ...state.form,
        password,
      });
      emit('change', state.form);
    };

    const gitBranchSelectOptions = computed<SelectOption[]>(() => store.getters['spider/gitBranchSelectOptions']);

    const isCurrentBranchDisabled = computed<boolean>(() => !gitBranchSelectOptions.value?.length);

    watch(() => JSON.stringify(gitBranchSelectOptions.value), () => {
      if (!state.form.current_branch && gitBranchSelectOptions.value?.length > 0) {
        onCurrentBranchChange(gitBranchSelectOptions.value[0].value);
      }
    });

    return {
      ...useGit(store),
      onUrlChange,
      onCurrentBranchChange,
      gitBranchSelectOptions,
      isCurrentBranchDisabled,
      onUsernameChange,
      onPasswordChange,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
