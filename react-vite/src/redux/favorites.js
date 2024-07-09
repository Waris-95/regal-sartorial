// Action Types
const GET_USER_FAVORITES = 'favorites/GET_USER_FAVORITES';
const ADD_FAVORITE = 'favorites/ADD_FAVORITE';
const UPDATE_FAVORITE = 'favorites/UPDATE_FAVORITE';
const DELETE_FAVORITE = 'favorites/DELETE_FAVORITE';

// Action Creators
export const loadUserFavorites = (favorites) => ({
    type: GET_USER_FAVORITES,
    payload: favorites
});

export const addFavorite = (favorite) => ({
    type: ADD_FAVORITE,
    payload: favorite
});

export const updateFavorite = (favorite) => ({
    type: UPDATE_FAVORITE,
    payload: favorite
});

export const deleteFavorite = (favoriteId) => ({
    type: DELETE_FAVORITE,
    payload: favoriteId
});

// Thunks
export const getUserFavorites = () => async (dispatch) => {
    const response = await fetch(`/api/favorites/current`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const favorites = await response.json();
        dispatch(loadUserFavorites(favorites.favorites));  // Fix payload structure
        return favorites.favorites;
    }
}

export const addFavorites = (productTypeId, productId, image) => async (dispatch) => {
    try {
        const response = await fetch(`/api/product_types/${productTypeId}/products/${productId}/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image })
        });

        if (response.ok) {
            const favorite = await response.json();
            dispatch(addFavorite(favorite));
            return favorite;
        } else {
            console.error("Failed to add favorite:", response.statusText);
        }
    } catch (err) {
        console.error("Error in addFavorites thunk:", err);
    }
};

export const updateFavorites = (favId, image) => async (dispatch) => {
    try {
        const response = await fetch(`/api/favorites/${favId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image })
        });

        if (response.ok) {
            const favorite = await response.json();
            dispatch(updateFavorite(favorite));
            return favorite;
        } else {
            console.error("Failed to update favorite:", response.statusText);
        }
    } catch (err) {
        console.error("Error in updateFavorites thunk:", err);
    }
};


export const deleteFavorites = (favId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteFavorite(favId));
    }
    return response;
}

// Reducer
const initialState = [];

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_FAVORITES: {
          return action.payload;
        }
      case ADD_FAVORITE: {
        return [...state, action.payload];
      }
      case UPDATE_FAVORITE: {
        return state.map((favorite) => 
          favorite.id === action.payload.id ? action.payload : favorite
        );
      }
      case DELETE_FAVORITE: {
        return state.filter((favorite) => favorite.id !== action.payload);
      }
      default:
        return state;
    }
};


export default favoritesReducer;
