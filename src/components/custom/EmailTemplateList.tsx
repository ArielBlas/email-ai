import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useConvex } from "convex/react";
import { useUserDetail } from "@/app/provider";
import { api } from "@/convex/_generated/api";

const EmailTemplateList = () => {
  const [emailList, setEmailList] = useState([]);
  const convex = useConvex();
  const { userDetail, setUserDetail } = useUserDetail();

  useEffect(() => {
    if (userDetail) GetTemplateList();
  }, [userDetail]);

  const GetTemplateList = async () => {
    const result = await convex.query(api.emailTemplate.GetAllUserTemplate, {
      email: userDetail.email,
    });
    setEmailList(result);
  };

  return (
    <div>
      <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>
      {emailList?.length && (
        <div className="flex justify-between mt-7 flex-col items-center">
          <Image src={"/email.png"} alt="email" width={260} height={260} />
          <Link href={"/dashboard/create"}>
            <Button className="mt-7">+ Create New</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;
