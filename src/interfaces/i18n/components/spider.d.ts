interface LComponentsSpider {
  form: {
    name: string;
    project: string;
    command: string;
    param: string;
    defaultMode: string;
    resultsCollection: string;
    selectedTags: string;
    selectedNodes: string;
    description: string;
  };
  stat: {
    totalTasks: string;
    totalResults: string;
    averageWaitDuration: string;
    averageRuntimeDuration: string;
    averageTotalDuration: string;
  };
}
