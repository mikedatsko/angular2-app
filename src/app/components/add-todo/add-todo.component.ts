import { Component, OnInit } from '@angular/core';
import * as uuidV1 from 'uuid/v1';
import { StorageService } from '../../services';

const log = new window.loggester.logger('AddTodoComponent', 20);

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todoText: string = '';
  todoId: string = '';

  constructor(
    private storageSrv: StorageService
  ) {
    cabit.onStart('edit-todo', todo => {
      log('edit-todo', 'start', todo);
      this.todoId = todo.id;
      this.todoText = todo.text;
    });
  }

  ngOnInit() {
    log('ngOnInit', this.todoId, !!this.todoId);
  }

  add(form) {
    log('add', this.todoId);
    const todoText = form.todo.value;

    if (!todoText) { return }

    let todos = this.storageSrv.read('todos') || [];

    if (this.todoId) {
      log('save');
      todos = todos.map(_todo => {
        if (_todo.id === this.todoId) {
          _todo.text = todoText;
        }
        return _todo;
      });

      this.storageSrv.update('todos', todos);

      const todo = {
        id: this.todoId,
        text: todoText
      };

      cabit.end('edit-todo', todo);
    } else {
      log('add');
      const todo = {
        text: todoText,
        checked: false,
        id: uuidV1()
      };

      todos.push(todo);
      this.storageSrv.create('todos', todos);

      cabit.start('add-todo', todo);
    }

    form.reset();
    this.reset();
  }

  reset() {
    this.todoId = '';
    this.todoText = '';
  }
}
