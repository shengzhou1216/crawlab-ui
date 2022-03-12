import {Dayjs} from 'dayjs';

export declare global {
  interface StatsResult extends Result {
    date?: string;
  }

  interface DateRange {
    start: Dayjs;
    end: Dayjs;
  }
}
