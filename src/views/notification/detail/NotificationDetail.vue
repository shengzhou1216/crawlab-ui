<template>
  <DetailLayout store-namespace="notification">
  </DetailLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DetailLayout from '@/layouts/content/detail/DetailLayout.vue';
import useNotificationDetail from '@/views/notification/detail/useNotificationDetail';

export default defineComponent({
  name: 'NotificationDetail',
  components: {DetailLayout},
  setup() {
    return {
      ...useNotificationDetail(),
    };
  },
});
</script>

<style scoped>

</style>
