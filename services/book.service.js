import { loadFromStorage, saveToStorage, makeId, makeLorem, getRandomIntInclusive } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()


export function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title)) 
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books;
        })
}

export function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

export function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId);
}

export function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book);
    } else {
        return storageService.post(BOOK_KEY, book);
    }
}

export function getDefaultFilter() {
    return { title: '', minPrice: '' }
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id);
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1];
        book.nextBookId = nextBook.id;
        book.prevBookId = prevBook.id;
        return book;
    })
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY);
    console.log(books);
    if (!books || !books.length) {
        books = _createDemoDataBooks()
        saveToStorage(BOOK_KEY, books);
    }
}

function _createDemoDataBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
    const books = [];

    for (let i = 0; i < 20; i++) {
        const book = {
            id: makeId(),
            title: makeLorem(2),
            subtitle: makeLorem(4),
            authors: [makeLorem(1)],
            publishedDate: getRandomIntInclusive(1950, 2024),
            description: makeLorem(20),
            pageCount: getRandomIntInclusive(20, 600),
            categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `https://www.coding-academy.org/books-photos/${i+1}.jpg`,
            // thumbnail: `https://picsum.photos/200/300`,
            language: "en",
            listPrice: {
                amount: getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book);
    }
    console.log('created books');
    return books;
}
