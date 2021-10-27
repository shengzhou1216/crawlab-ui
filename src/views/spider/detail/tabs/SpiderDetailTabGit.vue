<template>
  <NavTabs
      :active-key="activeTabKey"
      :items="tabItems"
      @select="onTabSelect"
  >
    <template #extra>
      <div
          v-if="activeTabKey === 'changes'"
          class="actions"
      >
        <LabelButton
            type="success"
            :icon="['fa', 'paper-plane']"
            label="Commit"
            tooltip="Commit and Push"
            :disabled="!gitChangeSelection?.length"
            @click="onClickCommit"
        />
      </div>
    </template>
  </NavTabs>
  <div class="tab-content">
    <SpiderDetailTabGitOverview v-if="activeTabKey === 'overview'"/>
    <SpiderDetailTabGitChanges v-else-if="activeTabKey === 'changes'"/>
    <SpiderDetailTabGitLogs v-else-if="activeTabKey === 'logs'"/>
    <SpiderDetailTabGitTags v-else-if="activeTabKey === 'tags'"/>
    <SpiderDetailTabGitIgnore v-else-if="activeTabKey === 'ignore'"/>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, onBeforeMount, ref} from 'vue';
import NavTabs from '@/components/nav/NavTabs.vue';
import SpiderDetailTabGitOverview from '@/views/spider/detail/tabs/git/SpiderDetailTabGitOverview.vue';
import SpiderDetailTabGitChanges from '@/views/spider/detail/tabs/git/SpiderDetailTabGitChanges.vue';
import SpiderDetailTabGitLogs from '@/views/spider/detail/tabs/git/SpiderDetailTabGitLogs.vue';
import SpiderDetailTabGitTags from '@/views/spider/detail/tabs/git/SpiderDetailTabGitTags.vue';
import SpiderDetailTabGitIgnore from '@/views/spider/detail/tabs/git/SpiderDetailTabGitIgnore.vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';
import LabelButton from '@/components/button/LabelButton.vue';
import {ElMessage, ElMessageBox} from 'element-plus';

export default defineComponent({
  name: 'SpiderDetailTabGit',
  components: {
    LabelButton,
    NavTabs,
    SpiderDetailTabGitOverview,
    SpiderDetailTabGitChanges,
    SpiderDetailTabGitLogs,
    SpiderDetailTabGitTags,
    SpiderDetailTabGitIgnore,
  },
  setup() {
    // store
    const ns = 'spider';
    const store = useStore();
    const {
      spider: state,
    } = store.state as RootStoreState;

    // route
    const route = useRoute();

    // id
    const id = computed<string>(() => route.params.id as string);

    // active tab key
    const activeTabKey = ref<string>('overview');

    // tab items
    const tabItems = ref<NavItem[]>([
      {id: 'overview', title: 'Overview'},
      {id: 'changes', title: 'Changes'},
      {id: 'logs', title: 'Logs'},
      {id: 'tags', title: 'Tags'},
      {id: 'ignore', title: 'Ignore'},
    ]);

    const onTabSelect = (key: string) => {
      activeTabKey.value = key;
    };

    onBeforeMount(async () => {
      await Promise.all([
        store.dispatch(`${ns}/getGit`, {id: id.value})
      ]);
    });

    const gitChangeSelection = computed<TableData<GitChange>>(() => state.gitChangeSelection);

    const onClickCommit = async () => {
      await ElMessageBox.confirm('Are you sure to commit?', 'Git Commit', {
        type: 'warning',
      });
      await store.dispatch(`${ns}/gitCommit`, {id: id.value});
      store.commit(`${ns}/resetGitChangeSelection`);
      await ElMessage.success('Committed successfully');
      await store.dispatch(`${ns}/getGit`, {id: id.value});
    };

    return {
      activeTabKey,
      tabItems,
      onTabSelect,
      gitChangeSelection,
      onClickCommit,
    };
  },
});
</script>
<style scoped lang="scss">
.tab-content {
  height: calc(100% - 41px);
}
</style>
