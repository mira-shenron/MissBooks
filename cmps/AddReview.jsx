import { makeId } from "../services/util.service.js";
import { getEmptyReview } from "../services/book.service.js";

export function AddReview({ onAddReview, onClose, ratingOptions = [1,2,3,4,5] }) {
    const [review, setReview] = React.useState(getEmptyReview());

    function handleChange({ target }) {
        let { value, name: field } = target;

        switch (target.type) {
        case "range":
        case "number":
            //prevent becoming 0 when empty
            if (value !== "") {
            value = +target.value;
            }
            break;
        case "checkbox":
            value = target.checked;
            break;
        }

        setReview((prev) => ({ ...prev, [field]: value }));
    }

    function onSubmit(ev) {
        ev.preventDefault();

        if(onAddReview) {
            const newReview = { ...review, id: makeId() };
            onAddReview(newReview);
        }
        if(onClose) {
            onClose();
        }
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Add Review</h3>
                <form onSubmit={onSubmit} className="review-form">
                    <section className="input">
                        <label>Full name</label>
                        <input name="fullname" value={review.fullname} onChange={handleChange} />
                    </section>

                    <section className="input">
                        <label>Rating</label>
                        <select name="rating" value={review.rating} onChange={handleChange}>
                            {ratingOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </section>

                    <section className="input">
                        <label>Read At</label>
                        <input name="readAt" value={review.readAt} onChange={handleChange} type="date" />
                    </section>

                    <section className="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </section>
                </form>
            </div>
        </div>
    );
}