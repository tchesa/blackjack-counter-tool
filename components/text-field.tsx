import { cx } from "@/lib/cx";

type Props = {
  label: string;
  value: string;
  className?: string;
};

const TextField = ({ label, value, className }: Props) => {
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label className="text-sm text-gray-300 font-bold" htmlFor={label}>
        {label}
      </label>
      <p className="text-2xl font-bold text-gray-300 leading-[42px]">{value}</p>
    </div>
  );
};

export default TextField;
