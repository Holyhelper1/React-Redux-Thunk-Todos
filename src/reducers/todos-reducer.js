import { ACTION_TYPE } from "../actions/actions";
const todosInitialState = {
  tasks: [],
  sort: "asc",
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
    case "LOAD_TODOS":
      return {
        ...state,
        tasks: payload,
        originalTasks: payload,
      };
    case "DELETE_TODOS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
      };
    case "EDIT_TODOS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload.id ? payload : task
        ),
      };
    case "ADD_NEW_TASK":
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    case "SORT_TASKS":
      return {
        ...state,
        tasks: [...state.tasks].sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        }),
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
    case ACTION_TYPE.SET_ORIGINAL_TASKS:
      return {
        ...state,
        originalTasks: payload,
      };
    default:
      return state;
  }
};
