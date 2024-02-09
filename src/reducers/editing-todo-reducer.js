const editingTodoInitialState = {
  id: null,
  title: "",
  author: "",
};

export const editingTodoReducer = (
  state = editingTodoInitialState,
  { type, payload }
) => {
  switch (type) {
    default:
      return state;
  }
};
