import { ReviewPreview } from "./ReviewPreview.jsx";

export function ReviewList({ reviews = [], onRemoveReview }) {
    // render message when there are no reviews
    if (!reviews || reviews.length === 0) {
        return (
            <div className="review-list empty">
                <h5>No reviews yet</h5>
            </div>
        );
    }

    return (
        <ul className="review-list">
            {reviews.map((review) => (
                <li key={review.id} className="review-item">
                    <ReviewPreview review={review} />
                    <button onClick={() => onRemoveReview(review.id)}> X </button>
                </li>
            ))}
        </ul>
    );
}