import styles from "./todos-fields.module.css";
import { Field } from "./Field";
import { useSelector, useDispatch } from "react-redux";
import { loadTodos } from "../actions/async-actions";
import { useEffect } from "react";

export const Fields = ({

  requestDeleteTask,
  editTodos,
  handleChange,
  search,
  handleSort,
}) => {
  const dispatch = useDispatch();
const tasks = useSelector((state) => state.tasks.tasks);
console.log(search, 'search fields');

  useEffect(() => {
    dispatch(loadTodos())
  } , [dispatch])

  return (
    <>
      <div>
        <div className={styles.searchWrapper}>
          <input
            className={styles.inputSearch}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
          />
          <input
            type="checkbox"
            className={styles.abcSearch}
            onClick={handleSort}
          />
          <p className={styles.abcText}>Sort by Abc</p>
        </div>

        {tasks.map(({ id, author, title }) => (
          <Field
            key={id}
            id={id}
            author={author}
            title={title}
            requestDeleteTask={requestDeleteTask}
            editTodos={editTodos}
          />
        ))}
      </div>
    </>
  );
};
