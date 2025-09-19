import BookList from "@/components/books/book-list";

const BooksPage = async ({ params }: { params: Promise<{ bibleId: string }> }) => {
  const { bibleId } = await params; // Await params to access bibleId

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Books of the Bible</h1>
      <BookList bibleId={bibleId} />
    </div>
  );
};

export default BooksPage;