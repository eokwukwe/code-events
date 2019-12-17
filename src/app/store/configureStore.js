import { createStore, applyMiddleware,  } from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "../reducers/rootReducer";

export const configureStore = () => {
  const middlewares = [thunk]
  const composeEhancer = composeWithDevTools(applyMiddleware(...middlewares))
  const store = createStore(rootReducer, composeEhancer)
  return store;
}
