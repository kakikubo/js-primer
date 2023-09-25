{
  const double = "文字列";
  console.log(double);
  const single = "文字列";
  console.log(single);
  // どちらも同じ文字列
  console.log(double === single);
}
// テンプレートリテラル (ES2015)
{
  const multiline = `1行目
2行目
3行目`;
  // \nは改行を意味する
  console.log(multiline);
}
{
  const str = 'This book is "js-primer"';
  console.log(str); // => This book is "js-primer"
}
// エスケープシーケンス
{
  // 以下だとエラーになる
  // const invalidString = "1行目
  // 2行目
  // 3行目";
  const multiline = "1行目\n2行目\n3行目";
  console.log(multiline);
}
{
  //   console.log("¯\_(ツ)_/¯");
  // => ¯_(ツ)_/¯ と表示される。prettierだかeslintだかがバックスラッシュを削除してしまうので、コメントアウトして保存
}

// 文字列を結合する
{
  const str = "a" + "b";
  console.log(str); // => ab
}
{
  const name = "JavaScript";
  console.log("Hello " + name + "!"); // => Hello JavaScript!
}
{
  // テンプレートリテラルを用いると宣言的にかける
  const name = "JavaScript";
  console.log(`Hello ${name}!`); // => Hello JavaScript!
}

// 文字へのアクセス
{
  const str = "文字列";
  // 配列と同じようにインデックスでアクセスできる
  console.log(str[0]); // => 文
  console.log(str[1]); // => 字
  console.log(str[2]); // => 列
  console.log(str[42]); // => undefined
}

// String.prototype.at (ES2022)
{
  const str = "文字列";
  console.log(str.at(0)); // => 文
  console.log(str.at(1)); // => 字
  console.log(str.at(2)); // => 列
  console.log(str.at(-1)); // => 列
}
// JavaScriptの文字列の各要素はUTF-16のCode Unitで構成されている
{
  const str = "アオイ";
  // それぞれの文字をCode Unitのhex値(16進数)に変換する
  // toStringの引数に16を渡すと16進数に変換される
  console.log(str.charCodeAt(0).toString(16)); // => 30a2
  console.log(str.charCodeAt(1).toString(16)); // => 30aa
  console.log(str.charCodeAt(2).toString(16)); // => 30a4
}
{
  // Code Unitをhex値(16進数)から文字へと変換する
  const str = String.fromCharCode(
    0x30a2, //  アのCode Unit
    0x30aa, // オのCode Unit
    0x30a4 // イのCode Unit
  );
  console.log(str); // => アオイ
}

// 文字列の分割と結合
{
  // 分割
  const strings = "赤・青・緑".split("・");
  console.log(strings); // => ["赤", "青", "緑"]
}
{
  // 分割して結合
  const strings = "赤・青・緑".split("・").join("、");
  console.log(strings); // => 赤、青、緑
}
{
  // splitには正規表現も渡せる
  const str = "a      b   c d";
  // 1つ以上のスペースにマッチして分解する
  const strings = str.split(/\s+/);
  console.log(strings); // => ["a", "b", "c", "d"]
}

// 文字列の長さ

// code unitの個数を返す
console.log("文字列".length); // => 3
console.log("".length); // => 0

// * 文字列の比較
// 次の条件を満たす必要がある
// 1. 文字列の要素であるCode Unitが同じ順番で並んでいるか
// 2. 文字列の長さ(length)が同じか
console.log("文字列" === "文字列"); // => true

// 一致しなければfalseとなる
console.log("JS" === "ES"); // => false

// 文字列の長さが異なるのでfalseとなる
console.log("文字列" === "文字"); // => false

// "A"と”B"のCode Unitは65と66
console.log("A".charCodeAt(0)); // => 65
console.log("B".charCodeAt(0)); // => 66

// "A"(65)は"B"(66)よりもCode Unitの値が小さい
console.log("A" > "B"); // => false

// 先頭から順番に比較し C > D がfalseであるため
console.log("ABC" > "ABD"); // => false

// 文字列の一部を取得(slice)
{
  // 配列のsliceと使い方は同じ
  const str = "ABCDE";
  console.log(str.slice(1)); // => BCDE
  console.log(str.slice(1, 5)); // => BCDE

  // マイナスを指定すると後ろからの位置となる
  console.log(str.slice(-1)); // => E

  // インデックスが1から4の範囲を取り出す
  console.log(str.slice(1, 4)); // => BCD

  // 第1引数 > 第2引数の場合、常に空文字列が返る
  console.log(str.slice(4, 1)); // => ""
}
// substring
{
  // 配列のsliceと使い方は **ほぼ** 同じ
  const str = "ABCDE";
  console.log(str.substring(1)); // => BCDE
  console.log(str.substring(1, 5)); // => BCDE

  // 位置にマイナスを指定すると0として扱われる(!!)
  console.log(str.substring(-1)); // => ABCDE

  // 位置:1から4の範囲を取り出す
  console.log(str.substring(1, 4)); // => BCD

  // 第1引数 > 第2引数の場合、引数が入れ替わる(!!)
  console.log(str.substring(4, 1)); // => BCD
}
{
  // sliceの利用例
  const url = "https://example.com?param=1";
  const indexOfQuery = url.indexOf("?");
  const queryString = url.slice(indexOfQuery);
  console.log(queryString); // => ?param=1
}
