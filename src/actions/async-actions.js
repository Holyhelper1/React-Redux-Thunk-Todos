
export const  loadTodos = () => async (dispatch, getState) => {
     try {
      const response = await fetch('http://localhost:3005/posts')
      const tasks = await response.json()
      dispatch({type: 'LOAD_TODOS', payload: tasks})
     } catch (error) {
        console.log('no tasks', error);
     }

}


