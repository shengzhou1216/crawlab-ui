interface MetricDashboardProps {
  metricDataFunc?: MetricDashboardDataFunc;
}

type MetricDashboardDataFunc = () => Promise<MetricSnapshot[]>;
