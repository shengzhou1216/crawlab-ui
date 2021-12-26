<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'StatsTracker',
  props: {
    id: {
      type: String,
    },
    params: {
      type: Object as PropType<{ [key: any]: any }>
    }
  },
  setup(props: StatsTrackerProps, {emit}) {
    return {};
  },
});
</script>
