interface MetricDashboardProps {
  metrics?: NavItem[];
  metricDataFunc?: MetricDataFunc;
  // TODO: implement
  // dateRange?: DateRange;
}

type MetricDataFunc = (metricName: string) => Promise<StatsResult[]>;
