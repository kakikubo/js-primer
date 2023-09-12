/*

データ型

- プリミティブ型
    - 真偽値
    - 数値
    - 文字列
    - null
    - undefined
    - シンボル
- オブジェクト型
    - オブジェクト
    - 配列
    - 関数
    - 正規表現
*/
console.log(typeof true); // boolean
console.log(typeof 42); // number
console.log(typeof "JavaScript"); // string
console.log(typeof Symbol("シンボル")); // symbol
console.log(typeof undefined); // undefined
console.log(typeof null); // object (歴史的経緯のあるバグのため)
console.log(typeof ["配列"]); // object
console.log(typeof { key: "value" }); // object
console.log(typeof function () {}); // function

// "と"で囲んだ範囲が文字列リテラル
const str = "こんにちわ";

// 真偽値
const bool = true; // true or false

// 整数リテラル
const integer = 42; // ex. 0, 2, 10
const integer2 = 0b1111; // 2進数
const integer8 = 0o777; // 8進数
const integer16 = 0xffff; // 16進数

// 非推奨な8進数リテラル
// strict modeでは例外が発生
console.log(0644); // 420
console.log(0777); // 511

// 浮動小数点リテラル
// console.log(0xFF); // 255 ←lintで修正されちゃうのでコメントアウト
console.log(0xff); // 255 (大文字小文字は区別されない)
console.log(2e8); // 200000000 (指数表記)(2 * 10^8)

// 文字列リテラル
console.log("文字列リテラル"); // 文字列リテラル
console.log("文字列リテラル"); // 文字列リテラル
console.log(`文字列リテラル`); // 文字列リテラル

console.log("文字列リテラルの\n改行");
// => 文字列リテラルの
// 改行
console.log(`これは
\`テンプレート
リテラル\`です
変数名: ${str}も埋め込めます`);

// nullリテラル
const foo = null;
console.log(foo); // null

// undefinedリテラル
let bar;
console.log(bar); // undefined

// オブジェクトリテラル
const obj = { key: "value" };
console.log(obj); // => { key: 'value' }
console.log(obj.key); // value
console.log(obj["key"]); // value

const obj2 = {
  123: "value",
};
console.log(obj2["123"]); // value
console.log(obj2[123]); // value
// console.log(obj2.123); // SyntaxError: Unexpected number

// 配列リテラル
const emptyArray = [];
const array = [1, 2, 3];
console.log(array[0]); // 1

// 正規表現リテラル
const numberRegExp = /\d+/; // 1文字以上の数字にマッチする正規表現
console.log(numberRegExp.test("123")); // true

//// ラッパーオブジェクト(あえて使わなくていい)
// 文字列をラップしたStringラッパーオブジェクト
const str2 = new String("文字列");
console.log(str2); // => [String: '文字列']
// ラッパーオブジェクトはobject型のデータ
console.log(typeof str2); // => object
// Stringオブジェクトのlengthプロパティは文字列の長さを返す
console.log(str2.length); // => 3

//// プリミティブ型の文字列データ
const str3 = "文字列";
// プリミティブ型の文字列はstring型のデータ
console.log(typeof str3); // => string
// プリミティブ型の文字列もlengthプロパティを持つ
console.log(str3.length); // => 3
