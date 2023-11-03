import * as assert from "node:assert";
import { TodoListModel } from "../../src/model/TodoListModel.js";
import { TodoItemModel } from "../../src/model/TodoItemModel.js";

it("TodoListModel#addTodo.emptyTitle", () => {
  const todoListModel = new TodoListModel();
  assert.strictEqual(todoListModel.getTotalCount(), 0);
  const todoItem = new TodoItemModel({
    title: "",
    completed: false,
  });

  todoListModel.addTodo(todoItem);
  assert.strictEqual(todoListModel.getTotalCount(), 0);
});
it("TodoListModel#addTodo.withTitle", () => {
  const todoListModel = new TodoListModel();
  assert.strictEqual(todoListModel.getTotalCount(), 0);
  const todoItem = new TodoItemModel({
    title: "this is test",
    completed: false,
  });

  todoListModel.addTodo(todoItem);
  assert.strictEqual(todoListModel.getTotalCount(), 1);
});
it("TodoListModel#getTodoItems", () => {
  const todoListModel = new TodoListModel();
  const todoItem = new TodoItemModel({
    title: "this is test",
    completed: false,
  });

  todoListModel.addTodo(todoItem);
  assert.strictEqual(todoListModel.getTodoItems()[0].title, "this is test");
  assert.strictEqual(todoListModel.getTodoItems()[0].completed, false);
});
it("TodoListModel#updateTodo", () => {
  const todoListModel = new TodoListModel();
  const todoItem = new TodoItemModel({
    title: "this is test",
    completed: false,
  });

  todoListModel.addTodo(todoItem);
  todoListModel.updateTodo({
    id: todoItem.id,
    completed: true,
  });
  assert.strictEqual(todoListModel.getTodoItems()[0].completed, true);
});
it("TodoListModel#deleteTodo", () => {
  const todoListModel = new TodoListModel();
  const todoItem = new TodoItemModel({
    title: "this is test",
    completed: false,
  });

  todoListModel.addTodo(todoItem);
  todoListModel.deleteTodo({
    id: todoItem.id,
  });
  assert.strictEqual(todoListModel.getTodoItems().length, 0);
});
