import React from "react";

const TextComponent = ({ style, content }) => {
  return (
    <div>
      <h2 style={style}>{content}</h2>
    </div>
  );
};

export default TextComponent;
