import React from "react";
import css from "./Instruction.module.css";

const Instruction = ({ text, onClick }) => {
  return (
    <div
      style={{ userSelect: "none" }}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      className={[css.scrollText, "scroll-text"].join(" ")}
    >
      {text}
    </div>
  );
};

export default Instruction;
