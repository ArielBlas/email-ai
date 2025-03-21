"use client";
import React, { use, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Prompt from "@/Data/Prompt";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUserDetail } from "@/app/provider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

const AIInputBox = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate);
  const { userDetail } = useUserDetail();
  const router = useRouter();

  const onGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + "\n" + userInput;
    const tid = uuidv4();
    setLoading(true);

    try {
      const result = await fetch("/api/ai-email-generate", {
        method: "POST",
        body: {
          prompt: PROMPT,
        },
      });
      await SaveTemplate({
        id: tid,
        design: result.data,
        prompt: PROMPT,
        email: userDetail.email,
        description: userInput,
      });
      console.log(res);
      router.push(`/editor/${tid}`);
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
        {loading ? (
          <span className="flex gap-2">
            <Loader2 className="animate-spin" /> Please wait...
          </span>
        ) : (
          "GENERATE"
        )}
      </Button>
    </div>
  );
};

export default AIInputBox;
