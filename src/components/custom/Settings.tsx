"use client";

import React, { useEffect, useState } from "react";
import { useSelectedElement } from "@/app/provider";
import InputField from "./Settings/InputField";

const Settings = () => {
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const [element, setElement] = useState();

  useEffect(() => {
    if (selectedElement) {
      setElement(selectedElement?.layout?.[selectedElement?.index]);
    }
  }, [selectedElement]);

  const onHandleInputChange = (fieldName, value) => {
    const updatedData = { ...selectedElement };
    updatedData.layout[selectedElement.index][fieldName] = value;
    setSelectedElement(updatedData);
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-xl">Settings</h2>
      {element?.content && (
        <InputField
          label={"Content"}
          value={element?.content}
          onHandleInputChange={(value) => onHandleInputChange("content", vlaue)}
        />
      )}
    </div>
  );
};

export default Settings;
