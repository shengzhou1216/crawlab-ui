<template>
  <SimpleLayout>
    <UserForm/>
  </SimpleLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import UserForm from "@/components/user/UserForm.vue";
import SimpleLayout from "@/layouts/content/simple/SimpleLayout.vue";

export default defineComponent({
  name: 'MySettings',
  components: {
    SimpleLayout,
    UserForm,
  },
});

</script>

<style scoped lang="scss">

</style>
