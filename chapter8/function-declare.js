/*
関数と宣言
*/
function multiple(num) {
  return num * 2;
}
console.log(multiple(10)); // 20

// 何も返さない関数の場合、undefinedを返す
function nofn() {
  return;
}
console.log(nofn()); // undefined

// 仮引数が無い場合、undefinedが入る
function echo(x) {
  return x;
}
console.log(echo(1)); // 1
console.log(echo()); // undefined

// 複数の仮引数の場合でも、引数が渡されない場合はundefinedが入る
function argumentsToArray(x, y) {
  return [x, y];
}
console.log(argumentsToArray(1, 2)); // [1, 2]
console.log(argumentsToArray(1)); // [1, undefined]

// デフォルト引数 ES2015
function echoDefault(x = "default") {
  return x;
}
console.log(echoDefault(1)); // 1
console.log(echoDefault()); // default
// ES2015以前のデフォルト引数の書き方
function addPrefixOld(text, prefix) {
  const pre = prefix || "デフォルト:";
  return pre + text;
}
console.log(addPrefixOld("文字列")); // デフォルト:文字列
console.log(addPrefixOld("文字列", "カスタム:")); // カスタム:文字列
console.log(addPrefixOld("文字列", "")); // デフォルト:文字列 → ""はfalsyと判定されるため
// 改めてES2015のデフォルト引数で書き直す
function addPrefix(text, prefix = "デフォルト:") {
  return prefix + text;
}
console.log(addPrefix("文字列")); // デフォルト:文字列
console.log(addPrefix("文字列", "カスタム:")); // カスタム:文字列
console.log(addPrefix("文字列", "")); // 文字列 → ちゃんと空文字が渡されている

// 引数が仮引数よりも多く渡された場合、無視される
function add(x, y) {
  return x + y;
}
console.log(add(1, 2)); // 3
console.log(add(1, 2, 3, 4, 5)); // 3

/*
可変長引数
*/
console.log(Math.max(1, 5, 10, 20)); // 20
console.log(Math.max(100, 10, 20)); // 100
/* 可変長引数 Rest Parameters */
function restFn(...args) {
  console.log(args);
}
restFn(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]

// 通常の仮引数を指定した後にRest Parametersを指定する事も可能(順序的にはRest Parametersが後ろになる)
function argRestFn(arg1, ...restArgs) {
  console.log(arg1);
  console.log(restArgs);
}
argRestFn("a", "b", "c");

// spread構文
// 配列を展開して引数にわたす
function spreadFn(x, y, z) {
  console.log(x);
  console.log(y);
  console.log(z);
}
const array = [1, 2, 3];
spreadFn(...array); // 1, 2, 3

// arguments (非推奨) rest parametersを使う方が良い
// 理由としては以下の通り
// * 仮引数がない事で必要とされる引数がわたされているかどうかがわかりにくいため
// * Array-likeなオブジェクトである
// * Arrow Functionで使えない
function argsFn() {
  // argumentsはインデックスを指定して各要素にアクセスできる
  console.log(arguments[0]); // 1
  console.log(arguments[1]); // 2
  console.log(arguments[2]); // 3
  console.log(arguments); // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}
argsFn(1, 2, 3); // 1, 2, 3

// 通常の関数
function printUserIdNormal(user) {
  console.log(user.id);
}
const user = {
  id: 42,
};
printUserIdNormal(user); // 42
// 関数の引数の分割代入 destructuring assignment
function printUser({ id }) {
  console.log(id);
}
printUser(user); // 42
// オブジェクトの分割代入
const { id } = user;
console.log(id); // 42
// 配列の分割代入
const array2 = [1, 2];
function printArray2([x, y]) {
  console.log(x);
  console.log(y);
}
printArray2(array2); // 1, 2

/* 関数はオブジェクト */
function fn() {
  console.log("fnが呼び出されました");
}
const myFunc = fn;
myFunc(); // fnが呼び出されました

/*
関数式と関数宣言
*/
// 関数式は変数名で参照できる為、"関数名"を省略できる(匿名関数または無名関数と呼ぶ)
const fn1 = function () {};
// 関数宣言では"関数名"を省略できない
// function () {}; // SyntaxError: Function statements require a function name

// factorialは関数の外から呼び出せる名前
// innerFactは関数の外から呼び出せない名前
const factorial = function innerFact(n) {
  if (n === 0) {
    return 1;
  }
  // innerFactを再帰的に呼び出している
  return n * innerFact(n - 1);
};
console.log(factorial(3)); // 6

/*
Arrow Function 
(ES2015)
*/
// 仮引数の数と定義
const fnA = () => {
  /* 仮引数がないとき */
};
const fnB = (x) => {
  /* 仮引数が1つのみのとき */
};
const fnC = (x) => {
  /* 仮引数が1つのみのときは()を省略可能 */
};
const fnD = (x, y) => {
  /* 仮引数が複数のとき */
};
// 値の返し方
// 次の2つの定義は同じ意味となる
const mulA = (x) => {
  return x * x;
};
const mulB = (x) => x * x; // 1行のみの場合はreturnと{}を省略可能

// 通常のfunctionで書いた場合
const array3 = [1, 2, 3];
// 1,2,3と順番に値が渡されコールバック関数(匿名関数)が処理する
const doubleArray = array3.map(function (value) {
  return value * 2;
});
console.log(doubleArray); // [2, 4, 6]
// Arrow Functionで書いた場合
const array4 = [1, 2, 3];
const doubleArray2 = array4.map((value) => value * 2);
console.log(doubleArray2); // [2, 4, 6]

/*
関数の定義は上書きされる
*/
console.log(fn()); // fnが呼び出されました→あとで上書きされるので結果が異なる
function fn(x) {
  return `関数を上書き1 x: ${x}`;
}
console.log(fn(1)); // 関数を上書き x: 1 →あとで上書きされるので結果が異なる
function fn(x, y) {
  return `関数を上書き2 x: ${x}, y: ${y}`;
}
console.log(fn(1, 2)); // 関数を上書き x: 1, y: 2

/*
コールバック関数

function 高階関数(コールバック関数) {
  コールバック関数();
}
*/
const array5 = [1, 2, 3];
// outputはコールバック関数
const output = (value) => {
  console.log(value);
};
// forEachは高階関数
array5.forEach(output); // 1, 2, 3
// 以下のように書くことも可能
array5.forEach((value) => {
  console.log(value);
});

/*
メソッド

オブジェクトのプロパティである関数をメソッドと呼ぶ。関数とメソッドの機能的な違いは無いが、メソッドはオブジェクトに属しているという点で関数とは異なる。
*/
const obj = {
  method1: function () {
    console.log("functionキーワードでのメソッド");
  },
  method2: () => {
    console.log("Arrow Functionでのメソッド");
  },
  method3() {
    console.log("省略記法でのメソッド(ES2015)");
  },
};
obj.method1(); // functionキーワードでのメソッド
obj.method2(); // Arrow Functionでのメソッド
obj.method3(); // 省略記法でのメソッド(ES2015)
