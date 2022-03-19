interface RangePickerProps {
  className?: string;
  modelValue?: DateRange;
  type?: RangePickerType;
  shortcuts?: RangePickerShortcut[];
}

interface RangePickerShortcut {
  text?: string;
  value?: () => [Date, Date];
}

type RangePickerType = 'daterange' | 'datetimerange';
