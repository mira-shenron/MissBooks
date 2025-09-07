import { getDefaultFilter, query, remove } from "../services/book.service.js";
import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useEffect, useState } = React;
const { Link, useSearchParams } = ReactRouterDOM;

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(getDefaultFilter());

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log("Problems getting books:", err);
        showErrorMsg("Problems getting books");
      });
  }

  function onRemoveBook(bookId) {
    remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId));
        showSuccessMsg("Book removed successfully");
      })
      .catch((err) => {
        console.log("Problems removing book:", err);
        showErrorMsg("Problems removing book");
      });
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  //Display loading indicator
  if (!books) return <div>Loading...</div>;

  return (
    <section className="book-index">
      <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
      <button className="add-book-btn"><Link to="/book/add">Add Book</Link></button>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  );
}
