import { useState, useEffect } from "react";

const Theme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("isDark");
    if (saved !== null) {
      setIsDark(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <label className="flex cursor-pointer gap-2">
      <span className="label-text">claro</span>

      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
        className="toggle"
      />

      <span className="label-text">oscuro</span>
    </label>
  );
};

export default Theme;
