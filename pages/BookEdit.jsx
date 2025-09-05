
import { getEmptyBook, getBook, saveBook } from "../services/book.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(getEmptyBook());
    const navigate = useNavigate();
    const { bookId } = useParams();

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        getBook(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Problem getting book', err);
            });
    }

    function onSaveBook(ev) {
        ev.preventDefault();

        saveBook(bookToEdit)
            .then(savedBook => {
                navigate('/book')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot save book!')
            });
    }

    function onCancel(ev) {
        //navigate back to the books list  
        navigate('/book');
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                // keep empty string when input is cleared to avoid becoming 0
                value = target.value === '' ? '' : +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        // special-case the price input which is stored as book.listPrice.amount
        if (field === 'price') {
            setBookToEdit((prevBook) => ({
                ...prevBook,
                listPrice: { ...(prevBook.listPrice || {}), amount: value }
            }))
            return
        }

        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={bookToEdit.title} type="text" name="title" id="title" />

                <label htmlFor="title">Subtitle</label>
                <input onChange={handleChange} value={bookToEdit.subtitle} type="text" name="subtitle" id="subtitle" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={(bookToEdit.listPrice && bookToEdit.listPrice.amount) || ''} type="number" name="price" id="price" />
                <section className="btns flex">
                    <button>Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </section>
            </form>
        </section>
    )

}