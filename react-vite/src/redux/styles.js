const GET_USER_STYLES = 'styles/GET_USER_STYLES'
const GET_STYLE = 'styles/GET_STYLE'
const ADD_STYLE = 'styles/ADD_STYLE'
const ADD_STYLE_ITEM = 'styles/ADD_STYLE_ITEM';
const GET_STYLE_ITEMS = 'styles/GET_STYLE_ITEMS'
const EDIT_STYLE = 'styles/EDIT_STYLE'
const REMOVE_STYLE = 'styles/REMOVE_STYLE'

export const loadUserStyles = styles => ({
    type: GET_USER_STYLES,
    payload: styles
})

export const loadStyleItems = styleItems => ({
    type: GET_STYLE_ITEMS,
    payload: styleItems
})

export const loadStyle = style => ({
    type: GET_STYLE,
    payload: style
})

export const addStyle = style => ({
    type: ADD_STYLE,
    payload: style
})

export const addStyleItem = styleItem => ({
    type: ADD_STYLE_ITEM,
    payload: styleItem
});

export const editStyle = (style) => ({
    type: EDIT_STYLE,
    payload: style
})

export const removeStyle = styleId => ({
    type: REMOVE_STYLE,
    payload: styleId
})


export const getUserStyles = () => async (dispatch) => {
    const response = await fetch(`/api/styles/current`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const data = await response.json();
        // console.log('Fetched styles:', data); // Log for debugging
        dispatch(loadUserStyles(data)); // Dispatch the correct payload
        if (!data.styles || !data.styles.length) {
            return null;
        }
        return data;
    } else {
        return response;
    }
};



export const getStyleItems = (styleId) => async (dispatch) => {

    const response = await fetch(`/api/styles/${styleId}/style_items/`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const styleItems = await response.json();

        dispatch(loadStyleItems(styleItems));
        return styleItems;
    } else {
        return response;
    }
}

export const getStyle = (styleId) => async (dispatch) => {

    const response = await fetch(`/api/styles/current/${styleId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const style = await response.json();

        dispatch(loadStyle(style));
        return style;
    } else {
        return response;
    }
}

export const createStyle = data => async (dispatch) => {

    const response = await fetch(`/api/styles/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const style = await response.json();
        dispatch(addStyle(style))
        dispatch(getUserStyles())

        return style;
    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {

            return data;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const newStyleItem = (styleItemId, styleId) => async dispatch => {
    const response = await fetch(`/api/styles/${styleId}/style_items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_type_id: styleItemId })
    });

    if (response.ok) {
        const res = await response.json();
        if (res.error) {
            return res;
        }
        dispatch(getUserStyles());
        return res;
    } else {
        return response;
    }
};


export const modifyStyle = (styleId, title) => async dispatch => {

    const response = await fetch(`/api/styles/${styleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(title)
    })

    if (response.ok) {
        const style = await response.json();

        dispatch(editStyle(style));
        return style;
    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {

            return data;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const deleteStyle = (styleId) => async (dispatch) => {

    const response = await fetch(`/api/styles/${styleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {

        dispatch(removeStyle(styleId))
        dispatch(getUserStyles())
        return response;
    } else {
        return response;
    }
}

export const deleteStyleItem = (styleId, styleItemId) => async (dispatch) => {
    const response = await fetch(`/api/styles/${styleId}/style_items/${styleItemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        // dispatch(removeStyleItem(styleItemId))
        dispatch(getUserStyles())
        return response;
    } else {
        return response;
    }
}

const initialState = {};

const stylesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_STYLES: {
            newState = {};
            if (Array.isArray(action.payload.styles)) {
                action.payload.styles.forEach(style => {
                    newState[style.id] = style;
                });
            } else {
                console.error('GET_USER_STYLES payload is not an array:', action.payload.styles);
            }
            return newState;
        }
        case GET_STYLE_ITEMS: {
            newState = { ...state };
            newState.styleItems = action.payload;
            return newState;
        }
        case ADD_STYLE: {
            newState = {
                ...state,
                [action.payload.id]: action.payload
            };
            return newState;
        }
        case GET_STYLE: {
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case EDIT_STYLE: {
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case REMOVE_STYLE: {
            newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        default:
            return state;
    }
};

export default stylesReducer;
