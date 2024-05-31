"use client";

import * as React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <FiSun
          style={{
            fontSize: "1.2rem",
            transform: menuOpen ? "rotate(90deg)" : "rotate(0)",
            transition: "transform 0.3s",
          }}
        />
        <FiMoon
          style={{
            fontSize: "1.2rem",
            transform: menuOpen ? "rotate(0)" : "rotate(-90deg)",
            transition: "transform 0.3s",
            position: "absolute",
          }}
        />
        <span className="sr-only">Toggle theme</span>
      </button>
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: "0",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "4px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <div
            onClick={() => {
              setTheme("light");
              setMenuOpen(false);
            }}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
          >
            Light
          </div>
          <div
            onClick={() => {
              setTheme("dark");
              setMenuOpen(false);
            }}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
          >
            Dark
          </div>
          <div
            onClick={() => {
              setTheme("system");
              setMenuOpen(false);
            }}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            System
          </div>
        </div>
      )}
    </div>
  );
}
