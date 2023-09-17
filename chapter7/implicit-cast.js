/*
暗黙的な型変換とは

ある処理において、その処理過程で行われる明示的ではない型変換のこと
*/
// === では、異なるデータ型の比較結果はfalse
console.log(1 === "1"); // false
// == では、異なるデータ型は暗黙的な型変換をしてから比較される
// 暗黙的な型変換によって 1 == 1 のように変換されてから比較される
console.log(1 == "1"); // true
// 暗黙的な型変換が行われ、数値の加算として計算される
console.log(1 + true); // 1 + 1 に変換され、2になる

// 1. 等価演算子の暗黙的な型変換
// 異なる型である場合に暗黙的な型変換が行われる
console.log(1 == "1"); // true
console.log(0 == false); // true
console.log(10 == ["10"]); // true
// === を使う事でこれらの暗黙的な型変換を防ぐ事ができる
console.log(1 === "1"); // false
console.log(0 === false); // false
console.log(10 === ["10"]); // false

// 2. さまざまな暗黙的な型変換
console.log(1 + "2"); // +演算子の仕様(文字列が優先、次に数値)により、1が文字列に変換されてから結合される => "12"
console.log(1 - "2"); // (文字列には-演算子は無い)"2"が数値に変換されてから計算される => -1
const x = 1,
  y = "2",
  z = 3;
console.log(x + y + z); // 12 + 3 => "123"
console.log(y + x + z); // "21" + 3 => "213"
console.log(x + z + y); // 1 + 3 => 4 + "2" => "42"

/*
明示的な型変換 任意の値→真偽値
*/
Boolean("string"); // true
Boolean(1); // true
Boolean({}); // true
Boolean(0); // false
Boolean(""); // false
Boolean(null); // false
// JavaScriptではtrue/falseの判定は以下のルールで決められる
// 1. falsyな値はfalseと判定される
// 2. それ以外はtrueと判定される
// falsyな値は以下の7つ
// 1. false
// 2. 0
// 3. ""(空文字)
// 4. null
// 5. undefined
// 6. NaN
// 7. document.all
let x1; // undefined
if (!x1) {
  console.log("falsyな値なら表示", x1);
}
if (x1 === undefined) {
  console.log("undefinedなら表示", x1);
}

/*
明示的な型変換 数値→文字列
*/
String(1); // "1"
String("str"); // "str"
String(true); // "true"
String(null); // "null"
String(undefined); // "undefined"
String(Symbol("シンボルの説明文")); // "Symbol(シンボルの説明文)"
// プリミティブ型ではない値の場合
String([1, 2, 3]); // "1,2,3"
String({ key: "value" }); // "[object Object]"
String(function () {}); // "function () {}"

/*
明示的な型変換 シンボル→文字列
*/
// "文字列" + Symbol("シンボルの説明"); // Uncaught TypeError: Cannot convert a Symbol value to a string
"文字列" + String(Symbol("シンボルの説明")); // "文字列Symbol(シンボルの説明)"

/*
明示的な型変換 文字列→数値
*/
// ユーザ入力を文字列として受け取る
const input = window.prompt("数字を入力してください", "42");
// 文字列を数値に変換する
const num = Number(input);
console.log(typeof num, num); // number 42
// "1"をパースして10進数として取り出す
console.log(Number.parseInt("1", 10)); // 1
// 余計な文字は無視してパースした結果を返す
console.log(Number.parseInt("42px", 10)); // 42
console.log(Number.parseInt("10.5", 10)); // 10
// 文字列をパースして浮動小数点数を取り出す
console.log(Number.parseFloat("1")); // 1
console.log(Number.parseFloat("1.5")); // 1.5
console.log(Number.parseFloat("42.5px")); // 42.5
// 数字ではない為、数値へは変換できない
console.log(Number("文字列")); // NaN
console.log(Number(undefined)); // NaN
const userInput2 = "任意の文字列";
const num2 = Number.parseInt(userInput2, 10);
if (!Number.isNaN(num2)) {
  console.log("NaNではない値にパースできた", num2);
}
/*
NaN はNot a NumberだけどNumber型
*/
console.log(typeof NaN); // number
console.log(Number({})); // NaN
// NaNは何と演算してもNaNになる
const a = 10,
  b = a + NaN,
  c = b + 20;
console.log(a, b, c); // 10 NaN NaN

function isNaN(x) {
  // NaNは自分自信と一致しない
  return x !== x;
}
console.log(isNaN(10)); // false
console.log(isNaN("文字列")); // false
console.log(isNaN({})); // false
console.log(isNaN([])); // false
console.log(isNaN(NaN)); // true
// 任意の個数の数値を受け取り、その合計値を返す関数
/* 
function sum(...values) {
  return values.reduce((total, value) => {
    return total + value;
  }, 0);
}
const d = 1,
  f = 10;
let e; // undefined
console.log(sum(d, e, f)); // NaNになってしまう

↑これを避ける為には、以下のようにする
*/

/**
 * 数値を合計した値を返します
 * 1つ以上の数値と共に呼び出す必要があります。
 * @param {...number} values
 * @returns {number}
 */
function sum(...values) {
  return values.reduce((total, value) => {
    // 値がNumber型でない場合は例外を投げる
    if (typeof value !== "number") {
      throw new Error(`${value}はNumber型ではありません`);
    }
    return total + value;
  }, 0);
}
// sum(1,undefined, 3); // Uncaught Error: undefinedはNumber型ではありません

/*
空文字列かどうかを判定する(悪い例)
*/
function isEmptyStringBad(str) {
  // strがfalsyな値なら、trueを返す
  return !Boolean(str);
}
console.log(isEmptyStringBad("")); // true 空文字列である事がうまく判定できている
console.log(isEmptyStringBad(0)); // true 0はfalsyな値なので、空文字列と判定されてしまう
console.log(isEmptyStringBad()); // true undefinedはfalsyな値なので、空文字列と判定されてしまう
/*
空文字列かどうかを判定する(良い例)
*/
function isEmptyString(str) {
  // strが文字列型で、長さが0なら、trueを返す
  return typeof str === "string" && str.length === 0;
}
console.log(isEmptyString("")); // true 空文字列である事がうまく判定できている
console.log(isEmptyString(0)); // false 0は空文字列ではないことが判定できている
console.log(isEmptyString()); // false undefinedは空文字列ではないと判定できている
