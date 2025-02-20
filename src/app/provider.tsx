"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { useEffect, useState, ReactNode, useContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { SelectedElementContext } from "@/context/SelectedElementContext";

const Provider = ({ children }: { children: ReactNode }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const [userDetail, setUserDetail] = useState({});
  const [screenSize, setScreenSize] = useState("desktop");
  const [dragaElementLayout, setDragaElementLayout] = useState(undefined);
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedELement, setSelectedElement] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(
        window.localStorage.getItem("userDetail") ?? "{}"
      );
      const emailTemplateStorage = JSON.parse(
        window.localStorage.getItem("emailTemplate") ?? "[]"
      );
      setEmailTemplate(emailTemplateStorage);

      if (!storage?.email || !storage) {
        // Redirect to home page
      } else {
        setUserDetail(storage);
      }
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropLayoutElement.Provider
              value={{ dragaElementLayout, setDragaElementLayout }}
            >
              <EmailTemplateContext.Provider
                value={{ emailTemplate, setEmailTemplate }}
              >
                <SelectedElementContext.Provider
                  value={{ selectedELement, setSelectedElement }}
                >
                  {children}
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
};

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};

export const useDragElementLayout = () => {
  return useContext(DragDropLayoutElement);
};

export const useEmailTemplate = () => {
  return useContext(EmailTemplateContext);
};

export const useSelectedElement = () => {
  return useContext(SelectedElementContext);
};
