import styles from "./app.module.css";
import { Fields } from "./components/todo-fields.jsx";
import { NewTask } from "./components/new-task.jsx";
import { useEffect} from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useSelector, useDispatch } from "react-redux";
import {
  setTasks,
  setSort,
  setSearch,
  setIsLoading,
  setIsDeleting,
  setOriginalTasks,
} from "./actions/actions";


export const App = () => {

 
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);

  const isDeleting = useSelector((state) => state.tasks.isDeleting);
  console.log("isDeleting", isDeleting);
   const isLoading = useSelector((state) => state.tasks.isLoading);
   const search = useSelector((state) => state.tasks.search);
   const sort = useSelector((state) => state.tasks.sort);
   const originalTasks = useSelector((state) => state.tasks.originalTasks);

  const debounceValue = useDebounce(search, 2000);

  useEffect(() => {
    dispatch(setIsLoading(true));

    fetch(`http://localhost:3005/posts?q=${debounceValue}`)
      .then((loadedData) => loadedData.json())
      .then((loadedTasks) => {
        dispatch(setTasks(loadedTasks));
        dispatch(setOriginalTasks(loadedTasks));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, [debounceValue, dispatch]);

  const requestDeleteTask = (id) => {
    dispatch(setIsDeleting(true));
    fetch(`http://localhost:3005/posts/${id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача удалена", response);
        dispatch(setTasks(tasks.filter((task) => task.id !== id)));
      })
      .finally(() => {
        dispatch(setIsDeleting(false));
      });
  };

  const addNewTask = () => {
    fetch("http://localhost:3005/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Новая заметка",
        author: "'Укажите ваше имя'",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Новая задача создана", response);
        dispatch(setTasks([...tasks, response]));
      });
  };

  const editTodos = async (id, payload) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    const responce = await fetch(`http://localhost:3005/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });
    const updateTask = await responce.json();
    const copyTasks = tasks.slice();
    copyTasks[taskIndex] = updateTask;
    dispatch(setTasks(copyTasks));
  };

  const handleChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  const handleSort = () => {
    if (sort === "") {
      const sortedTasks = [...tasks].sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      dispatch(setTasks(sortedTasks));
      dispatch(setSort("asc"));
    } else {
      dispatch(setTasks(originalTasks));
      dispatch(setSort(""));
    }
  };

  return (
    <div className={styles.app}>
      <h1>Hallo, React</h1>
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

// import styles from "./app.module.css";
// import { Fields } from "./components/todo-fields.jsx";
// import { NewTask } from "./components/new-task.jsx";
// import { useEffect, useState } from "react";
// import { useDebounce } from "./hooks/useDebounce";
// import { useDispatch, useSelector } from "react-redux";
// import { loadTodos} from "./actions/async-actions"

// export const App = () => {
//   const todos = useSelector( state => state.todos.todos)
//   console.log('todos', todos);
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(loadTodos())
//   }, [])

//   return (
//     <div className={styles.app}>
//      <h1> app</h1>
//      {todos.map( (todo) => <p key={todo.id}>{todo.title}</p>)}
//     </div>
//   );
// };

// export default App;
