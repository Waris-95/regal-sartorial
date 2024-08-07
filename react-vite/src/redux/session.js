import { setBag, editBag } from "./bags";
import { getCookie } from "../utils";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(setUser(data));
		return data;
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		let bag = 0;
		const orders = data.orders;
		orders.map(order => {
			if (order.status === "pending") {
				order.orderItems.map(item => {
					bag += item.quantity;
				});
			}
		});
		dispatch(setBag(bag));
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (firstName, lastName, email, password, csrfToken) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
		"X-CSRFToken": csrfToken,
	  },
	  body: JSON.stringify({
		firstName,
		lastName,
		email,
		password,
	  }),
	});
  
	if (response.ok) {
	  const data = await response.json();
	  dispatch(setUser(data));
	  return null;
	} else if (response.status < 500) {
	  const data = await response.json();
	  if (data.errors) {
		return data.errors; // Ensure errors are returned
	  }
	} else {
	  return ["An error occurred. Please try again."];
	}
  };
  

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
