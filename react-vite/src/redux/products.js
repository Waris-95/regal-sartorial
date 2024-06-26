// actions.js
export const GET_ALL_PRODUCTS = 'products/GET_ALL_PRODUCTS';

export const getAllProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  payload: products,
});

export const getAllProductsThunk = (category) => async (dispatch) => {
  if (category === 'View All') category = null;
  let url = '/api/product_types/';
  const params = new URLSearchParams();

  if (category) params.append('category', category);

  if (params.toString()) {
    url += '?' + params.toString();
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(getAllProducts(data.products));
      return data.products;
    } else {
      const errorData = await response.json();
      console.error('Error fetching products:', errorData);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// reducer.js
const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export default productsReducer;
