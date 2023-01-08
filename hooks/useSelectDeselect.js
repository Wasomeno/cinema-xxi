import { useState } from "react";

export const useSelectDeselect = (defaultValue) => {
  const [values, setValues] = useState(defaultValue);

  const selectValue = (value) => {
    if (values.includes(value)) return;
    setValues((currentValue) => [...currentValue, value]);
  };

  const deselectValue = (value) => {
    setValues((currentValue) =>
      currentValue.filter((selectedValue) => selectedValue !== value)
    );
  };

  return [values, selectValue, deselectValue];
};
