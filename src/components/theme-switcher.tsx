import { useTheme } from "../hooks/useTheme";

const ThemeSwitcher = () => {
  const { theme, resolvedTheme, cycleTheme } = useTheme();

  const getIcon = () => {
    if (theme === "system") {
      return "💻";
    }
    return resolvedTheme === "light" ? "☀️" : "🌙";
  };

  const getLabel = () => {
    if (theme === "system") {
      return `System (${resolvedTheme})`;
    }
    return theme === "light" ? "Light" : "Dark";
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-border-muted)] hover:border-[var(--color-border)] transition-colors"
      aria-label={`Current theme: ${getLabel()}. Click to cycle themes.`}
      title={`Theme: ${getLabel()}`}
    >
      <span className="text-xl" role="img" aria-hidden="true">
        {getIcon()}
      </span>
    </button>
  );
};

export default ThemeSwitcher;
