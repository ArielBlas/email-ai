"use client";
import { useEmailTemplate, useUserDetail } from "@/app/provider";
import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Editor = () => {
  const [viewHTMLCode, setViewHTMLCode] = useState(false);
  const { templateId } = useParams();
  const { userDetail } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const { emailDesign, setEmailDesign } = useEmailTemplate();
  const convex = useConvex();

  useEffect(() => {
    if (userDetail) {
      GetTemplateData();
    }
  }, [userDetail]);

  const GetTemplateData = async () => {
    setLoading(true);
    const result = await convex.query(api.emailTemplate.GetTemplate, {
      id: templateId,
      email: userDetail.email,
    });
    setEmailDesign(result?.design);
    setLoading(false);
  };

  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} />

      {!loading ? (
        <div className="grid grid-cols-5">
          <ElementsSideBar />
          <div className="col-span-3 bg-gray-100">
            <Canvas
              viewHTMLCode={viewHTMLCode}
              closeDialog={() => setViewHTMLCode(false)}
            />
          </div>
          <Settings />
        </div>
      ) : (
        <div>
          <h2>Pleas wait...</h2>
        </div>
      )}
    </div>
  );
};

export default Editor;
