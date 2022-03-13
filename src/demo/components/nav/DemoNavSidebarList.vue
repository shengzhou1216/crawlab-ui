<template>
  <NavSidebar
    type="list"
    :active-key="activeKey"
    :items="items"
    @select="onSelect"
  />
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import NavSidebar from '@/components/nav/NavSidebar.vue';
import {ElMessage} from 'element-plus';

export default defineComponent({
  name: 'DemoNavSidebarList',
  components: {
    NavSidebar,
  },
  setup() {
    const activeKey = ref<string>('1');

    const items = ref<NavItem[]>([
      {id: '1', title: 'Item 1'},
      {id: '2', title: 'Item 2'},
      {id: '3', title: 'Item 3'},
    ]);

    const onSelect = (item: NavItem) => {
      ElMessage.info(`Clicked item: ${item.title}`);
      activeKey.value = item.id;
    };

    return {
      activeKey,
      items,
      onSelect,
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
