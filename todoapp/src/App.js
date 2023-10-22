console.log("App.js: loaded");
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
  constructor() {
    console.log("App initialized");
    // 1. TodoListの初期化
    this.todoListModel = new TodoListModel();
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    // 2. TodoListModelの状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      const todoListView = new TodoListView();
      // todoItemsに対応する TodoListViewを作成する
      const todoListElement = todoListView.createElement(todoItems, {
        // Todoアイテムが更新イベントが発生したときに呼ばれるリスナー関数
        onUpdateTodo: ({ id, completed }) => {
          this.todoListModel.updateTodo({
            id,
            completed,
          });
        },
        // Todoアイテムが削除イベントが発生したときに呼ばれるリスナー関数
        onDeleteTodo: ({ id }) => {
          this.todoListModel.deleteTodo({
            id,
          });
        },
      });
      // containerElementの中身をtodoListElementで上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });
    // 3.フォームを送信したら新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      // submitイベントの本来の動作を止める
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      // 入力欄を空文字にしてリセットする
      inputElement.value = "";
    });
  }
}
