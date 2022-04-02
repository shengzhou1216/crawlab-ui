interface MetricListProps {
  metrics?: NavItem[];
  metricDataFunc?: MetricListDataFunc;
  metricTitleFunc?: MetricListTitleFunc;
  dateRange?: RangeItem;
  duration?: string;
  durationOptions?: SelectOption[];
  defaultCheckedAll?: boolean;
}
