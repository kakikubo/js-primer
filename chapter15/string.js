"use strict";
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

// 文字列の検索(マッチした箇所のインデックスを取得)
{
  // 検索対象となる文字列
  const str = "にわにはにわにわとりがいる";
  // indexOfは先頭から検索しインデックスを返す - "**にわ**にはにわにわとりがいる"
  // "にわ"の先頭のインデックスを返すため 0 が返る
  console.log(str.indexOf("にわ")); // => 0

  // lastIndexOfは末尾から検索しインデックスを返す - "にわにはにわ**にわ**とりがいる
  console.log(str.lastIndexOf("にわ")); // => 6

  // 指定した文字列が見つからない場合は -1 が返る
  console.log(str.indexOf("未知のキーワード")); // => -1
}
// 文字列の検索(文字列にマッチした文字列の取得)
{
  const str = "JavaScript";
  const searchWord = "Script";
  const index = str.indexOf(searchWord);
  if (index !== -1) {
    // 見つかった場合は該当文字列を出力する
    console.log(`${searchWord}が見つかりました`);
  } else {
    console.log(`${searchWord}は見つかりませんでした`);
  }
}
// 真偽値の取得 (ES2015)
{
  const str = "にわにはにわにわとりがいる";
  // startWith - 検索文字列が先頭ならtrue
  console.log(str.startsWith("にわ")); // => true
  console.log(str.startsWith("いる")); // => false

  // endsWith - 検索文字列が末尾ならtrue
  console.log(str.endsWith("にわ")); // => false
  console.log(str.endsWith("いる")); // => true

  // includes - 検索文字列が含まれているならtrue
  console.log(str.includes("にわ")); // => true
  console.log(str.includes("いる")); // => true
}

// 正規表現オブジェクト
{
  // 正規表現リテラルで正規表現オブジェクトを作成
  const patternA = /a+/g;
  // `RegExp`コンストラクタで正規表現オブジェクトを作成
  const patternB = new RegExp("a+", "g");
}
{
  // 3つの連続するスペースなどにマッチする正規表現
  const pattern = /\s{3}/; // 3つの連続するスペースにマッチする

  // 動的に正規表現を構築する場合はRegExpコンストラクタを使う
  const spaceCount = 3;
  // `/\s{3}/`の正規表現を文字列から作成する
  // "\"がエスケープ文字であるため、"\"自身を文字列として書くには"\\"のように2つ書く
  const patternS = new RegExp(`\\s{${spaceCount}}`);
}

/*
 * 正規表現による検索
 */
