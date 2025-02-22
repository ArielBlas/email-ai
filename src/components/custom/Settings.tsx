"use client";

import React, { useEffect, useState } from "react";
import { useSelectedElement } from "@/app/provider";
import InputField from "./Settings/InputField";
import ColorPickerField from "./Settings/ColorPickerField";

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

  const onHandleStyleChange = (fieldName, value) => {
    const updateElement = {
      ...selectedElement,
      layout: {
        ...selectedElement?.layout,
        [selectedElement?.index]: {
          ...selectedElement?.layout[selectedElement?.index],
          style: {
            ...selectedElement?.layout[selectedElement?.index]?.style,
            [fieldName]: value,
          },
        },
      },
    };
    setSelectedElement(updateElement);
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <h2 className="font-bold text-xl">Settings</h2>
      {element?.content && (
        <InputField
          label={"Content"}
          value={element?.content}
          onHandleInputChange={(value) => onHandleInputChange("content", value)}
        />
      )}
      {element?.url && (
        <InputField
          label={"Url"}
          value={element?.url}
          onHandleInputChange={(value) => onHandleInputChange("url", value)}
        />
      )}
      {element?.style?.backgroundColor && (
        <ColorPickerField
          label="Background Color"
          value={element?.style?.backgroundColor}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("backgroundColor", value)
          }
        />
      )}
    </div>
  );
};

export default Settings;
