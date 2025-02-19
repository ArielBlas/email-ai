import React from "react";

const ImageComponent = ({ style, imageUrl, outStyle }) => {
  return (
    <div style={outStyle}>
      <img src={imageUrl} alt="image" style={style} />
    </div>
  );
};

export default ImageComponent;
