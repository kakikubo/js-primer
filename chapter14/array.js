// 配列の作成とアクセス
{
  const emptyArray = [];
  const numbers = [1, 2, 3];
  // 2次元配列(配列の配列)
  const matrix = [
    ["a", "b"],
    ["c", "d"],
  ];
  // 配列の要素へのアクセス
  const array = ["one", "two", "three"];
  console.log(array[0]); // "one"
  // 2次元配列へのアクセス
  console.log(matrix[0][0]); // "a"
  // 配列の要素数 -1 が最後の要素のインデックス
  console.log(array[array.length - 1]); // "three"
  console.log(array.length); // 3
  // 存在しない要素にアクセスするとundefined
  console.log(array[100]); // undefined
}
// 以下のようなオブジェクトと同じこと
{
  const obj = {
    0: "one",
    1: "two",
    2: "three",
    length: 3,
  };
  // 配列のようにアクセスできる
  console.log(obj[0]); // "one"
  console.log(obj[100]); // "undefined"
}
// 未定義の箇所が1つ含まれる「疎な配列」(逆は⇔「密な配列」)
// インデックスが1の値を省略しているので、カンマが2つ続いていることに注意
{
  const sparseArray = [1, , 3];
  console.log(sparseArray.length); // 3
  // 1番目の要素は存在しないため　undefined
  console.log(sparseArray[1]); // undefined
}
// オブジェクトが配列かどうかを判定する
{
  const obj = {};
  const array = [];
  console.log(Array.isArray(obj)); // false
  console.log(Array.isArray(array)); // true
  // typeof演算子では判定できない(Arrayもオブジェクトの一種であるため)
  console.log(typeof obj === "object"); // true
}
// TypedArray (ES2015)
{
  // TypedArrayを作成
  const typedArray = new Int8Array(8);
  console.log(Array.isArray(typedArray)); // false
  console.log(typeof typedArray); // "object"
}
// 配列と分割代入(ES2015)
{
  const array = ["one", "two", "three"];
  // 分割代入
  const [first, second, third] = array;
  console.log(first); // "one"
  console.log(second); // "two"
  console.log(third); // "three"
}
// 普通に区別できない、疎な配列とundefinedを持つ配列の見分け方
{
  // 要素としてundefinedを持つ密な配列
  const denseArray = [1, undefined, 3];
  // 要素そのものがない疎な配列
  const sparseArray = [1, , 3];
  console.log(denseArray[1]); // undefined
  console.log(sparseArray[1]); // undefined
  // 要素自体に値があるかどうかを判定する
  console.log(denseArray.hasOwnProperty(1)); // true
  console.log(sparseArray.hasOwnProperty(1)); // false
}

// 配列から要素を検索(インデックスを取得)
{
  const array = ["Java", "JavaScript", "Ruby"];
  const indexOfJS = array.indexOf("JavaScript");
  console.log(indexOfJS); // 1
  console.log(array[indexOfJS]); // "JavaScript"
  // 存在しない場合は-1
  console.log(array.indexOf("JS")); // -1
}
{
  // Array#indexOfだとobjectをおもったように検索できない例
  const obj = { key: "value" };
  const array = ["A", "B", obj];
  console.log(array.indexOf({ key: "value" })); // -1
  // リテラルは新しいオブジェクトを作るため、異なるオブジェクトだと判定される
  console.log(obj === { key: "value" }); // false
  // 等価のオブジェクトを検索してインデックスを返す
  console.log(array.indexOf(obj)); // 2
}
{
  // Array#findIndex(ES2015) ならできる
  const colors = [{ color: "red" }, { color: "green" }, { color: "blue" }];
  // colorプロパティが"blue"のオブジェクトのインデックスを取得
  const indexOfBlue = colors.findIndex((obj) => {
    return obj.color === "blue";
  });
  console.log(indexOfBlue); // 2
  console.log(colors[indexOfBlue]); // { "color": "blue" }
}

