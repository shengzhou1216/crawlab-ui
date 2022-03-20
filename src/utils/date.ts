import dayjs from 'dayjs';

export const getPastNDateRangeItem = (key: string, n: number, unit: string): RangeItem => {
  return {
    key,
    value: () => {
      return {
        start: dayjs(),
        end: dayjs().subtract(n, unit)
      };
    },
  };
};
