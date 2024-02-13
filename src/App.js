import styles from "./app.module.css";
import { Fields } from "./components/todo-fields.jsx";
import { NewTask } from "./components/new-task.jsx";
import { useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useSelector, useDispatch } from "react-redux";
import { setSearch, setIsLoading, setOriginalTasks } from "./actions/actions";

import {
  deleteTodos,
  loadTodos,
  asyncEditTodos,
  asyncAddNewTask,
  sortTasks,
} from "./actions/async-actions";

export const App = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  console.log("tasks", tasks);

  const isDeleting = useSelector((state) => state.tasks.isDeleting);

  const isLoading = useSelector((state) => state.tasks.isLoading);
  const search = useSelector((state) => state.tasks.search);
  const sort = useSelector((state) => state.tasks.sort);

  const debouncedValue = useDebounce(search, 2000);
  console.log(debouncedValue, "debounceValue is?");

  useEffect(
    () => {
      dispatch(setIsLoading(true));

      fetch(`http://localhost:3005/posts?q=${debouncedValue}`)
        .then((loadedData) => loadedData.json())
        .then((loadedTasks) => {
          dispatch(loadTodos(loadedTasks));
          dispatch(setOriginalTasks(loadedTasks));
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    },
    [dispatch, debouncedValue],
    tasks
  );

  const requestDeleteTask = (id) => {
    dispatch(deleteTodos(id));
  };

  const addNewTask = () => {
    dispatch(asyncAddNewTask());
  };

  const editTodos = async (id, payload) => {
    dispatch(asyncEditTodos(id, payload));
  };

  const handleChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  const handleSort = () => {
    const newSort = sort === "asc" ? "desc" : "asc";
    dispatch(sortTasks(newSort));
  };

  return (
    <div className={styles.app}>
      {isLoading ? (
        <h1 className={styles.todosLoader}>Loading...</h1>
      ) : (
        <div className={styles.app}>
          <Fields
            requestDeleteTask={requestDeleteTask}
            isDeleting={isDeleting}
            editTodos={editTodos}
            handleChange={handleChange}
            search={search}
            handleSort={handleSort}
          />
          <NewTask addNewTask={addNewTask} />
        </div>
      )}
    </div>
  );
};

export default App;
