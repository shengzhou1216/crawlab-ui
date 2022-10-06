<template>
  <div class="detail-layout notification-detail">
    <div class="content">
      <NavTabs
        :active-key="activeKey"
        :items="tabs"
        @select="onTabSelect"
      />
      <NavActions
        class="nav-actions"
        :collapsed="false"
      >
        <NavActionGroupDetailCommon
          @back="onBack"
          @save="onSave"
        />
      </NavActions>

      <template v-if="activeKey === 'overview'">
        <NotificationForm
          class="content-container"
          ref="formRef"
          v-model="form"
        />
      </template>
      <NotificationDetailTabTriggers
        class="content-container"
        v-else-if="activeKey === 'triggers'"
        :form="form"
        :trigger-list="triggerList"
        @change="onTriggersChange"
      />
      <NotificationDetailTabTemplate
        v-else-if="activeKey === 'template'"
        :form="form"
        @title-change="onTitleChange"
        @template-change="onTemplateChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import {translate} from '@/utils';
import useRequest from '@/services/request';
import NotificationDetailTabTriggers from '@/views/notification/NotificationDetailTabTriggers.vue';
import NotificationForm from '@/views/notification/NotificationForm.vue';
import NotificationDetailTabTemplate from '@/views/notification/NotificationDetailTabTemplate.vue';
import NavTabs from '@/components/nav/NavTabs.vue';
import NavActions from '@/components/nav/NavActions.vue';
import NavActionGroupDetailCommon from '@/components/nav/NavActionGroupDetailCommon.vue';

const t = translate;

const endpoint = '/notifications';

const {
  get,
  put,
} = useRequest();

export default defineComponent({
  name: 'NotificationDetail',
  components: {
    NavTabs,
    NavActions,
    NavActionGroupDetailCommon,
    NotificationDetailTabTriggers,
    NotificationForm,
    NotificationDetailTabTemplate,
  },
  setup() {
    const router = useRouter();

    const route = useRoute();

    const id = computed(() => route.params.id);

    const activeKey = ref('overview');

    const tabs = computed(() => [
      {
        id: 'overview',
        title: t('views.notification.tabs.overview'),
      },
      {
        id: 'triggers',
        title: t('views.notification.tabs.triggers'),
      },
      {
        id: 'template',
        title: t('views.notification.tabs.template'),
      },
    ]);

    const form = ref<NotificationSetting>({});

    const formRef = ref();

    const triggerList = ref([]);

    const onBack = () => {
      router.push(`/notifications`);
    };

    const onSave = async () => {
      if (formRef.value) await formRef.value.validate();
      await put(`${endpoint}/settings/${id.value}`, form.value);
      ElMessage.success(t('common.message.success.save'));
    };

    const triggerActionLabelMap = computed<{ [key: string]: string }>(() => {
      return {
        add: t('common.actions.add'),
        save: t('common.actions.save'),
        change: t('common.actions.change'),
        delete: t('common.actions.delete'),
      };
    });

    const getTriggerList = async () => {
      const res = await get(`${endpoint}/triggers`);
      const {data} = res;
      triggerList.value = data.map((trigger: any) => {
        const arr = trigger.split(':');
        const modelName = arr[1];
        const action = arr[2];
        const actionLabel = triggerActionLabelMap.value[action];
        const label = `${t(`views.notification.triggers.models.${modelName}`)} ${actionLabel}`;
        return {
          key: trigger,
          label,
        };
      });
    };

    const getSettingForm = async () => {
      const res = await get(`${endpoint}/settings/${id.value}`);
      const {data} = res;
      form.value = data;
    };

    onMounted(() => {
      getSettingForm();
      getTriggerList();
    });

    const onTabSelect = (tabName: string) => {
      activeKey.value = tabName;
    };

    const onTriggersChange = (value: string) => {
      form.value.triggers = [value];
    };

    const onTitleChange = (value: string) => {
      form.value.title = value;
    };

    const onTemplateChange = (value: string) => {
      form.value.template = value;
    };

    return {
      activeKey,
      tabs,
      onBack,
      onSave,
      form,
      formRef,
      triggerList,
      onTabSelect,
      onTriggersChange,
      onTitleChange,
      onTemplateChange,
      t,
    };
  },
});
</script>

<style scoped>
.detail-layout {
  display: flex;
  height: 100%;
}

.detail-layout .content {
  flex: 1;
  max-width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.detail-layout .content .content-container {
  margin: 20px;
}
</style>
