import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./modules";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify options if needed
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const persistor = persistStore(store);

export default store;
export { persistor };
