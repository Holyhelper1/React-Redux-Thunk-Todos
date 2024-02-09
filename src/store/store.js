import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { todosReducer } from "../reducers/todos-reducer";

const reducer = combineReducers({
  todos: todosReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
