import { cx } from "../lib/cx";

type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  type?: "text" | "number";
  className?: string;
};

const InputField = ({ value, onChange, label, type, className }: Props) => {
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label
        className="text-sm text-[var(--color-text-secondary)] font-bold"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="border border-[var(--color-border-muted)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-md p-2"
        id={label}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
