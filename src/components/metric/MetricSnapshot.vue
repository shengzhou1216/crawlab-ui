<template>
  <div class="metric-snapshot">
    <template v-if="snapshot.type === 'node'">
      <MetricProgress
        type="dashboard"
        :width="80"
        :percentage="snapshot.metrics?.['performance:node:cpu:percent']?.value"
        :format="format"
        label="cpu"
        :label-icon="['fa', 'microchip']"
        :status="status.node.cpu"
        :detail-metrics="getChildMetrics(':node:cpu:')"
      />
      <MetricProgress
        type="dashboard"
        :width="80"
        :percentage="snapshot.metrics?.['performance:node:mem:used_percent']?.value"
        :format="format"
        label="mem"
        :label-icon="['fa', 'memory']"
        :status="status.node.mem"
        :detail-metrics="getChildMetrics(':node:mem:')"
      />
      <MetricProgress
        type="dashboard"
        :width="80"
        :percentage="snapshot.metrics?.['performance:node:disk:used_percent']?.value"
        :format="format"
        label="disk"
        :label-icon="['fa', 'hard-drive']"
        :status="status.node.disk"
        :detail-metrics="getChildMetrics(':node:disk:')"
      />
      <MetricProgress
        type="dashboard"
        :width="80"
        :percentage="null && snapshot.metrics?.['performance:node:net:io_bytes_recv_rate']?.value"
        :format="format"
        label="net"
        :label-icon="['fa', 'wifi']"
        :status="status.net"
        :detail-metrics="getChildMetrics(':node:net:')"
      />
    </template>

    <template v-else-if="snapshot.type === 'mongo'">
      <MetricProgress
        type="dashboard"
        :width="80"
        :percentage="snapshot.metrics?.['performance:mongo:size:fs_used_size_percent']?.value"
        :format="format"
        label="fs"
        :label-icon="['fa', 'hard-drive']"
        :status="status.mongo.size"
        :detail-metrics="getChildMetrics(':mongo:size:fs')"
      />
      <MetricProgress
        type="dashboard"
        :width="80"
        :percentage="snapshot.metrics?.['performance:mongo:size:total_size_percent']?.value"
        :format="format"
        label="db"
        :label-icon="['fa', 'database']"
        :status="status.mongo.size"
        :detail-metrics="getChildMetrics(':mongo:size:')"
      />
    </template>

    <template v-else-if="snapshot.type === 'seaweedfs'">

    </template>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, readonly} from 'vue';
import {emptyObjectFunc} from '@/utils/func';
import MetricProgress from '@/components/metric/MetricProgress.vue';
import variables from '@/styles/variables.scss';

export default defineComponent({
  name: 'MetricSnapshot',
  components: {MetricProgress},
  props: {
    snapshot: {
      type: Object as PropType<MetricSnapshot>,
      default: emptyObjectFunc,
    },
  },
  setup(props: MetricSnapshotProps, {emit}) {
    const format = computed(() => {
      return (percentage: number | null): string => {
        if (percentage === null) return 'N/A';
        return `${percentage.toFixed(0)}%`;
      };
    });

    const getDetailMetrics = (key: string): SelectOption[] => {
      return Object.keys(props.snapshot?.metrics || [])
        .filter(n => n.match(key))
        .map(n => {
          const m = props.snapshot?.metrics?.[n] as Metric;
          return {
            label: n,
            value: m.value?.toLocaleString(),
          };
        });
    };

    const statusItems = readonly<{ [key: string]: MetricProgressStatusData }>({
      danger: {color: variables.dangerColor, icon: ['fa', 'circle-exclamation']},
      warning: {color: variables.warningColor, icon: ['fa', 'triangle-exclamation']},
      success: {color: variables.successColor, icon: ['fa', 'circle-check']},
      unknown: {color: variables.infoMediumColor, icon: ['fa', 'circle-question']},
    });

    const status = readonly<{ [key: string]: { [key: string]: MetricProgressStatus } }>({
      node: {
        cpu: (p: number | null) => {
          if (p === null) {
            return statusItems.unknown as MetricProgressStatusData;
          } else if (p >= 80) {
            return statusItems.danger as MetricProgressStatusData;
          } else if (p >= 50) {
            return statusItems.warning as MetricProgressStatusData;
          } else {
            return statusItems.success as MetricProgressStatusData;
          }
        },
        mem: (p: number | null) => {
          if (p === null) {
            return statusItems.unknown as MetricProgressStatusData;
          } else if (p >= 80) {
            return statusItems.danger as MetricProgressStatusData;
          } else if (p >= 50) {
            return statusItems.warning as MetricProgressStatusData;
          } else {
            return statusItems.success as MetricProgressStatusData;
          }
        },
        disk: (p: number | null) => {
          if (p === null) {
            return statusItems.unknown as MetricProgressStatusData;
          } else if (p >= 80) {
            return statusItems.danger as MetricProgressStatusData;
          } else if (p >= 50) {
            return statusItems.warning as MetricProgressStatusData;
          } else {
            return statusItems.success as MetricProgressStatusData;
          }
        },
        net: (p: number | null) => {
          if (p === null) {
            return statusItems.unknown as MetricProgressStatusData;
          } else if (p >= 80) {
            return statusItems.danger as MetricProgressStatusData;
          } else if (p >= 50) {
            return statusItems.warning as MetricProgressStatusData;
          } else {
            return statusItems.success as MetricProgressStatusData;
          }
        },
      },
      mongo: {
        size: (p: number | null) => {
          if (p === null) {
            return statusItems.unknown as MetricProgressStatusData;
          } else if (p >= 80) {
            return statusItems.danger as MetricProgressStatusData;
          } else if (p >= 50) {
            return statusItems.warning as MetricProgressStatusData;
          } else {
            return statusItems.success as MetricProgressStatusData;
          }
        },
      }
    });

    return {
      format,
      getChildMetrics: getDetailMetrics,
      status,
    };
  }
});
</script>

<style lang="scss" scoped>
.metric-snapshot {
  .metric-progress {
    margin-right: 20px;
  }
}
</style>

<style scoped>
</style>
