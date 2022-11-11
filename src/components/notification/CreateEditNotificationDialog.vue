<template>
  <CreateEditDialog
    :type="activeDialogKey"
    :tab-name="createEditDialogTabName"
    :visible="createEditDialogVisible"
    :action-functions="actionFunctions"
    :batch-form-data="formList"
    :confirm-disabled="confirmDisabled"
    :confirm-loading="confirmLoading"
    :batch-form-fields="batchFormFields"
  >
    <template #default>
      <NotificationForm/>
    </template>
  </CreateEditDialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
import CreateEditDialog from '@/components/dialog/CreateEditDialog.vue';
import NotificationForm from '@/components/notification/NotificationForm.vue';
import useNotification from '@/components/notification/notification';

export default defineComponent({
  name: 'CreateEditNotificationDialog',
  components: {
    CreateEditDialog,
    NotificationForm,
  },
  setup() {
    // store
    const store = useStore();

    return {
      ...useNotification(store),
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
