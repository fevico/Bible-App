
"use client";
import { useEffect, useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BookList = ({ bibleId }: { bibleId: string }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [chapterContent, setChapterContent] = useState<string[]>([]); // Array of paragraph strings
  const [loading, setLoading] = useState(true);


  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${bibleId}/books`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "api-key": `${process.env.BIBLE_API_KEY}`,
            },
          }
        );
        const data = await response.json();
        setBooks(data.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [bibleId]);

  // Fetch chapters when a book is selected
  const handleBookClick = async (bookId: string) => {
    if (selectedBook === bookId) {
      setSelectedBook(null); // Toggle off
      setChapters([]);
      setSelectedChapter(null); // Reset chapter selection
      setChapterContent([]);
      return;
    }
    setSelectedBook(bookId);
    setSelectedChapter(null); // Reset chapter when switching books
    setChapterContent([]);
    try {
      const response = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "api-key": `${process.env.BIBLE_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      setChapters(data.data || []);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  // Fetch chapter content (verses with text) when a chapter is selected
  const handleChapterClick = async (chapterId: string) => {
    if (selectedChapter === chapterId) {
      setSelectedChapter(null); // Toggle off
      setChapterContent([]);
      return;
    }
    setSelectedChapter(chapterId);
    try {
      const response = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}?content-type=text&include-verse-numbers=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "api-key": `${process.env.BIBLE_API_KEY}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log("chapter data:", data);
      // Split the content string into paragraphs by newline
      const content = data.data.content.split("\n").filter((para: string) => para.trim() !== "");
      setChapterContent(content || []);
      console.log("Chapter content:", content);
    } catch (error) {
      console.error("Error fetching chapter verses:", error);
      setChapterContent([]);
    }
  };

  if (loading) {
    return <div className="text-center">Loading books...</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {books.map((book) => (
        <Card key={book.id} className="p-4">
          <CardTitle>{book.name}</CardTitle>
          <CardDescription>Book ID: {book.id}</CardDescription>
          <Button
            variant="outline"
            onClick={() => handleBookClick(book.id)}
            className="mt-2"
          >
            {selectedBook === book.id ? "Hide Chapters" : "View Chapters"}
          </Button>
          {selectedBook === book.id && (
            <div className="mt-4 flex flex-col gap-2">
              {chapters.map((chapter) => (
                <Card key={chapter.id} className="p-2">
                  <CardTitle onClick={() => handleChapterClick(chapter.id)} className="cursor-pointer">
                    Chapter {chapter.number}
                  </CardTitle>
                  <CardDescription>Chapter ID: {chapter.id}</CardDescription>
                  {selectedChapter === chapter.id && chapterContent.length > 0 && (
                    <div className="mt-2 p-2 bg-gray-100 rounded max-h-96 overflow-auto">
                      {chapterContent.map((paragraph, index) => (
                        <p key={index} className="mb-2 text-sm">{paragraph}</p>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default BookList;