interface LComponentsTask {
  status: {
    label: {
      pending: string;
      running: string;
      finished: string;
      error: string;
      cancelled: string;
      abnormal: string;
      unknown: string;
    };
    tooltip: {
      pending: string;
      running: string;
      finished: string;
      error: string;
      cancelled: string;
      abnormal: string;
      unknown: string;
    };
  };
  priority: {
    high: string;
    higher: string;
    medium: string;
    lower: string;
    low: string;
  };
  mode: {
    randomNode: string;
    allNodes: string;
    selectedNodes: string;
    selectedTags: string;
  };
}
