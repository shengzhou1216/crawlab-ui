interface RangePickerProps {
  className?: string;
  modelValue?: RangeItem;
  type?: RangePickerType;
  options?: RangeItemOption[];
}

interface RangeItemOption extends SelectOption {
  value?: RangeItem;
}

interface RangeItem {
  key: RangeItemKey;
  value?: RangeItemValue;
}

type RangeItemKey = 'custom' | string;

type RangeItemValue = RangeItemValueFunc | DateRange;

type RangeItemValueFunc = () => DateRange;

type RangePickerType = 'daterange' | 'datetimerange';
