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
        "border-[var(--color-border)] rounded-lg px-4 py-2 border flex items-center gap-4 justify-center",
        className,
        {
          "active:mb-[0px] active:shadow-[0_0_0_var(--color-border)] active:mt-[2px] shadow-[0_2px_0_var(--color-border)] mb-[2px]":
            !isActive && !disabled,
          "mb-[0px] shadow-[0_0_0_var(--color-border)] mt-[2px]": isActive,
          "opacity-50 cursor-not-allowed border-[var(--color-border-muted)]":
            disabled,
        }
      )}
      onClick={disabled ? undefined : onClick}
    >
      <span
        className={cx(
          "text-lg font-bold",
          disabled
            ? "text-[var(--color-text-tertiary)]"
            : "text-[var(--color-text-primary)]"
        )}
      >
        {label}
      </span>
      {keyboardKey && (
        <span
          className={cx(
            "text-xs border rounded-sm px-2 py-0.5 font-mono",
            disabled
              ? "text-[var(--color-text-tertiary)] border-[var(--color-border-muted)]"
              : "text-[var(--color-text-tertiary)] border-[var(--color-border-muted)]"
          )}
        >
          {keyboardKey}
        </span>
      )}
    </button>
  );
};

export default Button;
