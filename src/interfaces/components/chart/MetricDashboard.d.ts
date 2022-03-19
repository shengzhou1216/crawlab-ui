interface MetricDashboardProps {
  metrics?: NavItem[];
  metricDataFunc: () => Promise<StatsResult[]>;
}
