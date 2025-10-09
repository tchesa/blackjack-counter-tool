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
      <label className="text-sm text-gray-300 font-bold" htmlFor={label}>
        {label}
      </label>
      <p
        className={cx("text-2xl font-bold leading-[42px]", {
          "text-gray-300": valueIntent === "default",
          "text-green-500": valueIntent === "positive",
          "text-red-500": valueIntent === "negative",
        })}
      >
        {value}
      </p>
    </div>
  );
};

export default TextField;
