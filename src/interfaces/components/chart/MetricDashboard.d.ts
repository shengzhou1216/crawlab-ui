interface MetricDashboardProps {
  metrics?: NavItem[];
  metricDataFunc?: MetricDataFunc;
  dateRange?: DateRange;
}

type MetricDataFunc = (metric: string) => Promise<StatsResult[]>;
