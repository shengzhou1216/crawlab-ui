export declare global {
  interface Metric {
    namespace?: string;
    subsystem?: string;
    module?: string;
    name?: string;
    value?: number;
    help?: string;
    labels?: { [key: string]: string };
  }

  interface MetricSnapshot {
    key?: string;
    name?: string;
    type?: MetricTargetType;
    status?: string;
    metrics?: { [key: string]: Metric };
    is_master?: boolean;
  }

  type MetricTargetType = 'node' | 'mongo' | 'seaweedfs';
}
