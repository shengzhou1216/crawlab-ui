<template>
  <NavActionGroup>
    <NavActionFaIcon :icon="['fa', 'code-branch']" tooltip="Git Actions"/>
    <NavActionItem>
      <FaIconButton :icon="['fa', 'download']" tooltip="Pull" type="primary" @click="onClickPull"/>
      <FaIconButton :icon="['fa', 'upload']" tooltip="Commit and Push" type="success" @click="onClickCommit"/>
      <div class="branch">
        <div v-if="isBranchClicked" class="branch-select">
          <el-select
              v-model="internalBranch"
              size="mini"
          >
            <el-option
                v-for="(op, $index) in branches"
                :key="$index"
                :label="op.label"
                :value="op.value"
            />
          </el-select>
          <FaIconButton
              class="action"
              type="success"
              size="mini"
              :icon="['fa', 'check']"
              tooltip="Checkout"
              plain
              circle
              :disabled="currentBranch === internalBranch"
              @click="onBranchCheckout"
          />
          <FaIconButton
              class="action"
              type="info"
              size="mini"
              :icon="['fa', 'times']"
              tooltip="Cancel"
              plain
              circle
              @click="onBranchCancel"
          />
        </div>
        <Tag
            v-else
            class="branch-label"
            :label="currentBranch"
            :icon="['fa','code-branch']"
            size="small"
            clickable
            @click="onBranchClick"
        >
          <template #tooltip>
            <span>Current Branch:</span>
            <span
                class="current-branch"
                style="color: #409eff; margin-left: 5px; font-weight: bolder"
            >
              {{ currentBranch }}
            </span>
            <br>
            <span style="color: #e6a23c">
              Click to checkout to target branch
            </span>
          </template>
        </Tag>
      </div>
    </NavActionItem>
  </NavActionGroup>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';
import NavActionGroup from '@/components/nav/NavActionGroup.vue';
import NavActionItem from '@/components/nav/NavActionItem.vue';
import FaIconButton from '@/components/button/FaIconButton.vue';
import NavActionFaIcon from '@/components/nav/NavActionFaIcon.vue';
import Tag from '@/components/tag/Tag.vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'SpiderDetailActionsGit',
  components: {
    NavActionFaIcon,
    NavActionGroup,
    NavActionItem,
    FaIconButton,
    Tag,
  },
  setup() {
    // store
    const ns = 'spider';
    const store = useStore();
    const {
      spider: state,
    } = store.state as RootStoreState;

    const currentBranch = computed<string>(() => state.currentGitBranch);

    const internalBranch = ref<string>('');

    watch(() => currentBranch.value, () => internalBranch.value = currentBranch.value);

    const branches = computed<SelectOption[]>(() => {
      return state.gitData.branches?.map(branch => {
        return {
          label: branch,
          value: branch,
        };
      }) || [];
    });

    const isBranchClicked = ref<boolean>(false);

    const onBranchClick = () => {
      isBranchClicked.value = true;
    };

    const onBranchCancel = () => {
      isBranchClicked.value = false;
    };

    const onBranchCheckout = () => {
      isBranchClicked.value = false;
    };

    return {
      currentBranch,
      internalBranch,
      branches,
      isBranchClicked,
      onBranchClick,
      onBranchCancel,
      onBranchCheckout,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../styles/variables.scss";

.branch {
  display: flex;
  align-items: center;

  .branch-select {
    .el-select {
      width: 120px;
    }
  }
}
</style>
<style scoped>
.branch >>> .branch-select .action {
  margin-left: 5px;
  margin-right: 0;
}

.branch >>> .branch-select .action .button {
  width: 28px;
  height: 28px;
}

.branch >>> .branch-label:hover {
  opacity: 0.8;
}
</style>
