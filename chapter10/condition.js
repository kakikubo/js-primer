/*
 * 条件分岐
 * if (条件式) {
 *     実行する文;
 * }
 */
// falsyな値以外はすべてtruthyな値
if (true) {
  console.log("この行は実行されます");
}
if ("文字列") {
  console.log("この行は実行されます");
}
if (42) {
  console.log("この行は実行されます");
}
if (["配列"]) {
  console.log("この行は実行されます");
}
if ([]) {
  console.log("この行は実行されます");
}
/*
 * falsyな値

   * false
   * undefined
   * null
   * 0
   * NaN
   * ""(空文字)
 */
if ({ name: "オブジェクト" }) {
  console.log("この行は実行されます");
}
if (false) {
  console.log("この行は実行されません");
}
if ("") {
  console.log("この行は実行されません");
}
if (0) {
  console.log("この行は実行されません");
}
if (undefined) {
  console.log("この行は実行されません");
}
if (null) {
  console.log("この行は実行されません");
}
// else if文
const version = "ES6";
if (version === "ES5") {
  console.log("ECMAScript 5");
} else if (version === "ES6") {
  console.log("ECMAScript 2015");
} else if (version === "ES7") {
  console.log("ECMAScript 2016");
}
// else文
const num = 1;
if (num > 10) {
  console.log(`numは10より大きいです ${num}`);
} else {
  console.log(`numは10以下です ${num}`);
}
/*
うるう年の判定

* 西暦で示した年が4で割り切れる年はうるう年
* ただし、100で割り切れる年はうるう年ではない
* ただし、400で割り切れる年はうるう年
*/
const year = new Date().getFullYear();
function printLeapYearNest(year) {
  // 4で割り切れる
  if (year % 4 === 0) {
    // 100で割り切れる
    if (year % 100 === 0) {
      // 400で割り切れる
      if (year % 400 === 0) {
        console.log(`${year}年はうるう年です`);
      } else {
        console.log(`${year}年はうるう年ではありません`);
      }
    } else {
      console.log(`${year}年はうるう年です`);
    }
  } else {
    console.log(`${year}年はうるう年ではありません`);
  }
}
printLeapYearNest(year);
printLeapYearNest(2024);
printLeapYearNest(2000);
printLeapYearNest(1900);
// ネストが少ない方が見やすい
function printLeapYear(year) {
  if (year % 400 === 0) {
    console.log(`${year}年はうるう年です`);
  } else if (year % 100 === 0) {
    console.log(`${year}年はうるう年ではありません`);
  } else if (year % 4 === 0) {
    console.log(`${year}年はうるう年です`);
  } else {
    console.log(`${year}年はうるう年ではありません`);
  }
}
printLeapYear(year);
printLeapYear(2024);
printLeapYear(2000);
printLeapYear(1900);
// switch文
//   versionと"ES5"などのラベルを厳密等価演算子(===)で比較する
{
  const version = "ES6";
  switch (version) {
    case "ES5":
      console.log("ECMAScript 5");
      break;
    case "ES6":
      console.log("ECMAScript 2015");
      break;
    case "ES7":
      console.log("ECMAScript 2016");
      break;
    default:
      console.log("しらないバージョンです");
  }
}
// break文
//   break文がないと、次のcase文が実行される
{
  const version = "ES6";
  switch (version) {
    case "ES5":
      console.log("no break ECMAScript 5");
    case "ES6":
      console.log("no break ECMAScript 2015");
    case "ES7":
      console.log("no break ECMAScript 2016");
    default:
      console.log("no break しらないバージョンです");
  }
}
function getECMAScriptName(version) {
  switch (version) {
    case "ES5":
      return "ECMAScript 5";
    case "ES6":
      return "ECMAScript 2015";
    case "ES7":
      return "ECMAScript 2016";
    default:
      return "しらないバージョンです";
  }
}
console.log(getECMAScriptName("ES5")); // "ECMAScript 5"
console.log(getECMAScriptName("ES6")); // "ECMAScript 2015"
console.log(getECMAScriptName("ES7")); // "ECMAScript 2016"