// 正規表現によるインデックスの取得
{
  const str = "ABC123EFG";
  const searchPattern = /\d{3}/;
  console.log(str.search(searchPattern)); // => 3
}
{
  // searchでは「マッチした文字列の長さ」がわからない
  const str = "abc123def";
  // 連続した数字にマッチする正規表現
  const searchPattern = /\d+/;
  const index = str.search(searchPattern);
  // `index`だけではマッチした文字列の長さがわからない
  // str.slice(index, index + マッチした文字列の長さ); // マッチした文字列は取得できない
}
{
  // matchメソッドを使う。マッチする文字列がない場合はnullが返る
  console.log("文字列".match(/マッチしないパターン/)); // => null
}
{
  const str = "ABC あいう DE えお";
  // 連続した非アルファベットにマッチする正規表現
  const pattern = /[^A-Za-z]+/;
  console.log(str.match(pattern)); // => [" あいう DE えお"]
}
{
  const str = "ABC あいう DE えお";
  // 連続した非アルファベットにマッチする正規表現
  const pattern = /[^A-Za-z]+/;
  // gフラグを付与するとマッチした文字列全てを含む配列が返る
  console.log(str.match(pattern)); // => [" あいう ", " えお"]
}
{
  const str = "ABC あいう DE えお";
  // 連続した非アルファベットにマッチする正規表現
  const pattern = /[^A-Za-z]+/;
  // gフラグを付与するとマッチした文字列全てを含む配列が返る
  console.log(str.match(pattern)); // => [" あいう ", " えお"]
}
{
  const str = "ABC あいう DE えお";
  // 連続した非アルファベットにマッチする正規表現
  const pattern = /[^A-Za-z]+/g;
  // gフラグを付与するとマッチした文字列全てを含む配列が返る
  console.log(str.match(pattern)); // => [" あいう ", " えお"]
}
{
  const str = "ABC あいう DE えお";
  const alphabetPattern = /[a-zA-Z]+/;
  // gフラグなしでは、最初の結果のみを含んだ特殊な配列を返す
  const results = str.match(alphabetPattern);
  console.log(results.length); // => 1
  // マッチした文字列はインデックスでアクセスできる
  console.log(results[0]); // => "ABC
  // マッチした文字列の先頭のインデックス
  console.log(results.index); // => 0
  // 検索対象となった文字列全体
  console.log(results.input); // => "ABC あいう DE えお"
}
{
  // gフラグありでは、マッチした文字列全てを含む配列が返る
  const str = "ABC あいう DE えお";
  const alphabetPattern = /[a-zA-Z]+/g;
  const resultsWithG = str.match(alphabetPattern);
  console.log(resultsWithG.length); // => 2
  console.log(resultsWithG[0]); // => "ABC"
  console.log(resultsWithG[1]); // => "DE"
  console.log(resultsWithG.index); // => undefined
  console.log(resultsWithG.input); // => undefined
  /*
   * マッチメソッドのまとめ
   * - マッチしない場合は、nullを返す
   * - マッチした場合は、マッチした文字列を含んだ特殊な配列を返す
   * - 正規表現のgフラグがある場合は、マッチしたすべての結果を含んだただの配列を返す
   */
}
{
  // matchAll(ES2020) gフラグが必須となる
  const str = "ABC あいう DE えお";
  const alphabetPattern = /[a-zA-Z]+/g;
  // matchAllはIteratorを返す
  const matchesIterator = str.matchAll(alphabetPattern);
  for (const match of matchesIterator) {
    // マッチした要素ごとの情報を含んでいる
    console.log(
      `match: "${match[0]}", index: ${match.index}, input: "${match.input}"`
    );
  }
  // match: "ABC", index: 0, input: "ABC あいう DE えお"
  // match: "DE", index: 8, input: "ABC あいう DE えお"
}
{
  // matchやmatchAllをつかったキャプチャ
  // "ECMAScript (数字+)"にマッチするが、ほしい文字列は数字の部分のみ
  const pattern = /ECMAScript (\d+)/;
  // 返り値は0番目がマッチした全体、1番目がキャプチャの1番目というように対応している
  // [マッチした全部の文字列, キャプチャの1番目, キャプチャの2番目, ...]
  const [all, capture1] = "ECMAScript 6".match(pattern);
  console.log(all); // => ECMAScript 6
  console.log(capture1); // => 6
}
{
  // "ES(数字+)"にマッチするが、ほしい文字列は数字の部分のみ
  const pattern = /ES(\d+)/g;
  // iteratorを返す
  const matchesIterator = "ES2015,ES2016,ES2017".matchAll(pattern);
  for (const match of matchesIterator) {
    // マッチした要素ごとの情報を含んでいる
    // 0番目はマッチした文字列全体、1番目がキャプチャの1番目である数字
    console.log(
      `match: ${match[0]}, capture1: ${match[1]}, index: ${match.index}, input: ${match.input}`
    );
  }
  // match: ES2015, capture1: 2015, index: 0, input: ES2015,ES2016,ES2017
  // match: ES2016, capture1: 2016, index: 7, input: ES2015,ES2016,ES2017
  // match: ES2017, capture1: 2017, index: 14, input: ES2015,ES2016,ES2017
}

