import { getBook, saveBook } from "../services/book.service.js";
import {capitalizeFirstLetter} from "../services/util.service.js";
import {LongTxt} from "../cmps/LongTxt.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadBook()
    }, [params.bookId]);

    function loadBook() {
        getBook(params.bookId)
            .then(book => setBook(book))
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false));
    }

    if (isLoading) return <div>Loading...</div>

    function onBack() {
        navigate('/book');
        // navigate(-1)
    }

    function getIsVintage(){
        let isVintage = true;
        if(new Date().getFullYear() - book.publishedDate < 10){
            isVintage = false;
        }
        return isVintage;
    }

    function getReadingLength(){
        let readingType = null;

        if(book.pageCount > 500){
            readingType = 'Serious Reading';
        }else if(book.pageCount > 200){
            readingType = 'Descent Reading';
        }else if(book.pageCount < 100){
            readingType = 'Light Reading';
        }
        return readingType;
    }

    function onRemoveReview(reviewId){
        // remove review from the array and update state so component rerenders
        const updatedReviews = (book.reviews || []).filter(r => r.id !== reviewId);
        const updatedBook = { ...book, reviews: updatedReviews };

        // persist the updated book then update the state
        saveBook(updatedBook)
        .then(setBook(updatedBook))
        .catch(err => console.error('Failed saving book after removing review', err));
    }
    
    
    const isVintage = getIsVintage();
    const readingLength = getReadingLength();

    console.log('Render')

    return (
        <section className="book-details">
            <button onClick={onBack} className="btn-arrow back-btn">
                Back
            </button>
            
            <div className="book-details-container">
                <section>
                    <h2>Title: {capitalizeFirstLetter(book.title)}</h2>
                    <h4>By: {book.authors}</h4> 
                    <h3 className="price">{book.listPrice.amount} {book.listPrice.currencyCode}</h3>
                    
                    <section className='adittional-details'> 
                        <span className='tag is-vintage'>{isVintage ? 'Vintage' : 'New'}</span>
                        {readingLength && <span className="tag reading-length">{readingLength}</span>}
                    </section>

                    <section className="description-section">
                        <h3>Description: </h3>
                        <LongTxt txt={book.description} length={50}></LongTxt>
                    </section>

                    <section className="review-container">
                        <section>
                            <h3>Reviews</h3>
                            <button>+</button>
                        </section>
                        <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
                    </section>
                </section>
                <section className="book-img">
                    <img src={book.thumbnail} alt="book-image" />
                    {book.listPrice.isOnSale && <span className="on-sale">On Sale!</span>}
                </section>
            </div>
            
            <section className="navigations-arrows-container"> 
                <div className="navigation-arrows">
                    <button className="btn-arrow" onClick={() => navigate(`/book/${book.prevBookId}`)}>
                        Prev
                    </button>
                    <button className="btn-arrow" onClick={() => navigate(`/book/${book.nextBookId}`)}>
                        Next
                    </button>
                </div>
            </section>
        </section>
    )
}