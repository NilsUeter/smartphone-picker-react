import {} from "mobx-react";
import { observable, action, computed } from "mobx";

class FilterStore {
  @observable country = "de";
  @observable scaleInput = true;

  @observable design = 1;
  @observable processor = 1;
  @observable updates = 1;
  @observable camera = 1;
  @observable battery = 1;

  @observable headphoneJack = false;
  @observable simCards = false;
  @observable sdSlot = false;
  @observable notch = false;

  @computed
  get scale() {
    return this.scaleInput ? 2.6 : "1x";
  }

  @action
  toggleAttribute = name => {
    this[name] = !this[name];
  };

  @action
  changeAttribute = (name, newValue) => {
    this[name] = newValue;
  };

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
