<template>
  <div class="metric-dashboard">
    <NavSidebar type="tree" :items="metrics"/>
    <div class="metric-dashboard-top">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import NavSidebar from '@/components/nav/NavSidebar.vue';
import {emptyArrayFunc, voidFunc} from '@/utils/func';

export default defineComponent({
  name: 'MetricDashboard',
  components: {NavSidebar},
  props: {
    metrics: {
      type: Array as PropType<NavItem[]>,
      default: emptyArrayFunc,
    },
    metricDataFunc: {
      type: Function as PropType<() => Promise<StatsResult[]>>,
      default: voidFunc,
    }
  },
  setup(props: MetricDashboardProps, {emit}) {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.metric-dashboard {
}
</style>
