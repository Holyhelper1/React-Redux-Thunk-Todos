import { setTasks } from "../actions/actions";
export const loadTodos = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3005/posts");
    const tasks = await response.json();
    dispatch({ type: "LOAD_TODOS", payload: tasks });
  } catch (error) {
    console.log("no tasks", error);
  }
};

export const deleteTodos = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:3005/posts/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "DELETE_TODOS", payload: id });
  } catch (error) {
    console.log("Failed to delete task", error);
  }
};

export const asyncEditTodos = (id, payload) => async (dispatch, getState) => {
  try {
    const tasks = getState().tasks.tasks;

    const taskIndex = tasks.findIndex((task) => task.id === id);

    const response = await fetch(`http://localhost:3005/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const updateTask = await response.json();
    const copyTasks = [...tasks];

    copyTasks[taskIndex] = updateTask;

    dispatch(setTasks(copyTasks));
  } catch (error) {
    console.log("Failed to edit task", error);
  }
};

export const asyncAddNewTask = (payload) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3005/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Новая заметка",
        author: "'Укажите ваше имя'",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const newTask = await response.json();
    dispatch({ type: "ADD_NEW_TASK", payload: newTask });
  } catch (error) {
    console.log("Failed to add new task", error);
  }
};

export const sortTasks = (sort) => ({
  type: "SORT_TASKS",
  payload: sort,
});
