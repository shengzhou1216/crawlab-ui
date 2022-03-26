interface MetricListProps {
  metrics?: NavItem[];
  metricDataFunc?: MetricListDataFunc;
  dateRange?: RangeItem;
  duration?: string;
  durationOptions?: SelectOption[];
}

type MetricListDataFunc = (metric: string) => Promise<StatsResult[]>;
