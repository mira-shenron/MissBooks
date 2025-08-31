import { capitalizeFirstLetter } from "../services/util.service.js";

export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>{capitalizeFirstLetter(book.title)}</h2>
            <h4>{capitalizeFirstLetter(book.subtitle)}</h4>
            <h4>{book.listPrice.amount}$</h4>
            <img src={book.thumbnail} alt="book cover image"/>
        </article>
    )
}