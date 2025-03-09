"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Prompt from "@/Data/Prompt";

const AIInputBox = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const onGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + "\n" + userInput;
    setLoading(true);

    try {
      const res = await fetch("/api/ai-email.generate", {
        method: "POST",
        body: {
          prompt: PROMPT,
        },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

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
        onClick={onGenerate}
      >
        GENERATE
      </Button>
    </div>
  );
};

export default AIInputBox;
