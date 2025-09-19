"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation"; // For navigation to chapters page

const LanguageCard = ({ data }: { data: any }) => {
  const router = useRouter(); // Optional: For navigating to chapters

  const response = data?.data

  if (!response) {
    return <div>Loading...</div>;
  }
 
  const handleViewChapters = () => {
    // TODO: Navigate to a chapters page with the Bible ID
    router.push(`/books/${response.id}`);
    console.log(`Viewing chapters for Bible ID: ${response.id}`);
  };

  return (
    <Card className="w-full max-w-sm p-4">
      <CardTitle>{response.name}</CardTitle>
      <CardDescription>
        <p className="text-lg font-semibold">Local Name: {response?.nameLocal}</p>
        <p>Abbreviation: {response?.abbreviation}</p>
        <p>Description: {response?.description}</p>
        <p>Language: {response?.language?.name} ({response?.language?.id})</p>
        {/* Add more fields as needed from the API response */}
      </CardDescription>
      <Button variant="outline" onClick={handleViewChapters} className="mt-4">
        Explore books and chapters
      </Button>
    </Card>
  );
};

export default LanguageCard;