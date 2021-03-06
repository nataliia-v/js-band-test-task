export default function(fetchTodos) {
  // Delete todo
  const deleteBtns = document.querySelectorAll('.delete-btn');

  for (let i = 0; i < deleteBtns.length; i += 1) {
    deleteBtns[i].addEventListener('click', $event => {
      const currentId = $event.target.parentElement.parentElement.id;
      const todoItems = JSON.parse(localStorage.getItem('todos'));

      for (let item = 0; item < todoItems.length; item += 1) {
        if (todoItems[item].id === currentId) {
          todoItems.splice(item, 1);
        }
      }

      localStorage.setItem('todos', JSON.stringify(todoItems));

      fetchTodos();
    });
  }
}
