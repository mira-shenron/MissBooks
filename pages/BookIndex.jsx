import { getDefaultFilter, query, remove } from "../services/book.service.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";

const { useEffect, useState } = React;

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(getDefaultFilter());

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    console.log(filterBy);
    query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log("Problems getting books:", err);
      });
  }

  function onRemoveBook(bookId) {
    remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId));
      })
      .catch((err) => {
        console.log("Problems removing book:", err);
      });
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  //Display loading indicator
  if (!books) return <div>Loading...</div>

  return (
    <section className="book-index">
      <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  );
}
