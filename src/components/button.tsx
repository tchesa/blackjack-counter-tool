import { cx } from "../lib/cx";

type Props = {
  label: string;
  keyboardKey?: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
};

const Button = ({
  label,
  keyboardKey,
  onClick,
  className,
  isActive = false,
}: Props) => {
  return (
    <button
      type="button"
      className={cx(
        "border-white rounded-lg px-4 py-2 border flex items-center gap-4 justify-center",
        className,
        {
          "active:mb-[0px] active:shadow-[0_0_0_#fff] active:mt-[2px] shadow-[0_2px_0_#fff] mb-[2px]":
            !isActive,
          "mb-[0px] shadow-[0_0_0_#fff] mt-[2px]": isActive,
        }
      )}
      onClick={onClick}
    >
      <span className="text-lg text-white font-bold">{label}</span>
      {keyboardKey && (
        <span className="text-xs text-gray-400 border border-gray-400 rounded-sm px-2 py-0.5 font-mono">
          {keyboardKey}
        </span>
      )}
    </button>
  );
};

export default Button;
