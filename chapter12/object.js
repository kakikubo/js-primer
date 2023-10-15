"use strict";
// プロパティを持たない空のオブジェクトを作成
{
  const obj = {};
}
// プロパティを持つオブジェクトを定義する
{
  const obj = {
    // キー: 値
    key: "value",
  };
}
{
  const object = {
    // my-prop: "value" : NG
    "my-prop": "value", // OK
  };
}
// 複数のプロパティ定義
{
  const color = {
    // それぞれのプロパティはカンマで区切る
    red: "赤",
    green: "緑",
    blue: "青",
  };
}
// valueには任意の値を指定できる
{
  const name = "名前";
  // nameというプロパティ名でnameの変数の値に設定したオブジェクト
  const obj = {
    name: name,
  };
  console.log(obj); // {name: "名前"}
}
// ES2015からはプロパティ名と変数名が同じ場合は省略できる
{
  const name = "名前";
  const obj = {
    name,
  };
  console.log(obj); // {name: "名前"}
}
// プロパティを持たない空のオブジェクトを作成
// = Objectからインスタンスオブジェクトを作成
{
  const obj = new Object();
  console.log(obj); // {}
}

// プロパティへのアクセス
{
  const obj = {
    key: "value",
  };
  // ドット記法で参照
  console.log(obj.key); // "value"
  // ブラケット記法で参照
  console.log(obj["key"]); // "value"

  // ドット記法では変数名と同じく識別子の命名規則に従う
  obj.key; // OK
  //   obj.123; // NG
  //   obj.my-prop; // NG
}
{
  // ブラケット記法では[]内に式を書くことができる
  const obj = {
    key: "value",
    123: 456,
    "my-key": "my-value",
  };
  console.log(obj["key"]); // "value"
  console.log(obj[123]); // 456
  console.log(obj["123"]); // これと同じ
  console.log(obj["my-key"]); // "my-value"
}
{
  // ブラケット記法では変数名もつかえる
  const languages = {
    ja: "日本語",
    en: "英語",
  };
  const myLang = "ja";
  console.log(languages[myLang]); // "日本語"
}

// オブジェクトと分割代入
{
  // 通常だとこうなる。冗長
  const languages = {
    ja: "日本語",
    en: "英語",
  };
  const ja = languages.ja;
  const en = languages.en;
  console.log(ja); // "日本語"
  console.log(en); // "英語"
}
// ES2015からは分割代入が使える
{
  const languages = {
    ja: "日本語",
    en: "英語",
  };
  const { ja, en } = languages;
  console.log(ja); // "日本語"
  console.log(en); // "英語"
}
// オブジェクトはMutable(変更可能)
{
  const obj = {};
  // keyプロパティを追加して値を代入
  obj.key = "value";
  console.log(obj.key); // "value"
}
// 変数や変数の識別子として扱えない文字列、Symbolなどはブラケット記法でアクセスする
{
  const key = "key-string";
  const obj = {};
  // keyの評価結果"key-string"をプロパティ名に利用
  obj[key] = "value of key";
  // 取り出す時も同じくkey変数を利用
  console.log(obj[key]); // "value of key"
}
// Computed property names(ES2015)
// プロパティ内で式を評価してプロパティ名を決定することができる
{
  const key = "key-string";
  const obj = {
    [key]: "value of key",
  };
  console.log(obj[key]); // "value of key"
}

// 悪い例(プロパティを後から追加すると、コードが把握しづらくなる)
{
  function changeProperty(obj) {
    obj.key = "value";
    return obj;
  }
  const obj = {};
  changeProperty(obj); // 定義した時にないプロパティがここで追加されてしまう
  console.log(obj.key); // "value"
}

// プロパティの削除
{
  const obj = {
    key1: "value1",
    key2: "value2",
  };
  // プロパティの削除
  delete obj.key1;
  console.log(obj); // {key2: "value2"}
}

// オブジェクトのプロパティ変更を禁止するにはObject.freezeを使う。strict modeが必要
{
  // ファイルの先頭で"use strict"を書く必要がある
  const object = Object.freeze({ key: "value" });
  // freezeしたオブジェクトにはプロパティの追加や変更ができない
  //   object.key = "value100"; // => TypeError: Cannot assign to read only property 'key' of object '#<Object>'
  console.log(object.key);
}

// プロパティの存在を確認する
{
  const widget = {
    window: {
      title: "ウィジェットのタイトル",
    },
  };
  // windowをwidowと間違えているが、例外が発生しない
  console.log(widget.widow); // undefined
  // さらにネストした場合に例外が発生する(undefined.titleと書いたことと同じになるため)
  //   console.log(widget.widow.title); // TypeError: Cannot read property 'title' of undefined
}
// プロパティの存在確認(undefinedとの比較)
{
  const obj = {
    key: "value",
  };
  // keyプロパティがundefinedでないので、プロパティが存在する…のだろうか
  if (obj.key !== undefined) {
    console.log("keyプロパティは存在する");
  }
  obj.key = undefined;
  // keyプロパティがundefinedなので、プロパティが存在しないことの確認としては不十分
  if (obj.key !== undefined) {
    console.log("keyプロパティは存在する"); // 実行されない
  }
}
// プロパティの存在確認(in演算子)
{
  const obj = {
    key: undefined,
  };
  // keyプロパティが存在するかどうかを確認
  if ("key" in obj) {
    console.log("keyプロパティは存在する");
  }
}
// プロパティの存在確認(hasOwnPropertyメソッド)
{
  const obj = {
    key: undefined,
  };
  // keyプロパティが存在するかどうかを確認
  if (obj.hasOwnProperty("key")) {
    console.log("keyプロパティは存在する");
  }
}
// Stringコンストラクタは内部的にtoStringメソッドを呼び出している
{
  const obj = { key: "value" };
  console.log(obj.toString()); // "[object Object]"
  console.log(String(obj)); // "[object Object]"
  // 独自の toString メソッドを定義
  const customObject = {
    toString() {
      return "custom value";
    },
  };
  console.log(String(customObject)); // "custom value"
}

