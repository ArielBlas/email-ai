"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";

const ViewHtmlDialog = ({ openDialog, htmlCode, closeDialog }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(htmlCode);
  };
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-between items-center">
              <h2>HTML Email Template</h2>
              <Copy
                className="p-2 bg-gray-100 rounded-full h-9 w-9 cursor-pointer"
                onClick={copyCode}
              />
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="max-h-[400px] overflow-auto bg-black rounded-lg p-5">
              <pre className="whitespace-pre-wrap break-all">
                <code>{htmlCode}</code>
              </pre>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewHtmlDialog;
