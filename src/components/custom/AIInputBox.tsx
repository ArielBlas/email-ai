import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const AIInputBox = () => {
  return (
    <div className="mt-5">
      <p className="mb-2">
        {"Provide details about the email template you'd like to create."}
      </p>
      <Textarea placeholder="Start writing here" rows={5} className="text-xl" />

      <Button className="w-full mt-7">GENERATE</Button>
    </div>
  );
};

export default AIInputBox;