// 配列から要素を検索(条件に一致する要素を取得)
{
  // Array#find(ES2015)
  const colors = [
    { color: "red" },
    { color: "green" },
    { color: "blue" },
    { color: "green" },
  ];
  // color プロパティが"blue"のオブジェクトを取得
  const blueColor = colors.find((obj) => {
    return obj.color === "blue";
  });
  console.log(blueColor); // { "color": "blue" }
  // 該当する要素がないときはundefinedを返す
  const whiteColor = colors.find((obj) => {
    return obj.color === "white";
  });
  console.log(whiteColor); // undefined
}

// 配列から要素を検索(指定範囲の要素を取得)
{
  const array = ["A", "B", "C", "D", "E"];
  // インデックス1から4の範囲を取り出す
  console.log(array.slice(1, 4)); // ["B", "C", "D"]
  // 第2引数を省略すると末尾まで取り出す
  console.log(array.slice(1)); // ["B", "C", "D", "E"]
  // マイナスを指定すると後ろから数えた位置となる
  console.log(array.slice(-1)); // ["E"]
  // 第一引数 > 第二引数の場合、常に空配列を返す
  console.log(array.slice(2, 1)); // []
  // 存在しないインデックスを指定しても空配列を返す
  console.log(array.slice(5, 6)); // []
}
// 配列から要素を検索(真偽値を取得)
{
  // indexOfJSでは機能的には過剰で、意図も不明確
  const array = ["Java", "JavaScript", "Ruby"];
  // indexOfメソッドは含まれていない時のみ-1を返すことを利用
  const indexOfJS = array.indexOf("JavaScript");
  if (indexOfJS !== -1) {
    console.log("配列にJavaScriptが含まれている");
    // …いろいろな処理…
    // `indexOfJS`は「含まれているのか」の判定以外には利用していない
  }
  // Array#includes(ES2016)を使うと、よりシンプルに書ける
  if (array.includes("JavaScript")) {
    console.log("配列にJavaScriptが含まれている");
    // …いろいろな処理…
  }
  // Array#someをつかえば「異なるオブジェクトだが値が同じもの」を取得する場合にも対応できる
  // colorsプロパティを持つオブジェクトの配列
  const colors = [{ color: "red" }, { color: "green" }, { color: "blue" }];
  // colorプロパティが"blue"のオブジェクトがあるかどうか
  const isIncludedBlueColor = colors.some((obj) => {
    return obj.color === "blue";
  });
  console.log(isIncludedBlueColor); // true
}

// 配列への追加と削除
{
  const array = ["A", "B", "C"];
  array.push("D");
  console.log(array); // ["A", "B", "C", "D"]
  const poppedItem = array.pop(); // 末尾の要素を削除して取り出す
  console.log(poppedItem); // "D"
  console.log(array); // ["A", "B", "C"]
}
{
  const array = ["A", "B", "C"];
  array.unshift("S"); // 先頭に要素を追加
  console.log(array); // ["S", "A", "B", "C"]
  const shiftedItem = array.shift(); // 先頭の要素を削除して取り出す
  console.log(shiftedItem); // "S"
  console.log(array); // ["A", "B", "C"]
}

// 配列同士の結合 Array#concat
{
  const array = ["A", "B", "C"];
  const newArray = array.concat(["D", "E"]);
  console.log(newArray); // ["A", "B", "C", "D", "E"]
  // 任意の要素を結合できる
  const newArray2 = array.concat(100, ["F", "G"]);
  console.log(newArray2); // ["A", "B", "C", 100, "F", "G"]
}

// 配列の展開(ES2015)
{
  const array = ["A", "B", "C"];
  // Spread構文を使った場合
  const newArray = ["X", "Y", "Z", ...array];
  // concatメソッドの場合
  const newArrayConcat = ["X", "Y", "Z"].concat(array);
  console.log(newArray); // ["X", "Y", "Z", "A", "B", "C"]
  console.log(newArrayConcat); // ["X", "Y", "Z", "A", "B", "C"]
}
{
  // concatと違って、任意の位置に展開できる
  const array = ["A", "B", "C"];
  const newArray = ["X", ...array, "Y", "Z"];
  console.log(newArray); // ["X", "A", "B", "C", "Y", "Z"]
}

