/*
 * JavaScriptは文(Statement)と式(Expression)で構成される
 */

/* 式 Expression */
// 1という式の評価値を表示。式の末尾にはセミコロンをつける
console.log(1); // 1
// 1 + 1 という式の評価値を表示
console.log(1 + 1); // 2
// 式の評価値を変数に代入
const total = 1 + 1;
// 関数式の評価値(関数オブジェクト)を変数に代入
const fn = function () {
  return 1;
};
// fn()という式の評価値を表示
console.log(fn()); // 1

/* 文 Statement */
// if文やfor文は文である
const isTrue = true;
// isTrueという式がif文の中に出てくる。ブロックで終わる文にはセミコロンは不要
if (isTrue) {
  console.log("trueです");
}
// if文は式ではない為、変数への代入はできない(文は式になれない)
// const value = if (isTrue) {

/* 式文 */
// 式は文になることができる
// <https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/Expression_statement>
console.log("Hello");
[1, 2, 3].forEach((i) => console.log(i));
/* ブロック文 */
// if文とブロック文の組み合わせ
if (isTrue) {
  console.log("文1");
  console.log("文2");
} // ブロックで終わる文にはセミコロンは不要
// ブロック文はREPLで便利
const count = 1;
// const count = 2; // SyntaxError: Identifier 'count' has already been declared
// 以下のようにブロックを使うことで、同じ変数名を使うことができる
{
  const count = 2;
  console.log(count); // 2
}
console.log(count); // 1

/*
function宣言(文)とfunction式
*/
// learn関数を宣言する関数宣言文(statement)
function learn() {}
// 関数式(expression)をread変数に代入
const read = function () {};
