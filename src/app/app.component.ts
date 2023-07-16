import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Todo } from './types/todo';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todos = todos;
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  handleFormSubmit() {
    if (this.todoForm.invalid) {
      return;
    }
    this.addTodo(this.title.value);
    this.todoForm.reset();
  }

  addTodo(newTitle: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    };
    this.todos = [...this.todos, newTodo];
  }

  renameTodo(todoId: number, newTitle: string) {
    this.todos = this.todos.map((todo) => {
      return todo.id !== todoId ? todo : { ...todo, title: newTitle };
    });
  }

  toggleTodo(todoId: number) {
    this.todos = this.todos.map((todo) => {
      return todo.id !== todoId
        ? todo
        : { ...todo, completed: !todo.completed };
    });
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }
}
