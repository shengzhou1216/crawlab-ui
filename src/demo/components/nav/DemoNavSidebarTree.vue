<template>
  <NavSidebar
    type="tree"
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
  name: 'DemoNavSidebarTree',
  components: {
    NavSidebar,
  },
  setup() {
    const activeKey = ref<string>('1');

    const items = ref<NavItem[]>([
      {id: '1', title: 'Item 1'},
      {id: '2', title: 'Item 2'},
      {
        id: '3',
        title: 'Item 3',
        children: [
          {
            id: '3.1',
            title: 'Item 3.1',
          },
          {
            id: '3.2',
            title: 'Item 3.2',
          }
        ]
      },
    ]);

    const onSelect = (item: NavItem) => {
      ElMessage.info(`Clicked item: ${item.title}`);
      activeKey.value = item.id;
    };

    return {
      items,
      onSelect,
      activeKey,
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
