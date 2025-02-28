"use client";

import {
  useDragElementLayout,
  useEmailTemplate,
  useSelectedElement,
} from "@/app/provider";
import React, { useState } from "react";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";

const ColumnLayout = ({ layout }) => {
  const [dragOver, setDragOver] = useState(false);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragaElementLayout, setDragaElementLayout } = useDragElementLayout();
  const { selectedELement, setSelectedElement } = useSelectedElement();

  const onDragOverHandler = (event, index) => {
    event.preventDefault();
    setDragOver({
      index,
      columnId: layout.id,
    });
  };

  const onDropHandler = (event) => {
    const index = dragOver.index;
    setEmailTemplate((prevItem) =>
      prevItem.map((col) =>
        col.id == layout.id
          ? { ...col, [index]: dragaElementLayout.dragElement }
          : col
      )
    );
    setDragOver(false);
  };

  const GetElementComponent = (element) => {
    switch (element?.type) {
      case "Button":
        return <ButtonComponent {...element} />;
      case "Text":
        return <TextComponent {...element} />;
      case "Image":
        return <ImageComponent {...element} />;
      case "Logo":
        return <LogoComponent {...element} />;
      case "Divider":
        return <DividerComponent {...element} />;
      default:
        return element.type;
    }
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.numOfCol}, 1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layout.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`p-0 flex items-center h-full w-full bg-white cursor-pointer
              ${!layout?.[index]?.type && "bg-gray-100 border border-dashed"} justify-center
              ${index === dragOver?.index && dragOver?.columnId ? "bg-green-100" : "bg-gray-100"}
              ${selectedELement?.layout?.id == layout.id && selectedELement?.index == index && "border-blue-500 border-2xs"}
              `}
            onDragOver={(event) => onDragOverHandler(event, index)}
            onDrop={onDropHandler}
            onClick={() => setSelectedElement({ layout, index })}
          >
            {GetElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLayout;
