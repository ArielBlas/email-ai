"use client";

import React from "react";
import {
  useDragElementLayout,
  useEmailTemplate,
  useScreenSize,
} from "@/app/provider";
import { Dice1 } from "lucide-react";
import ColumnLayout from "../LayoutElements/ColumnLayout";

const Canvas = () => {
  const { screenSize, setScreenSize } = useScreenSize();
  const { dragaElementLayout, setDragaElementLayout } = useDragElementLayout();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [dragOver, setDragOver] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDropHandler = () => {
    setDragOver(false);
    if (dragaElementLayout?.dragLayout) {
      setEmailTemplate((prev) => [...prev, dragaElementLayout.dragLayout]);
    }
  };

  const getLayoutComponent = (layout) => {
    if (layout?.type === "column") {
      return <ColumnLayout layout={layout} />;
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={`bg-white p-6 w-full ${screenSize == "desktop" ? "max-w-2xl" : "max-w-md"}
          ${dragOver && "bg-purple-100 p4"}`}
        onDragOver={onDragOver}
        onDrop={() => onDropHandler()}
      >
        {emailTemplate?.length > 0 ? (
          emailTemplate?.map((item, index) => (
            <div key={index}>{getLayoutComponent(item)}</div>
          ))
        ) : (
          <h2 className="p-4 text-center bg-gray-100 border border-dashed">
            Add Layout Here
          </h2>
        )}
      </div>
    </div>
  );
};

export default Canvas;
