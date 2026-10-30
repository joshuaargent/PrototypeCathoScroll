interface SearchInputProps {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export function SearchInput({
  value,
  onChange,
}: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder="Search topics, catechism, or scripture..."
      className="
        w-full
        rounded-2xl
        border
        border-border
        bg-bg-card
        px-5
        py-4
        text-lg
        outline-none
        transition-colors
        focus:border-accent
      "
    />
  );
}