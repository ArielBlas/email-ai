import { Input } from "@/components/ui/input";
import React from "react";

const InputFieldStyle = ({
  label,
  value,
  onHandleStyleChange,
  type = "px",
}) => {
  const formattedValue = (value_) => {
    return Number(value_.toString().replace(type, ""));
  };
  return (
    <div>
      <label>{label}</label>
      <div className="flex">
        <Input
          type="text"
          value={formattedValue(value)}
          onChange={(e) => onHandleStyleChange(e.target.value + type)}
        />
        <h2 className="p-1 bg-gray-100 rounded-r-lg -ml-2">
          {type.toUpperCase()}
        </h2>
      </div>
    </div>
  );
};

export default InputFieldStyle;
