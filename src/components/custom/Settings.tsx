"use client";

import React, { useEffect, useState } from "react";
import { useSelectedElement } from "@/app/provider";
import InputField from "./Settings/InputField";
import ColorPickerField from "./Settings/ColorPickerField";
import InputFieldStyle from "./Settings/InputFieldStyle";
import SliderField from "./Settings/SliderField";
import TextAreaField from "./Settings/TextAreaField";
import ToggleGroupField from "./Settings/ToggleGroupField";
import {
  AArrowUp,
  AlignCenter,
  AlignLeft,
  AlignRight,
  CaseLower,
  CaseUpper,
} from "lucide-react";
import DropdownField from "./Settings/DropdownField";

const TextAlignOptions = [
  {
    value: "left",
    icon: AlignLeft,
  },
  {
    value: "center",
    icon: AlignCenter,
  },
  {
    value: "right",
    icon: AlignRight,
  },
];

const TextTransformOptions = [
  {
    value: "uppercase",
    icon: CaseUpper,
  },
  {
    value: "lowercase",
    icon: CaseLower,
  },
  {
    value: "capitalize",
    icon: AArrowUp,
  },
];

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

      {element?.textarea && (
        <TextAreaField
          label={"Text Area"}
          value={element?.textarea}
          onHandleInputChange={(value) =>
            onHandleInputChange("textarea", value)
          }
        />
      )}

      {element?.url && (
        <InputField
          label={"Url"}
          value={element?.url}
          onHandleInputChange={(value) => onHandleInputChange("url", value)}
        />
      )}

      {element?.style?.width && (
        <SliderField
          label="Width"
          value={element?.style?.width}
          type="%"
          onHandleStyleChange={(value) => onHandleStyleChange("width", value)}
        />
      )}

      {element?.style?.textAlign && (
        <ToggleGroupField
          label={"Text Align"}
          value={element?.style?.textAlign}
          options={TextAlignOptions}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("textAlign", value)
          }
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
      {element?.style?.color && (
        <ColorPickerField
          label="Text Color"
          value={element?.style?.color}
          onHandleStyleChange={(value) => onHandleStyleChange("color", value)}
        />
      )}

      {element?.style?.fontSize && (
        <InputFieldStyle
          label="Font Size"
          value={element?.style?.fontSize}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("fontSize", value)
          }
        />
      )}

      {element?.style?.textTransform && (
        <ToggleGroupField
          label={"Text Transform"}
          value={element?.style?.textTransform}
          options={TextTransformOptions}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("textTransform", value)
          }
        />
      )}

      {element?.style?.padding && (
        <InputFieldStyle
          label="Padding"
          value={element?.style?.padding}
          onHandleStyleChange={(value) => onHandleStyleChange("padding", value)}
        />
      )}

      {element?.style?.borderRadius && (
        <SliderField
          label="Border Radius"
          value={element?.style?.borderRadius}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("borderRadius", value)
          }
        />
      )}

      {element?.style?.fontWeight && (
        <DropdownField
          label="Font Weight"
          value={element?.style?.fontWeight}
          options={["normal", "bold", "bolder", "lighter"]}
          onHandleStyleChange={(value) =>
            onHandleStyleChange("fontWeight", value)
          }
        />
      )}
    </div>
  );
};

export default Settings;
