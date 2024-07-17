import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductReviews, createReview, removeReview } from '../../redux/reviews';
import { getProductType } from '../../redux/ProductType';
import './Review.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

const Reviews = ({ productTypeId, productId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.reviews);
    const productType = useSelector((state) => state.productType);
    const user = useSelector((state) => state.session.user);
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(loadProductReviews(productTypeId, productId));
    }, [dispatch, productTypeId, productId]);

    useEffect(() => {
        if (productTypeId) {
            dispatch(getProductType(productTypeId)); // Dispatch action to load the productType
        }
    }, [dispatch, productTypeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset errors
        setErrors([]);

        // Validate description
        if (!description.trim()) {
            setErrors(['Please do provide a description for your review.']);
            return;
        }

        const reviewData = { description, rating, userId: user.id };
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

    const renderStars = (rating, onClick = () => {}) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
                key={index}
                icon={index < rating ? fullStar : emptyStar}
                onClick={() => onClick(index + 1)}
                className={`star-icon ${index < rating ? 'checked' : ''}`}
            />
        ));
    };

    // Check if the user has already reviewed this product
    const userReview = reviews.find((review) => review.userId === user?.id);

    return (
        <div className="reviews-container">
            <h2>Customer Reviews</h2>

            {reviews.length ? (
                reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <div className="review-rating">{renderStars(review.rating)}</div>
                        <p>{review.description}</p>
                        <p>Reviewed by: {review.user.firstName}</p> 
                        {user && user.id === review.userId && (
                            <button onClick={() => handleDelete(review.id)} className="delete-button">Delete</button>
                        )}
                    </div>
                ))
            ) : (
                <p>No reviews yet about {productType?.name}. Be the first to share your thoughts!</p>
            )}

            {user && !userReview && (
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
                            placeholder={`Share your experience about your ${productType?.name}`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <div className="rating-select">
                            {renderStars(rating, setRating)}
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Submit Review</button>
                </form>
            )}
        </div>
    );
};

export default Reviews;
