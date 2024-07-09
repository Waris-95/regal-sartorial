import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productsReducer from "./products";
import bagReducer from "./bags";
import ordersReducer from "./orders";
import productTypeReducer from "./ProductType";
import reviewsReducer from "./reviews";
import favoritesReducer from "./favorites";
import stylesReducer from "./styles";

const rootReducer = combineReducers({
  products: productsReducer,
  productType: productTypeReducer,
  reviews: reviewsReducer,
  favorites: favoritesReducer,
  session: sessionReducer,
  styles: stylesReducer,
  orders: ordersReducer,
  bag: bagReducer,
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
