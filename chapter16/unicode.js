{
  // 文字列"あ"のCode Pointを取得
  console.log("あ".codePointAt(0)); // => 12354
  // Code Pointが12354の文字を取得する
  console.log(String.fromCodePoint(12354)); // => "あ"
  // 12354を16進数リテラルで表記しても同じ結果
  console.log(String.fromCodePoint(0x3042)); // => "あ"
  // "あ"のCode Pointは12354
  const codePointOfあ = "あ".codePointAt(0);
  // 12354の16進数表現は"3042"
  const hexOfあ = codePointOfあ.toString(16);
  console.log(hexOfあ); // => "3042"
  // Unicodeエスケープで"あ"を表現できる
  console.log("\u{3042}"); // => "あ"
}

// Code Point(符号位置)とCode Unit(符号単位)の違い

// 文字列をCode Unit(16進数)の配列にして返す
function convertCodeUnits(str) {
  const codeUnits = [];
  for (let i = 0; i < str.length; i++) {
    codeUnits.push(str.charCodeAt(i).toString(16));
  }
  return codeUnits;
}
// 文字列を Code Point(16進数)の配列にして返す
function convertCodePoints(str) {
  return Array.from(str).map((char) => {
    return char.codePointAt(0).toString(16);
  });
}

{
  // CodePointとCodeUnitで同じになる例
  const str = "アオイ";
  const codeUnits = convertCodeUnits(str);
  console.log(codeUnits); // => ["30a2", "30aa", "30a4"];
  const codePoints = convertCodePoints(str);
  console.log(codePoints); // => ["30a2", "30aa", "30a4"];
}
{
  // CodePointとCodeUnitで異なる例
  const str = "リンゴ🍎";
  const codeUnits = convertCodeUnits(str);
  console.log(codeUnits); // => ['30ea', '30f3', '30b4', 'd83c', 'df4e']
  const codePoints = convertCodePoints(str);
  console.log(codePoints); // => ['30ea', '30f3', '30b4', '1f34e']
  // JavaScriptでは「文字列がCode Unitの順番にならんだもの」とされている為、5になる
  console.log(str.length); // => 5
}
{
  // 上位サロゲート + 下位サロゲートの組み合わせ
  console.log("\uD867\uDE3D"); // => "𩸽"
  // Code Pointで表現
  console.log("\u{29e3d}"); // => "𩸽"
}
{
  // 上位サロゲート + 下位サロゲート
  console.log("\uD83C\uDF4E"); // => "🍎"
  // Code Pointで表現
  console.log("\u{1F34E}"); // => "🍎"
}
{
  // 内部的にはCode Unitが並んでいるものとして扱われている
  console.log("\uD867\uDE3D"); // => "𩸽"
  // インデックスアクセスもCode Unitごととなる
  console.log("𩸽"[0]); // "\uD867"
  console.log("𩸽"[1]); // "\uDE3D"
  // CodeUnit単位で文字を数える
  console.log("🍎".length); // 2
}

// Code Pointを扱う
{
  // Code Unitとして扱われてしまう
  const [all, fish] = "𩸽のひらき".match(/(.)のひらき/);
  console.log(all); // => "\uDE3Dのひらき"
  console.log(fish); // => "\uDE3D"
}
{
  // Code Pointとして扱うようにするためuオプションをつける
  const [all, fish] = "𩸽のひらき".match(/(.)のひらき/u);
  console.log(all); // => "𩸽のひらき"
  console.log(fish); // => "𩸽"
}
{
  // CodeUnitの個数を返す
  console.log("🍎".length); // => 2
  console.log("\uD83C\uDF4E"); // => "🍎"
  console.log("\uD83C\uDF4E".length); // => 2
}
{
  // CodePointごとの配列にする
  // Array.fromメソッドはIteratorを配列にする
  const codePoints = Array.from("リンゴ🍎");
  console.log(codePoints); // => ['リ', 'ン', 'ゴ', '🍎']
  // CodePointの個数を数える
  console.log(codePoints.length); // => 4
}
{
  // 指定した codePointの個数を数える
  function countOfCodePoints(str, codePoint) {
    return Array.from(str).filter((item) => {
      return item === codePoint;
    }).length;
  }
  console.log(countOfCodePoints("🍎🍇🍎🥕🍒", "🍎")); // => 2
}
{
  // 指定した codePointの個数を数える (for ..of版)
  function countOfCodePoints(str, codePoint) {
    let count = 0;
    for (const item of str) {
      if (item === codePoint) {
        count++;
      }
    }
    return count;
  }
  console.log(countOfCodePoints("🍎🍇🍎🥕🍒", "🍎")); // => 2
}