// 配列をフラット化 Array#flat (ES2019)
{
  const array = [[["A"], "B"], "C"];
  // 引数なしは1階層のみフラット化
  console.log(array.flat()); // [["A"], "B", "C"]
  console.log(array.flat(1)); // [["A"], "B", "C"]
  console.log(array.flat(2)); // ["A", "B", "C"]
  // すべてをフラット化するにはInfinityを指定する
  console.log(array.flat(Infinity)); // ["A", "B", "C"]
}
{
  const array = ["A", "B", "C"];
  // これ以上フラット化できない配列をフラット化しても、同じ要素を持つ新しい配列を返します。
  console.log(array.flat()); // ["A", "B", "C"]
}

// 配列から要素を削除

// Array#splice
{
  const array = ["a", "b", "c"];
  // 1番目から1つの要素("b")を削除
  array.splice(1, 1);
  console.log(array); // ["a", "c"]
  console.log(array.length); // 2
  console.log(array[1]); // "c"
  // すべて削除
  array.splice(0, array.length);
  console.log(array.length); // 0
}
{
  // lengthプロパティを使っても同じことができる
  const array = ["a", "b", "c"];
  array.length = 0; // 配列を空にする
  console.log(array); // []
}
{
  // 空の配列を代入
  let array = [1, 2, 3];
  console.log(array.length); // 3
  // 新しい配列で変数を上書き
  array = [];
  console.log(array.length); // 0
}

// 破壊的なメソッドと非破壊的なメソッド
{
  // Array#pushは破壊的なメソッド
  const myArray = ["A", "B", "C"];
  const result = myArray.push("D");
  // pushの返り値は配列ではなく、追加後の配列のlength
  console.log(result); // 4
  // myArrayが参照する配列そのものが変更されている
  console.log(myArray); // ["A", "B", "C", "D"]
}
{
  // Array#concatは非破壊的なメソッド
  const myArray = ["A", "B", "C"];
  // concatの返り値は結合済みのあたらしい配列
  const newArray = myArray.concat("D");
  console.log(newArray); // ["A", "B", "C", "D"]
  // myArrayは変更されていない
  console.log(myArray); // ["A", "B", "C"]
  // newArrayとmyArrayは異なる配列
  console.log(myArray === newArray); // false
}

// 破壊的メソッドを利用する場合はコメントにも残しておく方がベター
{
  // arrayのindex番目の要素を削除した配列を返す関数
  // 引数のarrayは破壊的に変更される
  function removeAtIndex(array, index) {
    array.splice(index, 1);
    return array;
  }
  const array = ["A", "B", "C"];
  // arrayから1番目の要素を削除した配列を取得
  const newArray = removeAtIndex(array, 1);
  console.log(newArray); // ["A", "C"]
  // array自体にも影響を与える
  console.log(array); // ["A", "C"]
}
// 配列をコピーすると参照先がことなる
{
  const myArray = ["A", "B", "C"];
  // sliceはmyArrayのコピーを返す - myArray.concat()でも同じ
  const copiedArray = myArray.slice();
  myArray.push("D");
  console.log(myArray); // ["A", "B", "C", "D"]
  // arrayのコピーであるcopiedArrayには影響がない
  console.log(copiedArray); // ["A", "B", "C"]
  // コピーであるため参照はことなる
  console.log(myArray === copiedArray); // false
}
// 非破壊的にするには配列をコピーしてからspliceを使う
{
  // arrayのindex番目の要素を削除した配列を返す関数
  function removeAtIndex(array, index) {
    // 配列をコピーしてからspliceを使う
    const copiedArray = array.slice();
    copiedArray.splice(index, 1);
    return copiedArray;
  }
  const array = ["A", "B", "C"];
  // arrayから1番目の要素を削除した配列を取得
  const newArray = removeAtIndex(array, 1);
  console.log(newArray); // ["A", "C"]
  // array自体には影響を与えない
  console.log(array); // ["A", "B", "C"]
}
// 非破壊的な配列を扱うモジュールには次のようなものがある
// - Immutable.js
// - immultable-array-prototype

