"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const AIInputBox = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="mt-5">
      <p className="mb-2">
        {"Provide details about the email template you'd like to create."}
      </p>
      <Textarea
        placeholder="Start writing here"
        rows={5}
        className="text-xl"
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button
        className="w-full mt-7"
        disabled={userInput.length == 0 || loading}
      >
        GENERATE
      </Button>
    </div>
  );
};

export default AIInputBox;
