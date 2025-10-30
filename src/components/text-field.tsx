import { cx } from "../lib/cx";

type Intent = "default" | "positive" | "negative";

type Props = {
  label: string;
  value: string;
  className?: string;
  valueIntent?: Intent;
};

const TextField = ({
  label,
  value,
  className,
  valueIntent = "default",
}: Props) => {
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label
        className="text-sm text-[var(--color-text-secondary)] font-bold"
        htmlFor={label}
      >
        {label}
      </label>
      <p
        className={cx("text-2xl font-bold leading-[42px]", {
          "text-[var(--color-text-secondary)]": valueIntent === "default",
          "text-green-500 dark:text-green-400": valueIntent === "positive",
          "text-red-500 dark:text-red-400": valueIntent === "negative",
        })}
      >
        {value}
      </p>
    </div>
  );
};

export default TextField;
