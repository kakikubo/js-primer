// 演算子

/* 
二項演算子
*/

//   プラス演算子
console.log(1 + 1); // 2
// 内部的にIEEE754方式の浮動小数点数として表現されている為、
// 整数と浮動小数点数の加算もプラス演算子で行える
console.log(10 + 0.5);
// 文字列結合演算子
const value = "文字列" + "結合";
console.log(value); // => 文字列結合
// マイナス演算子(-)
console.log(1 - 1); // => 0
console.log(10 - 0.5); // => 9.5
// 乗算演算子(*)
console.log(2 * 8); // => 16
console.log(10 * 0.5); // => 5
// 除算演算子(/)
console.log(10 / 2); // => 5
console.log(10 / 0.5); // => 20
// 剰余演算子(%)
console.log(10 % 2); // => 0
console.log(10 % 4); // => 2
// 指数演算子/べき乗演算子(**) ES2016
// べき乗演算子(ES2016)で2の4乗を計算
console.log(2 ** 4); // => 16
console.log(Math.pow(2, 4)); // => 16 同じ挙動をする

/* 
単項演算子
*/
// 単項プラス演算子(+)
console.log(+1); // => 1
console.log(+"1"); // => 1
console.log(+"文字列"); // => NaN
// Not-a-Number(NaN)は数値ではないが、Number型の値
// 自分自身とも一致しない
console.log(NaN === NaN); // => false
// Number型である
console.log(typeof NaN); // => number
console.log(Number.isNaN(NaN)); // => true

// 単項マイナス演算子(-)
console.log(-(-1)); // => 1
console.log(-"1"); // => -1
console.log(-"文字列"); // => NaN

// インクリメント演算子(++)
let num = 1;
console.log(num++); // 1(…と出力してからnumに1を加算))
console.log(num); // => 2
console.log(++num); // 2 + 1してから出力 => 3
console.log(num); // => 3

// デクリメント演算子(--)
let num2 = 1;
console.log(num2--); // 1(…と出力してからnumに1を減算)
console.log(num2); // => 0
console.log(--num2); // 0 - 1してから出力 => -1
console.log(num2); // => -1

/* 
比較演算子
*/

// 厳密等価演算子
console.log(1 === 1); // => true
console.log(1 === "1"); // => false
// {}は新しいオブジェクトを作成している
const objA = {};
const objB = {};
// 生成されたオブジェクトは異なる参照となる
console.log(objA === objB); // => false
// 同じ参照を比較している場合
console.log(objA === objA); // => true

// 厳密不等価演算子
console.log(1 !== 1); // => false
console.log(1 !== "1"); // => true

// 等価演算子
console.log(1 == 1); // => true
console.log(1 == "1"); // => true
console.log(objA == objB); // => false(===と同じ結果)
// 暗黙的な型変換を行う例 文字列を数値に変換してから比較
console.log(1 == "1"); // => true
// 01を数値にすると1になる
console.log(1 == "01"); // => true
// 真偽値を数値(0)に変換してから比較
console.log(0 == false); // => true
// nullの比較はfalseを返す(??)
console.log(0 == null); // => false
// nullとundefinedの比較は常にtrueを返す(??)
console.log(null == undefined); // => true

/*** == が有効なケース  ***/
const uValue = undefined;
// === では2つの値と比較しないといけない
if (uValue === null || uValue === undefined) {
  console.log("uValue is null or undefined");
}
// == ではnullと比較するだけでよい
if (uValue == null) {
  console.log("uValue is null or undefined");
}

// 不等価演算子
console.log(1 != 1); // => false
console.log(1 != "1"); // => false
console.log("JavaScript" != "ECMAScript"); // => true
console.log("true != true"); // => false
// オブジェクトは参照が一致してないならtrue
console.log(objA != objB); // => true
console.log(objA != objA); // => false
// 暗黙的な型変換
console.log(1 != "1"); // => false
// 01を数値にすると1になる
console.log(1 != "01"); // => false
// 真偽値を数値(0)に変換してから比較
console.log(0 != false); // => false
// nullの比較はtrueを返す(??)
console.log(0 != null); // => true
// nullとundefinedの比較は常にfalseを返す(??)
console.log(null != undefined); // => false

// 大小関係を比較する演算子
console.log(42 > 21); // => true
console.log(42 > 42); // => false
console.log(42 >= 21); // => true
console.log(42 >= 42); // => true
console.log(42 >= 43); // => false
console.log(21 < 42); // => true
console.log(42 < 42); // => false
console.log(21 <= 42); // => true
console.log(42 <= 42); // => true
console.log(43 <= 42); // => false

