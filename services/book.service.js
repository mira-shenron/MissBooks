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
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            return books;
        })
}

export function getBook(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

export function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId);
}

export function saveBook(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book);
    } else {
        return storageService.post(BOOK_KEY, book);
    }
}

export function getDefaultFilter() {
    return { title: '', maxPrice: '' }
}

export function getEmptyBook(title = '', subtitle = '', price = '') {
    return {
        title: '',
        subtitle: '',
        listPrice: {
            amount: ''
        }
    }
}

export function getEmptyReview(rating = 1) {
    const todayIso = new Date().toISOString().slice(0, 10);
    return {
        fullname: '',
        rating,
        readAt: todayIso
    }
}


export function addGoogleBook(item){
    // query existing books
    return storageService.query(BOOK_KEY).then((books) => {
        //perform duplicate check
        books = books || [];
        let title = (item.volumeInfo && item.volumeInfo.title) || '';
        let authors = (item.volumeInfo && item.volumeInfo.authors) || [];

        let exists = books.some(function (b) {
            if (!b.title || !title) return false;
            if (b.title.toLowerCase() !== title.toLowerCase()) return false;
            // if authors available, compare first author
            if (authors.length === 0 || !b.authors || b.authors.length === 0) return true;
            return (b.authors[0] || '').toLowerCase() === (authors[0] || '').toLowerCase();
        });

        if (exists) {
            return Promise.reject('Book already exists');
        }

        // persist converted Google item and return the saved book
        return storageService.post(BOOK_KEY, _convertFromGoogleFormat(item));
    });
}

function _convertFromGoogleFormat(item){
    const bookFromItem = {
        id: makeId(),
        title: (item.volumeInfo && item.volumeInfo.title) || '',
        subtitle: (item.volumeInfo && item.volumeInfo.subtitle) || '',
        authors: (item.volumeInfo && item.volumeInfo.authors) ||  ['Unknown'],
        publishedDate: parseInt(((item.volumeInfo && item.volumeInfo.publishedDate) || '').slice(0,4)) || new Date().getFullYear(),
        description: (item.volumeInfo && item.volumeInfo.description) || '',
        pageCount: (item.volumeInfo && item.volumeInfo.pageCount) || 0,
        categories: (item.volumeInfo && item.volumeInfo.categories) || [],
        thumbnail: (item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) || '',
        language: (item.volumeInfo && item.volumeInfo.language) || 'en',
        listPrice: {
            amount: getRandomIntInclusive(80, 500),
            currencyCode: 'USD',
            isOnSale: false
        },
        reviews: []
    };

    return bookFromItem;
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
    const reviews = [
        { id: makeId(), fullname: 'John Smith', rating: 2, readAt: new Date().toISOString().slice(0, 10) },
        { id: makeId(), fullname: 'Mary Smith', rating: 5, readAt: new Date().toISOString().slice(0, 10) },
    ];

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
            thumbnail: `https://www.coding-academy.org/books-photos/${i + 1}.jpg`,
            // thumbnail: `https://picsum.photos/200/300`,
            language: "en",
            listPrice: {
                amount: getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            },
            reviews,
        }
        books.push(book);
    }
    console.log('created books');
    return books;
}
