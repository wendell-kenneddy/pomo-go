interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  values: number[];
  name: string;
  id: string;
  defaultValue: number;
}

export function Select({
  id,
  name,
  values,
  defaultValue,
  ...rest
}: SelectInputProps) {
  return (
    <select name={name} id={id} defaultValue={defaultValue} {...rest}>
      {values.map(value => {
        return <option value={value}>{value}</option>;
      })}
    </select>
  );
}