/* 
ビット演算子
*/
//  オペランドを符号付き32ビット整数に変換してから演算を行う
console.log(0b00000000000000000000000000001001); // => 9
// Number#toStringで2進数に変換
console.log((9).toString(2)); // => 1001
// -9をビッグエンディアンの2の補数形式で表現
console.log(0b11111111111111111111111111110111); // => 4294967287
console.log((-9 >>> 0).toString(2)); // => 11111111111111111111111111110111))
// 論理積(AND)
console.log(15 & 9); // => 9
console.log(0b1111 & 0b1001); // => 0b1001
// 論理和(OR)
console.log(15 | 9); // => 15
console.log(0b1111 | 0b1001); // => 0b1111
// 排他的論理和(XOR)
console.log(15 ^ 9); // => 6
console.log(0b1111 ^ 0b1001); // => 0b0110
/// 否定(NOT)
console.log(~15); // => -16
console.log(~0b1111); // => -16
console.log((-16).toString(2)); // => -10000
const str = "森森本森森";
console.log(str.indexOf("本")); // => 2
console.log(str.indexOf("火")); // => -1
console.log(~0); // => -1
console.log(~-1); // => 0
if (str.indexOf("本") !== -1) {
  // 見つかった場合の処理
  console.log("本が見つかりました");
}
// 否定演算子で同じ動作を実装
// 見つからないと -1が返る→ ~(-1) => 0 => false
if (~str.indexOf("本")) {
  // 見つかった場合の処理
  console.log("本が見つかりました");
}
// ES2015ではArray#includesメソッドで同じ動作を実装
if (str.includes("本")) {
  // 見つかった場合の処理
  console.log("本が見つかりました");
}

// 左シフト <<
console.log(9 << 2); // => 36
console.log(0b1111 << 2); // => 0b111100(60 10進数)
// 右シフト >>
console.log(-9 >> 2); // => -3
//    0b11111111111111111111111111110111 >> 2 => 0b111(-9)
// => 0b11111111111111111111111111111101 => (-3)
// ゼロ埋め右シフト >>>
console.log(-9 >>> 2); // => 1073741821
//    0b11111111111111111111111111110111 >>> 2 => 0b111(-9)
// => 0b00111111111111111111111111111101 => 1073741821
let x = 1;
x = 42;
console.log(x); // => 42
let y = 1;
y += 10;
console.log(y); // => 11

// 分割代入 Destructuring Assignment ES2015
const array = [1, 2];
const [a, b] = array;
console.log(a); // => 1
console.log(b); // => 2
// オブジェクトも分割代入できる
const obj = { key: "value" };
// プロパティ名keyの値を変数keyとして定義できる
const { key } = obj; // const key = obj.key; と同じ意味
// key => "value";
// { key } => { key: "value" } となる。

/* 
三項演算子
*/
function addPrefix(text, prefix) {
  // prefixが指定されていない場合は"デフォルト:"をつける
  const pre = typeof prefix === "string" ? prefix : "デフォルト:";
  return pre + text;
}
console.log(addPrefix("文字列")); // => "デフォルト:文字列"
console.log(addPrefix("文字列", "カスタム")); // => "カスタム文字列"
// if文で書くと宣言と代入を分けて書く必要がある為、constが使えない
function addPrefix2(text, prefix) {
  let pre = "デフォルト:";
  if (typeof prefix === "string") {
    pre = prefix;
  }
  return pre + text;
}
console.log(addPrefix2("文字列")); // => "デフォルト:文字列"
console.log(addPrefix2("文字列", "カスタム")); // => "カスタム文字列"

/*
論理演算子
*/
// AND演算子(&&)
const xx = true;
const yy = false;
console.log(xx && yy); // => true
console.log(yy && xx); // => false xxは評価されない
const value2 = "str";
if (typeof value2 === "string" && value === "str") {
  console.log(`${value} is string value`);
}
// if文でネストで書いた場合と結果は同じになる
if (typeof value2 === "string") {
  if (value2 === "str") {
    console.log(`${value} is string value`);
  }
}
// OR演算子(||)
const xxx = true;
const yyy = false;
console.log(xxx || yyy); // => true
console.log(yyy || xxx); // => true yyyはfalseなのでxxxが評価される
const value3 = 1;
if (value3 === 0 || value3 === 1) {
  console.log("value は 0 または 1 です");
}
// NOT演算子(!)
console.log(!false); // => true
console.log(!true); // => false
const str0 = "";
// 空文字列はfalse→!で否定してtrue→!!でさらに否定してfalse
console.log(!!str0); // 文字列を真偽値に変換 => false
// もっと自然な方法に置き換える事を検討する
console.log(str0.length > 0); // => false
// グループ演算子 ( )
const A = 1;
const B = 2;
const C = 3;
console.log(A + B * C); // => 7
console.log((A + B) * C); // => 9
// カンマ演算子(,)
const aa = 1,
  bb = 2,
  cc = aa + bb;
console.log(cc); // => 3

// indirect callというものもある
// <https://2ality.com/2014/01/eval.html>
