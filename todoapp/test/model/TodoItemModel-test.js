import * as assert from "node:assert";
import { TodoItemModel } from "../../src/model/TodoItemModel.js";

it("isEmptyTitle", () => {
  const todoItem = new TodoItemModel({
    title: "",
    completed: false,
  });
  assert.strictEqual(todoItem.isEmptyTitle(), true);
});
it("isNotEmptyTitle", () => {
  const todoItem = new TodoItemModel({
    title: "title",
    completed: false,
  });
  assert.strictEqual(todoItem.isEmptyTitle(), false);
});
it("isIncrementIndex", () => {
  const todoItem = new TodoItemModel({
    title: "title",
    completed: false,
  });
  const todoItem2 = new TodoItemModel({
    title: "title2",
    completed: false,
  });
  assert.strictEqual(todoItem.id + 1, todoItem2.id);
});
