import { ACTION_TYPE } from "../actions/actions";
const todosInitialState = {
  tasks: [],
  sort: "",
  search: "",
  isLoading: false,
  isDeleting: false,
  originalTasks: [],
};

export const todosReducer = (state = todosInitialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_TASKS:
      return {
        ...state,
        tasks: payload,
      };
      case 'LOAD_TODOS':
        return {
          ...state,
          tasks: payload,
          originalTasks: payload,
        };
       
    case ACTION_TYPE.SET_SORT:
      return {
        ...state,
        sort: payload,
      };
    case ACTION_TYPE.SET_SEARCH:
      return {
        ...state,
        search: payload,
      };
    case ACTION_TYPE.SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case ACTION_TYPE.SET_IS_DELETING:
      return {
        ...state,
        isDeleting: payload,
      };
    case ACTION_TYPE.SET_ORIGINAL_TASKS:
      return {
        ...state,
        originalTasks: payload,
      };
    default:
      return state;
  }
};
