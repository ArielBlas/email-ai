"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Code, Monitor, Smartphone } from "lucide-react";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const EditorHeader = ({ viewHTMLCode }) => {
  const { screenSize, setScreenSize } = useScreenSize();
  const updateEmailTemplate = useMutation(
    api.emailTemplate.UpdateEmailTemplate
  );
  const { templateId } = useParams();
  const { emailTemplate } = useEmailTemplate();

  const onSaveTemplate = async () => {
    await updateEmailTemplate({
      tid: templateId,
      design: emailTemplate.design,
    });
    toast("Email Template Saved Successfully!");
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center">
      <Image src={"/logo.svg"} alt="logo" width={160} height={160} />
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className={`${screenSize === "desktop" ? "bg-purple-100 text-primary" : ""}`}
          onClick={() => setScreenSize("desktop")}
        >
          <Monitor /> Desktop
        </Button>
        <Button
          variant="ghost"
          className={`${screenSize === "mobile" ? "bg-purple-100 text-primary" : ""}`}
          onClick={() => setScreenSize("mobile")}
        >
          <Smartphone /> Mobile
        </Button>
      </div>
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className="hover:text-primary"
          onClick={() => viewHTMLCode(true)}
        >
          <Code />
        </Button>
        <Button variant="outline">Send Test Email</Button>
        <Button onClick={onSaveTemplate}>Save Template</Button>
      </div>
    </div>
  );
};

export default EditorHeader;
