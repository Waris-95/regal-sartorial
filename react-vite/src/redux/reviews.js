// Action Types
const GET_PRODUCT_REVIEWS = "reviews/GET_PRODUCT_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";


// Action Creators
export const getProductReviews = (reviews) => ({
    type: GET_PRODUCT_REVIEWS,
    payload: reviews,
});

export const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review,
});

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId,
});


// Thunks
export const loadProductReviews = (productTypeId) => async (dispatch) => {
    const response = await fetch(`/api/product_types/${productTypeId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getProductReviews(reviews));
        return reviews;
    } else {
        return response;
    }
};

export const createReview = (productTypeId, productId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/product_types/${productTypeId}/products/${productId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
    });
    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
        return newReview;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const removeReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteReview(reviewId));
        return response;
    } else {
        return response;
    }
};


// Initial State
const initialState = {
    reviews: [],
};


// Reducer
const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PRODUCT_REVIEWS:
            newState = { ...state, reviews: action.payload.reviews };
            return newState;
        case ADD_REVIEW:
            newState = { ...state, reviews: [...state.reviews, action.payload] };
            return newState;
        case DELETE_REVIEW:
            newState = { ...state, reviews: state.reviews.filter((review) => review.id !== action.payload) };
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;
