export const getHighlightedText = (text, highlight) => {
  const searchHighlight = highlight.includes("+")
    ? `(${"\\"}${highlight})`
    : `(${highlight})`;
  const parts = text.split(new RegExp(searchHighlight, "gi"));

  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === highlight.toLowerCase()
              ? "search_active"
              : ""
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};
