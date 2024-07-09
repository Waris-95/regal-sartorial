
// Action Types
const GET_CURRENT_ORDER = 'orders/GET_CURRENT_ORDER'
const GET_USER_ORDERS = 'orders/GET_USER_ORDERS';
const ADD_ORDER = 'orders/ADD_ORDER';
const ADD_ORDER_ITEM = 'orderItems/ADD_ORDER_ITEM';
const DELETE_ORDER = 'orders/DELETE_ORDER';
const EDIT_ORDER_ITEM = 'orders/EDIT_ORDER_ITEM';
const EDIT_ORDER = 'orders/EDIT_ORDER';
const REMOVE_ORDER_ITEM = 'orders/REMOVE_ORDER_ITEM';



// Action Creators

export const currentOrder = (order) => ({
    type: GET_CURRENT_ORDER,
    payload: order
})

export const loadOrders = (orders) => ({
    type: GET_USER_ORDERS,
    payload: orders
});

export const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order
});

export const addOrderItem = (orderItem) => ({
    type: ADD_ORDER_ITEM,
    payload: orderItem
});

export const deleteOrder = (orderId) => ({
    type: DELETE_ORDER,
    payload: orderId
})

export const editOrderItem = (orderItem) => ({
    type: EDIT_ORDER_ITEM,
    payload: orderItem
})

export const editOrder = (order) => ({
    type: EDIT_ORDER,
    payload: order
})

export const removeItem = (orderItemId) => ({
    type: REMOVE_ORDER_ITEM,
    payload: orderItemId
})


// Thunks
export const submitOrder = (orderId) => async dispatch => {
    const response = await fetch(`/api/orders/${orderId}/shipping`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        dispatch(deleteOrder(orderId));
    } else {
        console.error("Failed to submit order");
        return response;
    }
};

export const getCurrentOrder = () => async (dispatch) => {
    const response = await fetch(`/api/orders/current/pending`);
    if (response.ok) {
        const order = await response.json();
        // console.log("Fetched current order:", order);
        dispatch(currentOrder(order));
        return order;
    } else {
        console.error("Failed to fetch current order");
        return response;
    }
};


export const getUserOrders = () => async (dispatch) => {
    const response = await fetch(`/api/orders/current`, {
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        const orders = await response.json();
        dispatch(loadOrders(orders));
        return orders;
    } else {
        return response;
    }
};

export const newOrder = (orderData, itemData) => async dispatch => {
    console.log("Order Data being sent:", orderData);
    console.log("Item Data being sent:", itemData);

    const response = await fetch(`/api/orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });

    if (response.ok) {
        const order = await response.json();
        dispatch(addOrder(order));
        if (itemData) {
            dispatch(newOrderItem(itemData, order.id));
        }
        return order;
    } else {
        const error = await response.json();
        console.error("Error creating new order:", error);
        return response;
    }
};

export const newOrderItem = (data, orderId) => async dispatch => {
    if (!data) {
        console.error("No item data provided");
        return;
    }
    if (!orderId) {
        console.error("No order ID provided");
        return;
    }
    console.log("Order ID being sent:", orderId);
    console.log("Order Item Data being sent:", data);

    const response = await fetch(`/api/orders/${orderId}/order_items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const orderItem = await response.json();
        dispatch(addOrderItem(orderItem));
        return orderItem;
    } else {
        const error = await response.json();
        console.error("Error adding order item:", error);
        return response;
    }
};



export const modifyOrder = (orderId, data) => async dispatch => {
    const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const order = await response.json();
        dispatch(editOrder(order));
        return order;
    } else {
        return response;
    }
};

export const modifyItem = (orderId, itemId, data) => async dispatch => {
    dispatch(modifyOrder(orderId, data));

    const response = await fetch(`/api/orders/${orderId}/order_items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const orderItem = await response.json();
        dispatch(editOrderItem(orderItem));
        return orderItem;
    } else {
        return response;
    }
};

export const removeOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        dispatch(deleteOrder(orderId));
        return response;
    } else {
        return response;
    }
};

export const deleteItem = (orderId, item) => async (dispatch) => {
    let itemId = item.id;
    dispatch(modifyOrder(orderId, { delete: item.total_price }));
    const response = await fetch(`/api/orders/${orderId}/order_items/${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        dispatch(getCurrentOrder());
        return response;
    } else {
        return response;
    }
};


const initialState = {
    currentOrder: null,
    orders: [],
};

const ordersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_ORDERS: {
            return { ...state, orders: action.payload.orders };
        }
        case GET_CURRENT_ORDER:
            newState = { ...state };
            if (!action.payload) {
                newState.currentOrder = null;
            } else {
                const { price, tax, total_price, ...rest } = action.payload;
                newState.currentOrder = {
                    ...rest,
                    price: price ? Math.max(price, 0) : 0,
                    tax: tax ? Math.max(tax, 0) : 0,
                    total_price: total_price ? Math.max(total_price, 0) : 0,
                };
            }
            return newState;
        case ADD_ORDER: {
            const { price, tax, total_price, ...rest } = action.payload;
            newState = { ...state };
            newState.currentOrder = {
                ...rest,
                price: price ? Math.max(price, 0) : 0,
                tax: tax ? Math.max(tax, 0) : 0,
                total_price: total_price ? Math.max(total_price, 0) : 0,
            };
            return newState;
        }
        case ADD_ORDER_ITEM: {
            newState = { ...state };
            newState.currentOrder.orderItems.push(action.payload);
            const newPrice = newState.currentOrder.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            newState.currentOrder.price = newPrice;
            newState.currentOrder.tax = newPrice * 0.1; // Assuming 10% tax
            newState.currentOrder.total_price = newPrice + newState.currentOrder.tax;
            return newState;
        }
        case EDIT_ORDER_ITEM: {
            newState = { ...state };
            let index = newState.currentOrder.orderItems.findIndex(x => x.id === action.payload.id);
            newState.currentOrder.orderItems[index] = action.payload;
            const newPrice = newState.currentOrder.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            newState.currentOrder.price = newPrice;
            newState.currentOrder.tax = newPrice * 0.1; // Assuming 10% tax
            newState.currentOrder.total_price = newPrice + newState.currentOrder.tax;
            return newState;
        }
        case EDIT_ORDER: {
            const { price, tax, total_price, ...rest } = action.payload;
            newState = { ...state };
            newState.currentOrder = {
                ...newState.currentOrder,
                ...rest,
                price: price ? Math.max(price, 0) : 0,
                tax: tax ? Math.max(tax, 0) : 0,
                total_price: total_price ? Math.max(total_price, 0) : 0,
            };
            return newState;
        }
        case DELETE_ORDER: {
            return { ...state, currentOrder: null };
        }
        case REMOVE_ORDER_ITEM: {
            newState = { ...state };
            newState.currentOrder.orderItems = newState.currentOrder.orderItems.filter((item) => item.id !== action.payload);
            const newPrice = newState.currentOrder.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            newState.currentOrder.price = newPrice;
            newState.currentOrder.tax = newPrice * 0.1; // Assuming 10% tax
            newState.currentOrder.total_price = newPrice + newState.currentOrder.tax;
            return newState;
        }
        default:
            return state;
    }
};

export default ordersReducer;
