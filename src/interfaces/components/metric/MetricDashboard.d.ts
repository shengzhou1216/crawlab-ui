interface MetricDashboardProps {
  metricDataFunc?: MetricDashboardDataFunc;
  onRowClick?: (row: MetricSnapshot) => void;
}

type MetricDashboardDataFunc = () => Promise<MetricSnapshot[]>;
