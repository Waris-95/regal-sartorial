import { loadProductReviews } from "./reviews";

const GET_PRODUCT_TYPE = "productTypes/GET_PRODUCT_TYPE";

export const loadProductType = (productType) => ({
    type: GET_PRODUCT_TYPE,
    payload: productType,
});

export const getProductType = (productTypeId) => async (dispatch) => {
    const response = await fetch(`/api/product_types/${productTypeId}`);
    if (response.ok) {
        const productType = await response.json();
        dispatch(loadProductType(productType.productType));
        dispatch(loadProductReviews(productType.productType.id));
        return response;
    }
};

const initialState = {};

const productTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_TYPE:
            return { ...state, ...action.payload };  // Ensuring state is an object
        default:
            return state;
    }
};

export default productTypeReducer;
