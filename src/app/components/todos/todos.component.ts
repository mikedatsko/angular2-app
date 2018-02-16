import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services';

const log = new window.loggester.logger('TodosComponent', 20);

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Array<any> = [];

  constructor(
    private storageSrv: StorageService
  ) {
    this.todos = this.storageSrv.read('todos') || [];

    cabit.onStart('add-todo', todo => {
      this.todos.push(todo);
    });

    cabit.onEnd('edit-todo', todo => {
      log('edit-todo', 'end', todo);
      this.todos = this.todos.map(_todo => {
        if (_todo.id === todo.id) {
          _todo.text = todo.text;
        }

        _todo.isEdit = false;

        return _todo;
      });
    });
  }

  ngOnInit() {

  }
  
  edit(todo) {
    this.todos = this.todos.map(_todo => {
      _todo.isEdit = true;
      return _todo;
    });
    cabit.start('edit-todo', todo);
  }

  changeChecked(todo) {
    todo.checked = !todo.checked;
    this.update();
  }

  remove(todo) {
    this.todos.splice(todo, 1);
    this.update();
  }

  update() {
    this.storageSrv.update('todos', this.todos);
  }
}
