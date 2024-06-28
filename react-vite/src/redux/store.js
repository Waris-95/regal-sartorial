import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productsReducer from "./products";
import bagReducer from "./bags";
import ordersReducer from "./orders";
import productTypeReducer from "./ProductType";
import reviewsReducer from "./reviews";
import favoritesReducer from "./favorites";

const rootReducer = combineReducers({
  bag: bagReducer,
  favorites: favoritesReducer,
  orders: ordersReducer,
  products: productsReducer,
  productType: productTypeReducer,
  reviews: reviewsReducer,
  session: sessionReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
