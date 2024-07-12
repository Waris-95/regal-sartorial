import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductReviews, createReview, removeReview } from '../../redux/reviews';
import { getProductType } from '../../redux/ProductType'
import './Review.css';

const Reviews = ({ productTypeId, productId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.reviews);
    const productType = useSelector((state) => state.productType)
    const user = useSelector((state) => state.session.user);
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(loadProductReviews(productTypeId));
    }, [dispatch, productTypeId]);

    useEffect(() => {
        if (productTypeId) {
            dispatch(getProductType(productTypeId)); // Dispatch action to load the productType
        }
    }, [dispatch, productTypeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = { description, rating };
        const data = await dispatch(createReview(productTypeId, productId, reviewData));
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setDescription('');
            setRating(1);
            setErrors([]);
        }
    };

    const handleDelete = (reviewId) => {
        dispatch(removeReview(reviewId));
    };

    return (
        <div className="reviews-container">
           <h2>Customer Reviews</h2>


            {reviews.length ? (
                reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <p>{review.description}</p>
                        <p>Rating: <strong>{review.rating}</strong></p>
                        {user && user.id === review.userId && (
                            <button onClick={() => handleDelete(review.id)} className="delete-button">Delete</button>
                        )}
                    </div>
                ))
            ) : (
                <p>No reviews yet about {productType?.name}. Be the first to share your thoughts!</p>
            )}

            {user && (
                <form onSubmit={handleSubmit} className="review-form">
                    <h3>Leave a Review</h3>
                    {errors.length > 0 && (
                        <ul className="errors">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder={`Share your experience about your ${productType?.name}`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num} Star{num > 1 ? 's' : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit-button">Submit Review</button>
                </form>
            )}
        </div>
    );
};

export default Reviews;
