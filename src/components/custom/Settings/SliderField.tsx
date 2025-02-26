import { Slider } from "@/components/ui/slider";
import React from "react";

const SliderField = ({ label, value, onHandleStyleChange, type = "px" }) => {
  const formattedValue = (value_) => {
    return Number(value_.toString().replace(type, ""));
  };

  return (
    <div>
      <label>
        {label} ({value})
      </label>
      <Slider
        defaultValue={[formattedValue(value)]}
        max={100}
        step={1}
        onValueChange={(v) => {
          onHandleStyleChange(v + "");
        }}
      />
    </div>
  );
};

export default SliderField;
