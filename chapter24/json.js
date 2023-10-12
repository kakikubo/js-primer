// JSON文字列をオブジェクトに変換する
{
  // JSONはダブルクォートのみを許容するため、シングルクォートでJSON文字列を記述
  const json = '{ "id": 1, "name": "js-primer" }';
  const obj = JSON.parse(json);
  console.log(obj.id); // => 1
  console.log(obj.name); // => "js-primer"
}
{
  const json = "[1, 2, 3]";
  console.log(JSON.parse(json)); // => [1, 2, 3]
}
{
  // 外部のプログラムが送ってくるデータはtry...catch構文で例外処理をするべき
  const userInput = "not json value";
  try {
    const json = JSON.parse(userInput);
    console.log(json);
  } catch (error) {
    // JSON.parseは例外を投げる可能性がある
    console.log(`パースできませんでした: ${error.message}`);
  }
}

// オブジェクトをJSON文字列に変換する
{
  const obj = { id: 1, name: "js-primer", bio: null };
  const json = JSON.stringify(obj);
  console.log(json); // => '{"id":1,"name":"js-primer","bio":null}'
}
{
  // JSON.stringifyは第2引数(replacer引数)に関数を渡すことで、変換処理をカスタマイズできる
  const obj = { id: 1, name: "js-primer", bio: null };
  const replacer = (key, value) => {
    if (value === null) {
      return undefined;
    }
    return value;
  };
  const json = JSON.stringify(obj, replacer);
  console.log(json); // => '{"id":1,"name":"js-primer"}'
}
{
  // 第2引数(replacer引数)に配列を渡すことで、変換するプロパティを絞り込める
  const obj = { id: 1, name: "js-primer", bio: null };
  const json = JSON.stringify(obj, ["id", "name"]);
  console.log(json); // => '{"id":1,"name":"js-primer"}'
}
{
  // 第3引数(space引数)に数値を渡すことで、スペースを入れて整形できる
  const obj = { id: 1, name: "js-primer", bio: null };
  // replacer引数を使わない場合はnullを渡して省略するのが一般的です
  const json = JSON.stringify(obj, null, 2);
  console.log(json);
  // =>
  // {
  //   "id": 1,
  //   "name": "js-primer",
  //   "bio": null
  // }
}
{
  // タブ文字でインデントされたJSONを得る例
  const obj = { id: 1, name: "js-primer" };
  console.log(JSON.stringify(obj, null, "\t"));
  // =>
  // {
  //    "id": 1,
  //    "name": "js-primer"
  // }
}

// JSONにシリアライズできないオブジェクト
{
  // 値が関数のプロパティ
  console.log(JSON.stringify({ x: function () {} })); // => '{}' (空オブジェクト)

  // 値がSymbolのプロパティ
  console.log(JSON.stringify({ x: Symbol("") })); // => '{}' (空オブジェクト)

  // 値がundefinedのプロパティ
  console.log(JSON.stringify({ x: undefined })); // => '{}' (空オブジェクト)

  // 配列の場合
  console.log(JSON.stringify({ x: [10, function () {}] })); // => '{"x": [10, null]}' (nullに変換される)

  // キーがSymbolのプロパティ
  console.log(JSON.stringify({ [Symbol("foo")]: "foo" })); // => '{}' (空オブジェクト)

  // 値がRegExpのプロパティ
  console.log(JSON.stringify({ x: /\d+/ })); // => '{"x":{}}'

  // 値がMapのプロパティ
  const map = new Map();
  map.set("foo", "foo");
  console.log(JSON.stringify({ x: map })); // => '{"x":{}}'
}
{
  // 循環参照を含むオブジェクトはJSONに変換できない
  const obj = { foo: "foo" };
  obj.self = obj;
  try {
    JSON.stringify(obj);
  } catch (error) {
    console.error(error);
  }
  // TypeError: Converting circular structure to JSON
}

// toJSONメソッドを使ったシリアライズ
{
  const obj = {
    foo: "foo",
    toJSON() {
      return "bar";
    },
  };
  console.log(JSON.stringify(obj)); // => '"bar"' (文字列に変換される)
  console.log(JSON.stringify({ x: obj })); // => '{"x":"bar"}' (文字列に変換される
}
