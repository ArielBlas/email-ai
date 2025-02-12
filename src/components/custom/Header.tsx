import Image from "next/image";
import React from "react";
import SignInButton from "./SignInButton";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 shadow-sm px-10">
      <Image src={"./logo.svg"} alt="logo" width={180} height={140} />

      <div>
        <SignInButton />
      </div>
    </div>
  );
};

export default Header;
