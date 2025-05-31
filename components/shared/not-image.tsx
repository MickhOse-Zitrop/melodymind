"use client";

import React from "react";
import { useTheme } from "next-themes";

export const NotImage: React.FC = () => {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = React.useState<string>("/not-authorized.png");

  React.useEffect(() => {
    setImageUrl(
      theme === "light" ? "/not-authorized-dark.png" : "/not-authorized.png",
    );
  }, [theme]);

  return (
    <div className="flex justify-center items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt={"Not authorized"} />
    </div>
  );
};
