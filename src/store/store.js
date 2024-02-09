import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { editingTodoReducer, optionsReducer, todosReducer } from "../reducers";
import { composeWithDevTools } from '@redux-devtools/extension';

const reducer = combineReducers({
  todos: todosReducer,
  editingTodo: editingTodoReducer,
  options: optionsReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

