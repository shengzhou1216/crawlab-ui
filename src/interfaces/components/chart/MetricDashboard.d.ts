interface MetricDashboardProps {
  metrics?: NavItem[];
  metricDataFunc?: MetricDataFunc;
  dateRange?: RangeItem;
}

type MetricDataFunc = (metric: string) => Promise<StatsResult[]>;