// プロパティアクセスは暗黙的に文字列化される為、オブジェクトをキーとして渡すとおかしなことになる
{
  const obj = {};
  const keyObject1 = { a: 1 };
  const keyObject2 = { b: 2 };
  // どちらも同じプロパティ名("[object Object]")になる
  obj[keyObject1] = "value1";
  obj[keyObject2] = "value2";
  console.log(obj); // { "[object Object]": "value2" }
}
{
  const obj = {};
  // 例外的に、Symbolは文字列化されない
  const symbolKey1 = Symbol("シンボル1");
  const symbolKey2 = Symbol("シンボル2");
  obj[symbolKey1] = "value1";
  obj[symbolKey2] = "value2";
  console.log(obj); // {Symbol(シンボル1): "value1", Symbol(シンボル2): "value2"}
}

// オブジェクトの列挙
{
  const obj = {
    one: 1,
    two: 2,
    three: 3,
  };
  // Object.keysはキーを列挙した配列を返す
  console.log(Object.keys(obj)); // ["one", "two", "three"]
  // Object.valuesは値を列挙した配列を返す
  console.log(Object.values(obj)); // [1, 2, 3]
  // Object.entriesは[キー, 値]という配列の配列を返す
  console.log(Object.entries(obj)); // [["one", 1], ["two", 2], ["three", 3]]

  // forEachメソッドと組み合わせて使う
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    console.log(key);
  });
}

// Object.assign(target, ...sources)   (ES2015)
// オブジェクトのマージ
{
  const objectA = { a: "a" };
  const objectB = { b: "b" };
  const merged = Object.assign({}, objectA, objectB);
  console.log(merged); // {a: "a", b: "b"}
}
// 既存のオブジェクトを指定した場合は、そのオブジェクトが変更される
{
  const objectA = { a: "a" };
  const objectB = { b: "b" };
  const merged = Object.assign(objectA, objectB);
  console.log(merged); // {a: "a", b: "b"}
  console.log(objectA); // {a: "a", b: "b"}
  console.log(merged === objectA); // true
}
// プロパティ名が重複した場合は後のもので上書きされる
{
  const objectA = { version: "a" };
  const objectB = { version: "b" };
  const merged = Object.assign({}, objectA, objectB);
  console.log(merged); // {version: "b"}
}

// オブジェクトのspread構文でのマージ (ES2018)
{
  const objectA = { a: "a" };
  const objectB = { b: "b" };
  const merged = { ...objectA, ...objectB };
  console.log(merged); // {a: "a", b: "b"}
  console.log(objectA); // {a: "a"}
  console.log(objectB); // {b: "b"}
}
// オブジェクトのspread構文でのマージ。プロパティ名が被った場合は後のもので上書き (ES2018)
{
  const objectA = { version: "a" };
  const objectB = { version: "b" };
  const merged = { ...objectA, ...objectB, other: "other" };
  console.log(merged); // {version: "b", other: "other"}
}

// オブジェクトの複製
{
  const shallowClone = (obj) => {
    return Object.assign({}, obj);
  };
  const obj = { a: "a" };
  const obj2 = obj;
  const cloneObj = shallowClone(obj);
  console.log(cloneObj); // {a: "a"}
  // オブジェクトを複製しているので、異なるオブジェクトとなる
  console.log(obj === cloneObj); // false
  // これは全く同じオブジェクトを参照している
  console.log(obj === obj2); // true
}
// shallow cloneなのでネストしたオブジェクトは複製されない
{
  const shallowClone = (obj) => {
    return Object.assign({}, obj);
  };
  const obj = {
    level: 1,
    nest: {
      level: 2,
    },
  };
  const cloneObj = shallowClone(obj);
  console.log(cloneObj); // {level: 1, nest: {…}}
  console.log(obj === cloneObj); // false
  // nestプロパティは複製されていない(同じオブジェクトを参照しているのでtrueになってしまう)
  console.log(obj.nest === cloneObj.nest); // true
}
// deepCloneしたい場合はshallowCloneを再帰的に呼び出す
{
  const shallowClone = (obj) => {
    return Object.assign({}, obj);
  };
  const deepClone = (obj) => {
    const newObj = shallowClone(obj);
    // プロパティがオブジェクト型であるなら、再帰的に複製する
    Object.keys(newObj)
      .filter((k) => typeof newObj[k] === "object")
      .forEach((k) => (newObj[k] = deepClone(newObj[k])));
    return newObj;
  };
  const obj = {
    level: 1,
    nest: {
      level: 2,
    },
  };
  const cloneObj = deepClone(obj);
  console.log(cloneObj); // {level: 1, nest: {…}}
  console.log(obj === cloneObj); // false
  // nestプロパティも複製されている
  console.log(obj.nest === cloneObj.nest); // false
}
