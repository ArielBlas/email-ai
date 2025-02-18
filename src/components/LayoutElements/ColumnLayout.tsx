"use client";

import { useDragElementLayout, useEmailTemplate } from "@/app/provider";
import React, { useState } from "react";

const ColumnLayout = ({ layout }) => {
  const [dragOver, setDragOver] = useState(false);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragaElementLayout, setDragaElementLayout } = useDragElementLayout();

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
    return element.type;
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
            className={`p-2 flex items-center bg-gray-100 border border-dashed justify-center
              ${index === dragOver?.index && dragOver?.columnId && "bg-green-100"}
              `}
            onDragOver={(event) => onDragOverHandler(event, index)}
            onDrop={onDropHandler}
          >
            {GetElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLayout;
