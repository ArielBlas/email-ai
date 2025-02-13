import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

const EmailTemplateList = () => {
  const [emailList, setEmailList] = useState([]);

  return (
    <div>
      <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>
      {emailList?.length && (
        <div className="flex justify-between mt-7 flex-col items-center">
          <Image src={"/email.png"} alt="email" width={260} height={260} />
          <Button className="mt-7">+ Create New</Button>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;
