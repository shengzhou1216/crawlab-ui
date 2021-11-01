<template>
  <NavTabs
      :active-key="activeTabKey"
      :items="tabItems"
      @select="onTabSelect"
  >
    <template #extra>
      <div
          class="actions"
      >
        <LabelButton
            type="primary"
            :icon="!loading.pull ? ['fa', 'download'] : null"
            label="Pull"
            tooltip="Pull"
            :disabled="!gitForm.url || !gitForm.auth_type"
            :loading="loading.pull"
            @click="onClickPull"
        />
        <LabelButton
            type="success"
            :icon="!loading.commit ? ['fa', 'paper-plane'] : null"
            label="Commit"
            tooltip="Commit and Push"
            :disabled="!gitChangeSelection?.length"
            @click="onClickCommit"
        />
      </div>
    </template>
  </NavTabs>
  <div class="tab-content">
    <SpiderDetailTabGitRemote v-if="activeTabKey === 'remote'"/>
    <SpiderDetailTabGitTags v-else-if="activeTabKey === 'tags'"/>
    <SpiderDetailTabGitBranches v-else-if="activeTabKey === 'branches'"/>
    <SpiderDetailTabGitLogs v-else-if="activeTabKey === 'logs'"/>
    <SpiderDetailTabGitChanges v-else-if="activeTabKey === 'changes'"/>
    <SpiderDetailTabGitIgnore v-else-if="activeTabKey === 'ignore'"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, ref} from 'vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';
import {ElMessage, ElMessageBox} from 'element-plus';
import LabelButton from '@/components/button/LabelButton.vue';
import NavTabs from '@/components/nav/NavTabs.vue';
import useSpiderDetail from '@/views/spider/detail/spiderDetail';
import SpiderDetailTabGitChanges from '@/views/spider/detail/tabs/git/SpiderDetailTabGitChanges.vue';
import SpiderDetailTabGitLogs from '@/views/spider/detail/tabs/git/SpiderDetailTabGitLogs.vue';
import SpiderDetailTabGitTags from '@/views/spider/detail/tabs/git/SpiderDetailTabGitTags.vue';
import SpiderDetailTabGitIgnore from '@/views/spider/detail/tabs/git/SpiderDetailTabGitIgnore.vue';
import SpiderDetailTabGitRemote from '@/views/spider/detail/tabs/git/SpiderDetailTabGitRemote.vue';
import SpiderDetailTabGitBranches from '@/views/spider/detail/tabs/git/SpiderDetailTabGitBranches.vue';

export default defineComponent({
  name: 'SpiderDetailTabGit',
  components: {
    SpiderDetailTabGitRemote,
    LabelButton,
    NavTabs,
    SpiderDetailTabGitChanges,
    SpiderDetailTabGitLogs,
    SpiderDetailTabGitBranches,
    SpiderDetailTabGitTags,
    SpiderDetailTabGitIgnore,
  },
  setup() {
    // store
    const ns = 'spider';
    const gitNs = 'git';
    const store = useStore();
    const {
      spider: state,
      git: gitState,
    } = store.state as RootStoreState;

    // git form
    const gitForm = computed<Git>(() => gitState.form);

    // route
    const route = useRoute();

    // id
    const id = computed<string>(() => route.params.id as string);

    // active tab key
    const activeTabKey = ref<string>('remote');

    // tab items
    const tabItems = ref<NavItem[]>([
      {id: 'remote', title: 'Remote'},
      {id: 'branches', title: 'Branches'},
      {id: 'tags', title: 'Tags'},
      {id: 'logs', title: 'Logs'},
      {id: 'changes', title: 'Changes'},
      {id: 'ignore', title: 'Ignore'},
    ]);

    const onTabSelect = (key: string) => {
      activeTabKey.value = key;
    };

    onBeforeMount(async () => {
      await Promise.all([
        store.dispatch(`${ns}/getGit`, {id: id.value})
      ]);

      // set git form if git data exists
      if (state.gitData?.git?._id) {
        store.commit(`${gitNs}/setForm`, state.gitData?.git);
      }
    });

    const gitChangeSelection = computed<TableData<GitChange>>(() => state.gitChangeSelection);

    const loading = ref({
      pull: false,
      commit: false,
    });

    const {
      saveGit,
    } = useSpiderDetail();

    const onClickPull = async () => {
      await ElMessageBox.confirm('Are you sure to pull from remote?', 'Git Pull', {
        type: 'warning',
      });
      loading.value.pull = true;
      await saveGit();
      try {
        const res = await store.dispatch(`${ns}/gitPull`, {id: id.value});
        if (res) {
          await ElMessage.success('Pulled successfully');
        }
        await store.dispatch(`${ns}/getGit`, {id: id.value});
      } finally {
        loading.value.pull = false;
      }
    };

    const onClickCommit = async () => {
      await ElMessageBox.confirm('Are you sure to commit?', 'Git Commit', {
        type: 'warning',
      });
      loading.value.commit = true;
      await saveGit();
      try {
        const res = await store.dispatch(`${ns}/gitCommit`, {id: id.value});
        store.commit(`${ns}/resetGitChangeSelection`);
        if (res) {
          await ElMessage.success('Committed successfully');
        }
        await store.dispatch(`${ns}/gitCommit`, {id: id.value});
      } finally {
        loading.value.commit = false;
      }
    };

    return {
      loading,
      gitForm,
      activeTabKey,
      tabItems,
      onTabSelect,
      gitChangeSelection,
      onClickPull,
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