// [コラム] RegExp.prototype.execでのString.prototype.matchAll
{
  const str = "ABC あいう DE えお";
  const alphabetsPattern = /[a-zA-Z]+/;
  // gフラグなしでは、最初の結果のみを持つ配列を返す
  const results = alphabetsPattern.exec(str);
  console.log(results.length); // => 1
  console.log(results[0]); // => "ABC"
  // マッチした文字列の先頭のインデックス
  console.log(results.index); // => 0
  // 検索対象となった文字列全体
  console.log(results.input); // => "ABC あいう DE えお"
}
{
  // 上記のgフラグありのパターン
  const str = "ABC あいう DE えお";
  const alphabetsPattern = /[a-zA-Z]+/g;
  // まだ一度も検索していないので、lastIndexは0となり先頭から検索が開始される
  console.log(alphabetsPattern.lastIndex); // => 0
  // gフラグありでも、一回目の結果は同じだが、`lastIndex`プロパティが更新される
  const result1 = alphabetsPattern.exec(str);
  console.log(result1[0]); // => "ABC"
  console.log(alphabetsPattern.lastIndex); // => 3
  // 2回目の検索が、`lastIndex`の値のインデックスから開始される
  const result2 = alphabetsPattern.exec(str);
  console.log(result2[0]); // => "DE"
  console.log(alphabetsPattern.lastIndex); // => 10
  // 検索結果が見つからない場合はnullを返し、`lastIndex`プロパティは0にリセットされる
  const result3 = alphabetsPattern.exec(str);
  console.log(result3); // => null
  console.log(alphabetsPattern.lastIndex); // => 0
}
{
  const str = "ABC あいう DE えお";
  const alphabetsPattern = /[a-zA-Z]+/g;
  let matches;
  while ((matches = alphabetsPattern.exec(str))) {
    // RegExpの`exec`メソッドの返り値は`index`プロパティなどを含む特殊な配列
    console.log(
      `match: ${matches[0]}, index: ${matches.index}, lastIndex: ${alphabetsPattern.lastIndex}`
    );
  }
  // 次の順番でコンソールに出力される
  // match: ABC, index: 0, lastIndex: 3
  // match: DE, index: 8, lastIndex: 10
}

// 真偽値の取得 パターンにマッチするかどうかを返す
{
  // 検索対象となる文字列
  const str = "にわにはにわにわとりがいる";
  // ^ - 検索文字列が先頭ならtrue
  console.log(/^にわ/.test(str)); // => true
  console.log(/^いる/.test(str)); // => false
  // $ - 検索文字列が末尾ならtrue
  console.log(/にわ$/.test(str)); // => false
  console.log(/いる$/.test(str)); // => true
  // 検索文字列が含まれるならtrue
  console.log(/にわ/.test(str)); // => true
  console.log(/いる/.test(str)); // => true
}

// 正規表現だと分かりづらいけど、Stringメソッドで書くとわかりやすい例
{
  const str = "/正規表現のような文字列/";
  // 正規表現で`/`からはじまり`/`で終わる文字列のパターン
  const regExpLikePattern = /^\/.*\/$/;
  // RegExpの`test`メソッドでパターンにマッチするかを判定
  console.log(regExpLikePattern.test(str)); // => true
  // Stringメソッドで、`/`からはじまり`/`で終わる文字列かを判定する関数
  const isRegExpLikeString = (str) => {
    return str.startsWith("/") && str.endsWith("/");
  };
  console.log(isRegExpLikeString(str)); // => true
}

// 文字列に対して delete演算子は使えない
{
  const str = "文字列";
  // delete str[0]; => Uncaught TypeError: Cannot delete property '0' of string '文字列'
  const newStr = str.replace("文字", ""); // replaceを使うことで文字列から文字を削除した新しい文字列を生成
  console.log(newStr); // => 列
}
// replaceメソッドは正規表現も指定できる
{
  // 検索対象となる文字列
  const str = "にわにはにわにわとりがいる";
  // 文字列を指定した場合は、最初に一致したものだけが置換される
  console.log(str.replace("にわ", "niwa")); // => "niwaにはにわにわとりがいる"
  // `g`フラグなし正規表現の場合は、最初に一致したものだけが置換される
  console.log(str.replace(/にわ/, "niwa")); // => "niwaにはにわにわとりがいる"
  // `g`フラグあり正規表現の場合は、繰り返し置換を行う
  console.log(str.replace(/にわ/g, "niwa")); // => "niwaにはniwaniwaとりがいる"
}
{
  // replaceAll(ES2021)
  // 検索対象となる文字列
  const str = "???";
  // replaceメソッドに文字列を指定した場合は、最初に一致したものだけが置換される
  console.log(str.replace("?", "!")); // => "!??"
  // replaceAllメソッドに文字列を指定した場合は、一致したものがすべて置換される
  console.log(str.replaceAll("?", "!")); // => "!!!"
  // replaceメソッドの場合は、正規表現の特殊文字はエスケープが必要となる
  console.log(str.replace(/\?/g, "!")); // => "!!!"
  // replaceAllメソッドにも正規表現を渡せるが、この場合はエスケープが必要となるためreplaceと同じ
  console.log(str.replaceAll(/\?/g, "!")); // => "!!!"
}

