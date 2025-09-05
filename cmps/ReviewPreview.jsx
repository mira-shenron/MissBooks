export function ReviewPreview({ review }) {
    return (
        <article className="review-preview">
            <h4>By: {review.fullname}</h4>
            <h4>Rating: {review.rating}</h4>
            <h4>Read at: {review.readAt}</h4>
        </article>
    )
}