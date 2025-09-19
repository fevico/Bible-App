"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Languages from "@/components/card/languages";

const Page = () => {

  const [english, setEnglish] = useState();
  useEffect(() => {
    // Client-side logic can go here
    const data = async () => {
      const response = await fetch("https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": `${process.env.BIBLE_API_KEY}`
        },
      });
      const data = await response.json();
      setEnglish(data);
      console.log(data);
    };
    data();
  }, []);

  return ( <>
  <div className="flex flex-col items-center p-4">
    <h1 className="text-2xl font-bold mb-4">Welcome to the Bible App</h1>
    <p className="mb-4">Explore the scriptures and find inspiration.</p>
        <Input className="w-full max-w-sm" placeholder="Type something..." />
  </div>
  <Languages english={english} />
  </> );
}

export default Page;