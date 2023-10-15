// Map (ES2015)
{
  const map = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]);
  // 2つのエントリーで初期化されている
  console.log(map.size); // 2

  map.delete("key1");
  console.log(map.size); // 1
  map.clear();
  console.log(map.size); // 0
}
{
  const map = new Map();
  // 新しい要素の追加
  map.set("key", "value1");
  console.log(map.size); // 1
  console.log(map.get("key")); // value1
  // 要素の上書き
  map.set("key", "value2");
  console.log(map.get("key")); // value2
  // キーの存在確認
  console.log(map.has("key")); // => true
  console.log(map.has("foo")); // => false
}
// マップの反復処理
{
  // forEach((value, key, map) => { ... }))
  const map = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]);
  const results = [];
  map.forEach((value, key) => {
    results.push(`${key}:${value}`);
  });
  console.log(results); // => ['key1:value1', 'key2:value2']
}
{
  // keys
  const map = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]);
  const keys = [];
  // keysメソッドの戻り値(Iterator)を反復処理する
  for (const key of map.keys()) {
    keys.push(key);
  }
  console.log(keys); // => ['key1', 'key2']
  // keysメソッドの戻り値(Iterator)から配列を作成する
  const keysArray = Array.from(map.keys());
  console.log(keysArray); // => ['key1', 'key2']
}
{
  // entries => [key, value]の配列を要素とするIteratorを返す
  const map = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]);
  const entries = [];
  for (const [key, value] of map.entries()) {
    entries.push(`${key}:${value}`);
  }
  console.log(entries); // => ['key1:value1', 'key2:value2']

  const mapEntries = [];
  // map自身もiterableなオブジェクトなのでそのまま反復処理ができる
  for (const [key, value] of map) {
    mapEntries.push(`${key}:${value}`);
  }
  console.log(mapEntries); // => ['key1:value1', 'key2:value2']
}

// ObjectをMapのように使おうとすると発生する問題
{
  const map = {}; // mapという名前のObject
  // マップがキーを持つことを確認する
  function has(key) {
    return typeof map[key] !== "undefined";
  }
  console.log(has("foo")); // => false
  // Objectのプロパティが存在する(prototypeオブジェクトがあるため)
  console.log(has("constructor")); // => true
}

{
  // ショッピングカートを表現するクラス
  class ShoppingCart {
    constructor() {
      // 商品とその数を持つマップ
      this.items = new Map();
    }
    // カートに商品を追加する
    addItem(item) {
      const count = this.items.get(item) || 0;
      this.items.set(item, count + 1);
    }
    // カート内の合計金額を返す
    getTotalPrice() {
      return Array.from(this.items).reduce((total, [item, count]) => {
        return total + item.price * count;
      }, 0);
    }
    // カートの中身を文字列にして返す
    toString() {
      return Array.from(this.items)
        .map(([item, count]) => {
          return `${item.name};${count}`;
        })
        .join(",");
    }
  }
  const shoppingCart = new ShoppingCart();
  // 商品一覧
  const shopItems = [
    { name: "みかん", price: 100 },
    { name: "リンゴ", price: 200 },
  ];

  // カートに商品を追加する
  shoppingCart.addItem(shopItems[0]);
  shoppingCart.addItem(shopItems[0]);
  shoppingCart.addItem(shopItems[1]);

  // 合計金額を表示する
  console.log(shoppingCart.getTotalPrice()); // => 400
  // カートの中身を表示する
  console.log(shoppingCart.toString()); // => "みかん:2,リンゴ:1"
}

// WeakMap
{
  const map = new WeakMap();
  // キーとなるオブジェクト
  let obj = {};
  // {} への参照をキーに値をセットする
  map.set(obj, "value");
  // {} への参照を破棄する
  obj = null;
  // GCが発生するタイミングでWeakMapから値が破棄される
}
{
  // WeakMapのつかいどころ。イベントリスナーを管理するマップ
  const listenersMap = new WeakMap();

  class EventEmitter {
    addListener(listener) {
      // thisに紐づいたリスナーの配列を取得する
      const listeners = listenersMap.get(this) || [];
      const newListeners = listeners.concat(listener);
      // thisをキーに新しい配列をセットする
      listenersMap.set(this, newListeners);
    }
  }
  // 上記クラスの実行例
  let eventEmitter = new EventEmitter();
  // イベントリスナーを追加する
  eventEmitter.addListener(() => {
    console.log("イベントが発火しました");
  });
  // eventEmitterへの参照がなくなったことで自動的にイベントリスナーが解放される
  eventEmitter = null;
}
{
  // HTML要素の高さを計算した結果をキャッシュし、2回目以降に同じ計算をしないようにする
  const cache = new WeakMap();

  function getHeight(element) {
    if (cache.has(element)) {
      return cache.get(element);
    }
    const height = element.getBoundingClientRect().height;
    // elementオブジェクトに対して高さを紐づけて保存している
    cache.set(element, height);
    return height;
  }
}
{
  const map = new Map();
  map.set(NaN, "value");
  // NaNは===で比較した場合は常にfalse
  console.log(NaN === NaN); // => false
  // MapはNan同士を比較できる
  console.log(map.get(NaN)); // => "value"
  console.log(map.has(NaN)); // => true
}

// Set
{
  const set = new Set();
  console.log(set.size); // => 0
}
{
  // "value2"が重複するため、片方は無視される
  const set = new Set(["value1", "value2", "value2"]);
  // セットのサイズは2になる
  console.log(set.size); // => 2
}
{
  const set = new Set();
  // 値の追加
  set.add("a");
  console.log(set.size); // => 1
  // 重複する値は追加されない
  set.add("a");
  console.log(set.size); // => 1
  // 値の存在確認
  console.log(set.has("a")); // => true
  console.log(set.has("b")); // => false

  set.add("b");
  console.log(set.size); // => 2
  set.delete("a");
  console.log(set.size); // => 1
  set.clear();
  console.log(set.size); // => 0
}
{
  // セットの反復処理
  const set = new Set(["A", "B"]);
  const results = [];
  set.forEach((value) => {
    results.push(value);
  });
  console.log(results); // => ['A', 'B']
}
{
  const set = new Set(["a", "b"]);
  // keysで列挙(valuesと同じ)
  const keysResults = [];
  for (const value of set.keys()) {
    keysResults.push(value);
  }
  console.log(keysResults); // => ['a', 'b']

  // valuesで列挙
  const valuesResults = [];
  for (const value of set.values()) {
    valuesResults.push(value);
  }
  console.log(valuesResults); // => ['a', 'b']

  // entriesで列挙
  const entriesResults = [];
  for (const entry of set.entries()) {
    // entryは[値, 値]の配列
    entriesResults.push(entry);
  }
  console.log(entriesResults); // => [['a', 'a'], ['b', 'b']]
}
{
  const set = new Set(["a", "b"]);
  const results = [];
  for (const value of set) {
    results.push(value);
  }
  console.log(results); // => ['a', 'b']
}
{
  const set = new WeakSet();
  // オブジェクトを追加する
  const key = {};
  set.add(key);
  console.log(set.has(key)); // => true
  // オブジェクトを削除する
  set.delete(key);
  console.log(set.has(key)); // => false
}
