import { Component } from '@angular/core';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'React', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  editing = false;
  todos = todos;
  title = '';

  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  addTodo() {
    if (!this.title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.title,
      completed: false,
    };
    this.todos.push(newTodo);
    this.title = '';
  }
}
