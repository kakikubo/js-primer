// ユニークなIDを管理する変数
let todoIdx = 0;

export class TodoItemModel {
  /**
   * @param {string} title Todoアイテムのタイトル
   * @param {boolean} completed Todoアイテムが完了済みならtrue、そうでない場合はfalse
   */
  constructor({ title, completed }) {
    // idは自動的に連番となりそれぞれのインスタンス毎に異なるものとする
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }

  /**
   * タイトルが空文字列の場合にtrueを返す
   * @returns {boolean}
   */
  isEmptyTitle() {
    return this.title.trim().length === 0;
  }
}