{
  function toDateJa(dateString) {
    // パターンにマッチしたときのみ、コールバック関数で置換処理が行われる
    return dateString.replace(
      /(\d{4})-(\d{2})-(\d{2})/g,
      (all, year, month, day) => {
        // `all`には、マッチした文字列全体が入っているが今回は利用しない
        // `all`が次の返す値で置換されるイメージ
        return `${year}年${month}月${day}日`;
      }
    );
  }
  // マッチしない文字列の場合は、そのままの文字列が返る
  console.log(toDateJa("本日ハ晴天ナリ")); // => "本日ハ晴天ナリ"
  // マッチした場合は置換した結果を返す
  console.log(toDateJa("今日は2017-03-01です")); // => "今日は2017年03月01日です"
}

{
  // ベースURLとパスが結合した文字列を返す
  function baseJoin(baseURL, pathname) {
    // 末尾に / がある場合は / を削除してから結合する
    const stripSlashBaseURL = baseURL.replace(/\/$/, "");
    const stripSlashPathname = pathname.replace(/^\//, "");
    return `${stripSlashBaseURL}/${stripSlashPathname}`;
  }
  // baseURLとpathnameにあるリソースを取得する
  function getResource(baseURL, pathname) {
    const url = baseJoin(baseURL, pathname);
    // baseURLの末尾に/があってもなくても同じ結果となる
    console.log(`"${url}"からリソースを取得しました`);
  }
  const baseURL = "https://example.com/resources";
  const pathname = "example.js";
  getResource(baseURL, pathname); // => "https://example.com/resources/example.js"からリソースを取得しました
}

// タグ付きテンプレート関数 (ES2015)
{
  // 通常の関数として呼び出す場合
  function tag(str) {
    // 引数strにはただの文字列が渡ってくる
    console.log(str);
  }
  tag(`template ${0} literal ${1}`); // => "template 0 literal 1"
}
{
  // 関数テンプレートを呼び出す場合
  function tag(strings, ...values) {
    // stringsは文字列のパーツが${}で区切られた配列となる
    console.log(strings); // => ["template ", " literal ", ""]
    // valuesには${}の評価値が順番に入る
    console.log(values); // => [0, 1]
  }
  console.log("test");
  // ()をつけずにテンプレートを呼び出す
  tag`template ${0} literal ${1}`; //=> ["template ", " literal ", ""] [0, 1]
}
{
  console.log("stringRaw");
  // テンプレートを順番どおりに結合した文字列を返すタグ関数
  function stringRaw(strings, ...values) {
    // resultの初期値はstrings[0]の値となる
    return strings.reduce((result, str, i) => {
      console.log(`result=${result}, str=${str}, i=${i} values=${values}`);
      console.log([result, values[i - 1], str]);
      // それぞれループで次のような出力となる
      // 1度目: ["template ", 0, " literarl "]
      // 2度目: ["template 0 literal ", 1, ""]
      return result + values[i - 1] + str;
    });
  }
  // 関数`テンプレートリテラル`という形で呼び出す
  console.log(stringRaw`template ${0} literal ${1}`);
  // => "template 0 literal 1"
  console.log(String.raw`template ${0} literal ${1}`); // String.raw (ES2015)
}

{
  // 変数URLをエスケープするタグ関数
  function escapeURL(strings, ...values) {
    return strings.reduce((result, str, i) => {
      const value = values[i - 1];
      console.log(values);
      console.log(encodeURIComponent(value));
      return result + encodeURIComponent(value) + str;
    });
  }

  const input = "A&B";
  // escapeURLタグ関数を使ったタグ付きテンプレート
  const escapedURL = escapeURL`https://example.com/search?q=${input}&sort=desc`;
  console.log(escapedURL);
}
