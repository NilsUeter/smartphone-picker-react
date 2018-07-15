import {} from "mobx-react";
import { observable } from "mobx";

class FilterStore {
  @observable country = "de";

  getTodos = () => {
    return this.todos;
  };

  getTodo = id => {
    return this.todos.find(todo => todo.id === id);
  };

  addTodo = (text, id) => {
    this.todos.push({ id: Date.now(), text });
  };

  removeTodo = id => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  };
}

const filterStore = new FilterStore();

export default filterStore;
