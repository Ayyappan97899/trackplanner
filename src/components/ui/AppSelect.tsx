import { Field, NativeSelect } from "@chakra-ui/react";

interface AppSelectProps {
  rootProps?: Record<string, any>;
  label?: string;
  placeholder?: string;
  options: { name: string; value: string }[];
  value?: string;
  onChange?: (e: any) => any;
  fieldProps?: any;
}

const AppSelect = ({
  rootProps,
  label,
  placeholder = "",
  options,
  value = "",
  onChange,
  fieldProps,
}: AppSelectProps) => {
  return (
    <Field.Root>
      {label && <Field.Label>{label}</Field.Label>}

      <NativeSelect.Root {...rootProps}>
        <NativeSelect.Field
          placeholder={placeholder}
          value={value ? value : ""}
          onChange={onChange}
          {...fieldProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </NativeSelect.Field>

        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  );
};

export default AppSelect;
