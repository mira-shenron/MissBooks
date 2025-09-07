import { makeId } from "../services/util.service.js";
import { BookPreview } from "../cmps/BookPreview.jsx";
import { SearchCmp } from "../cmps/SearchCmp.jsx";
import { query } from "../services/google-book.service.js";
import { addGoogleBook } from "../services/book.service.js";

const { useEffect, useState } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export function BookAdd() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log("Problems getting books:", err);
        showErrorMsg("Problems getting books");
      })
      .finally(() => setIsLoading(false));
  }

  function onAddBook(book) {
    addGoogleBook(book)
      .then((savedBook) => {
        showSuccessMsg("The book was added!");
        navigate("/book");
      })
      .catch((err) => {
        console.log("err:", err);
        if(err === 'Book already exists'){
            showErrorMsg("Book already exists");
        }else{
            showErrorMsg("Cannot save book!");
        }
      });
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy);
  }

  function adjustToPreviewFormat(book) {
    const title = book.volumeInfo.title;
    const subtitle = book.volumeInfo.subtitle;
    const thumbnail = book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : "";
    return {
      title,
      subtitle,
      thumbnail,
    };
  }

  //Display loading indicator
  if (isLoading) return <div>Loading...</div>;

  console.log(books);
  books.map((book) => console.log(book));
  return (
    <section className="book-index">
      <h1>Add book from Google API</h1>
      <SearchCmp onSetFilter={onSetFilterBy} filterBy={filterBy}></SearchCmp>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id}>
            <BookPreview {...adjustToPreviewFormat(book)} />
            <section>
              <button onClick={() => onAddBook(book)}> Add</button>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
