"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import React, { useEffect, useState, ReactNode, useContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";

const Provider = ({ children }: { children: ReactNode }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(
        window.localStorage.getItem("userDetail") ?? "{}"
      );

      if (!storage?.email || !storage) {
        // Redirect to home page
      } else {
        setUserDetail(storage);
      }
    }
  });

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          {children}
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
};

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};
