interface MetricListProps {
  metrics?: NavItem[];
  metricDataFunc?: MetricDataFunc;
  dateRange?: RangeItem;
  duration?: string;
  durationOptions?: SelectOption[];
}

type MetricDataFunc = (metric: string) => Promise<StatsResult[]>;
