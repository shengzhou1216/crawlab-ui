<template>
  <div class="notification-detail-tab-overview">
    <!-- Notification Form (handled by store) -->
    <NotificationForm/>
    <!-- ./Notification Form -->
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import NotificationForm from '@/components/notification/NotificationForm.vue';

export default defineComponent({
  name: 'NotificationDetailTabOverview',
  components: {
    NotificationForm,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.notification-detail-tab-overview {
  margin: 20px;
}
</style>
