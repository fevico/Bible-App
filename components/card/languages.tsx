"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card"; // Adjusted import if needed
import LanguageCard from "./language-card"; // Fixed typo from "languuage-card" in your code

const Languages = ({ english }: { english: any }) => {
  const [selectedBible, setSelectedBible] = useState<any>(null);

  const handleEnglishLanguage = () => {
    console.log("English language selected");
    setSelectedBible(english); // Use the passed English Bible data
  };

  const handleYorubaLanguage = () => {
    console.log("Yoruba language selected");
    // TODO: Later, fetch Yoruba Bibles here (see expansion notes below)
  };

//   const fetchYoruba = async () => {
//   const response = await fetch("https://api.scripture.api.bible/v1/bibles?language=yor", {
//     headers: { "api-key": "your-key" },
//   });
//   const data = await response.json();
//   setSelectedBibles(data.data);
// };
// fetchYoruba();

  const handleFrenchLanguage = () => {
    console.log("French language selected");
    // TODO: Later, fetch French Bibles
  };

  const handleHausaLanguage = () => {
    console.log("Hausa language selected");
    // TODO: Later, fetch Hausa Bibles
  };

  return (
    <div className="flex flex-row gap-8 p-4">
      <Card className="w-full max-w-sm p-4">
        <CardTitle>Available Languages</CardTitle>
        <CardDescription>Select a language to explore:</CardDescription>
        <Button className="" variant="ghost" onClick={handleEnglishLanguage}>
          English
        </Button>
        <Button className="" variant="ghost" onClick={handleYorubaLanguage}>
          Yoruba
        </Button>
        <Button className="" variant="ghost" onClick={handleFrenchLanguage}>
          French
        </Button>
        <Button className="" variant="ghost" onClick={handleHausaLanguage}>
          Hausa
        </Button>
      </Card>
      {selectedBible && <LanguageCard data={selectedBible} />}
    </div>
  );
};

export default Languages;