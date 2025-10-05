import { cx } from "../lib/cx";

type Props = {
  label: string;
  keyboardKey?: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
};

const Button = ({
  label,
  keyboardKey,
  onClick,
  className,
  isActive = false,
  disabled = false,
}: Props) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cx(
        "border-white rounded-lg px-4 py-2 border flex items-center gap-4 justify-center",
        className,
        {
          "active:mb-[0px] active:shadow-[0_0_0_#fff] active:mt-[2px] shadow-[0_2px_0_#fff] mb-[2px]":
            !isActive && !disabled,
          "mb-[0px] shadow-[0_0_0_#fff] mt-[2px]": isActive,
          "opacity-50 cursor-not-allowed border-gray-500": disabled,
        }
      )}
      onClick={disabled ? undefined : onClick}
    >
      <span className={cx("text-lg font-bold", disabled ? "text-gray-500" : "text-white")}>{label}</span>
      {keyboardKey && (
        <span className={cx("text-xs border rounded-sm px-2 py-0.5 font-mono", disabled ? "text-gray-500 border-gray-500" : "text-gray-400 border-gray-400")}>
          {keyboardKey}
        </span>
      )}
    </button>
  );
};

export default Button;
