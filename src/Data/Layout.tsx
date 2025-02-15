import {
  Columns2,
  Columns3,
  Columns4,
  RectangleHorizontal,
} from "lucide-react";

const layoutData = [
  {
    label: "Column",
    type: "column",
    nomOfCol: 1,
    icon: RectangleHorizontal,
  },
  {
    label: "2 Column",
    type: "column-2",
    nomOfCol: 2,
    icon: Columns2,
  },
  {
    label: "3 Column",
    type: "column-3",
    nomOfCol: 3,
    icon: Columns3,
  },
  {
    label: "4 Column",
    type: "column-4",
    nomOfCol: 4,
    icon: Columns4,
  },
];

export default layoutData;
