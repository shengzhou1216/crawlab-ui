interface MetricListProps {
  metrics?: NavItem[];
  metricDataFunc?: MetricListDataFunc;
  dateRange?: RangeItem;
  duration?: string;
  durationOptions?: SelectOption[];
  defaultCheckedAll?: boolean;
}