/*
配列を反復処理するメソッド
*/
// Array#forEach
{
  const array = ["A", "B", "C"];
  array.forEach((currentValue, index, array) => {
    console.log(currentValue, index, array);
  });
  // A 0 ["A", "B", "C"]
  // B 1 ["A", "B", "C"]
  // C 2 ["A", "B", "C"]
}
// Array#map
{
  const array = [1, 2, 3];
  // 各要素に10を乗算した新しい配列を作成する
  const newArray = array.map((currentValue, index, array) => {
    return currentValue * 10;
  });
  console.log(newArray); // [10, 20, 30]
  // 元の配列とは異なるインスタンス
  console.log(array === newArray); // false
}
// Array#filter
{
  const array = [1, 2, 3];
  // 奇数の値を持つ要素だけを集めた配列を返す
  const newArray = array.filter((currentValue, index, array) => {
    return currentValue % 2 === 1;
  });
  console.log(newArray); // [1, 3]
  // 元の配列とは異なるインスタンス
  console.log(array === newArray); // false
}
// Array#reduce
{
  const array = [1, 2, 3];
  // すべての要素を加算した値を返す
  const totalValue = array.reduce((accumulator, currentValue, index, array) => {
    return accumulator + currentValue;
  }, 0);
  console.log(totalValue); // 6
}

// Array-likeオブジェクト
// ex. argumentsオブジェクト
{
  function myFunc() {
    console.log(arguments[0]); // "a"
    console.log(arguments[1]); // "b"
    console.log(arguments[2]); // "c"
    // 配列ではない為、配列のメソッドは持っていない
    console.log(typeof arguments.forEach); // "undefined"

    // Array#from (ES2015) を使う事で配列に変換できる
    const argumentsArray = Array.from(arguments);
    console.log(Array.isArray(argumentsArray)); // true
    // 配列のメソッドが使えるようになる
    argumentsArray.forEach((arg) => {
      console.log(arg);
    });
  }
  myFunc("a", "b", "c");
}

// メソッドチェーンと高階関数
{
  const array = ["a"].concat("b").concat("c");
  console.log(array); // ["a", "b", "c"]

  // メソッドチェーンを分解した例
  // 一時的な abArray という変数が増えている
  const abArray = ["a"].concat("b");
  console.log(abArray); // ["a", "b"]
  const abcArray = abArray.concat("c");
  console.log(abcArray); // ["a", "b", "c"]
}
// ECMAScriptのバージョン名と発行年
{
  const ECMAScriptVersions = [
    { name: "ECMAScript 1", year: 1997 },
    { name: "ECMAScript 2", year: 1998 },
    { name: "ECMAScript 3", year: 1999 },
    { name: "ECMAScript 5", year: 2009 },
    { name: "ECMAScript 5.1", year: 2011 },
    { name: "ECMAScript 2015", year: 2015 },
    { name: "ECMAScript 2016", year: 2016 },
    { name: "ECMAScript 2017", year: 2017 },
  ];
  // メソッドチェーンで必要な加工処理を並べている
  const versionNames = ECMAScriptVersions
    // 2000年以下のデータに絞り込み
    .filter((ECMAScript) => ECMAScript.year <= 2000)
    // それぞれの要素からnameプロパティを取り出す
    .map((ECMAScript) => ECMAScript.name);
  console.log(versionNames); // ["ECMAScript 1", "ECMAScript 2", "ECMAScript 3"]
}
