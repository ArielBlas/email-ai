"use client";

import Layout from "@/Data/Layout";
import React from "react";
import ElementsLayoutCard from "./ElementsLayoutCard";
import elementList from "@/Data/ElementList";
import { useDragElementLayout } from "@/app/provider";

const ElementsSideBar = () => {
  const { dragaElementLayout, setDragaElementLayout } = useDragElementLayout();

  const onDragLayoutStart = (layout) => {
    setDragaElementLayout({
      dragLayout: {
        ...layout,
        id: Date.now(),
      },
    });
  };

  return (
    <div className="p-5 h-screen shadow-sm">
      <h2 className="font-bold text-lg">Layouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {Layout.map((layout, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => onDragLayoutStart(layout)}
          >
            <ElementsLayoutCard key={index} layout={layout} />
          </div>
        ))}
      </div>

      <h2 className="font-bold text-lg mt-6">Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {elementList.map((element, index) => (
          <ElementsLayoutCard key={index} layout={element} />
        ))}
      </div>
    </div>
  );
};

export default ElementsSideBar;
