export const ACTION_TYPE = {
  SET_TASKS: "SET_TASKS",
  // ADD_TASK: "ADD_TASK",
  // EDIT_TASK: "EDIT_TASK",
  // DELETE_TASK: "DELETE_TASK",
  SET_SORT: "SET_SORT",
  SET_SEARCH: "SET_SEARCH",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_IS_DELETING: "SET_IS_DELETING",
  SET_ORIGINAL_TASKS: "SET_ORIGINAL_TASKS",
};

export const setTasks = (tasks) => ({ type: ACTION_TYPE.SET_TASKS, payload: tasks,});
// export const addTask = (task) => ({type: ACTION_TYPE.ADD_TASK, payload: task});
// export const editTask = (task) => ({type: ACTION_TYPE.EDIT_TASK, payload: task});
// export const deleteTask = (id) => ({type: ACTION_TYPE.DELETE_TASK, payload: id});
export const setSort = (sort) => ({
  type: ACTION_TYPE.SET_SORT,
  payload: sort,
});
export const setSearch = (search) => ({
  type: ACTION_TYPE.SET_SEARCH,
  payload: search,
});
export const setIsLoading = (isLoading) => ({
  type: ACTION_TYPE.SET_IS_LOADING,
  payload: isLoading,
});
export const setIsDeleting = (isDeleting) => ({
  type: ACTION_TYPE.SET_IS_DELETING,
  payload: isDeleting,
});
export const setOriginalTasks = (originalTasks) => ({
  type: ACTION_TYPE.SET_ORIGINAL_TASKS,
  payload: originalTasks,
});
