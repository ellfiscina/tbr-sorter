import AddBookModal from "./components/add-book-modal";
import BookItem from "./components/book-item";
import CallToAction from "./components/call-to-action";
import Header from "./components/header";
import UpNext from "./components/up-next";

export default function Home() {
  const books = [
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      order: 0,
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      order: 1,
      coverUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      order: 2,
    },
  ];
  const nextBook = {
    id: '0', title: 'The Midnight Library', author: 'Matt Haig', order: 0,
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream font-sans p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border-[6px] border-accent">
          <Header />

          {books.length > 0 ? (
            <UpNext
              nextBook={nextBook}
              isRandomDisabled={books.length <= 1}
            />
          ) : (
            <CallToAction />
          )}

          {books.length > 1 && (
            <div className="p-6 pt-0">
              <div className="mb-3">
                <h3 className="text-gray-700 text-sm flex items-center gap-2">
                  <span className="w-6 h-6 bg-blush rounded-lg flex items-center justify-center text-xs" aria-hidden="true">
                    {books.length - 1}
                  </span>
                  <span aria-label={`${books.length - 1} books in your queue`}>
                    In Your Queue
                  </span>
                </h3>
              </div>
              <div className="space-y-3" role="list" aria-label="Reading queue">
                {books.slice(1).map((book, index) => (
                  <BookItem
                    key={book.id}
                    book={book}
                    index={index + 1}
                    totalBooks={books.length}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <AddBookModal />
    </div>
  );
}
