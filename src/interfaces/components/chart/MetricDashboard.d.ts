interface MetricDashboardProps {
  metrics?: NavItem[];
  metricDataFunc?: MetricDataFunc;
  // TODO: implement
  // dateRange?: DateRange;
}

type MetricDataFunc = (metric: string) => Promise<StatsResult[]>;
