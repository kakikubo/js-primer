"use strict";
// クラスの定義
{
  class MyClass {
    constructor() {
      //  コンストラクタ関数の処理
      // インスタンス化されるときに自動的に呼び出される
    }
  }
}
{
  const MyClass = class MyClass {
    constructor() {}
  };
  const AnonymousClass = class {
    constructor() {}
  };
}
{
  class MyClassA {
    constructor() {
      // コンストラクタの処理が必要なら書く
    }
  }
  // コンストラクタの処理が不要な場合は省略できる(内部的には自動的に定義されている)
  class MyClassB {}
}

// クラスのインスタンス化
{
  class MyClass {}
  // MyClassをインスタンス化する
  const myClass = new MyClass();
  // 毎回新しいインスタンス(オブジェクト)を作成する
  const myClassAnother = new MyClass();
  // それぞれのインスタンスは異なるオブジェクト
  console.log(myClass === myClassAnother); // => false
  // クラスのインスタンスかどうかはinstanceof演算子で判定できる
  console.log(myClass instanceof MyClass); // => true
  console.log(myClassAnother instanceof MyClass); // => true
}

{
  class Point {
    // 2. コンストラクタ関数の仮引数としてxには3、yには4が渡される
    constructor(x, y) {
      // コンストラクタ関数におけるthisはインスタンスを示すオブジェクト
      // インスタンスのxとyプロパティにそれぞれ値を設定する
      // 3. インスタンス(this)のxとyプロパティにそれぞれ値を設定する
      this.x = x;
      this.y = y;
      // コンストラクタではreturn分を書かない
    }
  }
  // 1. コンストラクタをnew演算子んで引数とともに呼び出す
  const point = new Point(3, 4);
  // 4. Pointのインスタンスである pointのxとyプロパティには初期化された値が入る
  console.log(point.x); // => 3
  console.log(point.y); // => 4
}

// 非推奨の例：コンストラクタで値を返すべきではない
{
  class Point {
    constructor(x, y) {
      // thisの代わりにただのオブジェクトを返せる
      return { x, y };
    }
  }
  // new演算子の結果はコンストラクタ関数が返した只のオブジェクト
  const point = new Point(3, 4);
  console.log(point); // => { x: 3, y: 4 }
  // Pointクラスのインスタンスではない
  console.log(point instanceof Point); // => false
}

{
  class Counter {
    constructor() {
      this.count = 0;
    }
    // incrementメソッドをクラスに定義する
    increment() {
      // thisはCounterのインスタンスを参照する
      this.count++;
    }
  }
  const counterA = new Counter();
  const counterB = new Counter();
  // counterA.increment() のベースオブジェクトはcounterAインスタンス
  counterA.increment();
  // 各インスタンスの持つプロパティ(状態)は異なる
  console.log(counterA.count); // => 1
  console.log(counterB.count); // => 0
  // 各インスタンスオブジェクトのメソッドは共有されている(同じ関数を参照している)
  console.log(counterA.increment === counterB.increment);
}

// クラスのインスタンスに対してメソッドを定義する
{
  class Counter {
    constructor() {
      this.count = 0;
      this.increment = () => {
        // thisはconstructorメソッドにおけるthis(インスタンスオブジェクト)を参照する
        this.count++;
      };
    }
  }
  const counterA = new Counter();
  const counterB = new Counter();
  // counterA.increment() のベースオブジェクトはcounterAインスタンス
  counterA.increment();
  // 各インスタンスの持つプロパティ(状態)は異なる
  console.log(counterA.count); // => 1
  console.log(counterB.count); // => 0
  // 各インスタンスオブジェクトのメソッドは異なる関数を参照している
  console.log(counterA.increment === counterB.increment); // => false
}

{
  class ArrowClass {
    constructor() {
      // コンストラクタでのthisは常にインスタンス
      this.method = () => {
        // Arrow Functionにおけるthisは静的に決まる
        // そのためthisは常にインスタンスを参照する
        return this;
      };
    }
  }
  const instance = new ArrowClass();
  const method = instance.method;
  // 呼び出し方法(ベースオブジェクト)に依存しないため、thisがインスタンスを参照する
  console.log(method()); // => instance
}
{
  class PrototypeClass {
    constructor() {
      this.method = function () {
        // thisはベースオブジェクトを参照する
        return this;
      };
    }
  }
  const instance = new PrototypeClass();
  const method = instance.method;
  // ベースオブジェクトはundefined
  console.log(method()); // => undefined
}

// クラスのアクセッサプロパティの定義
{
  class NumberWrapper {
    constructor(value) {
      this._value = value;
    }
    // _valueプロパティの値を返すgetter
    get value() {
      console.log("getter");
      return this._value;
    }
    // _valueプロパティに値を代入するsetter
    set value(newValue) {
      console.log("setter");
      this._value = newValue;
    }
  }
  const numberWrapper = new NumberWrapper(1);
  // "getter"とコンソールに表示される
  console.log(numberWrapper.value); // => 1
  // "setter"とコンソールに表示される
  numberWrapper.value = 42;
  // "getter"とコンソールに表示される
  console.log(numberWrapper.value); // => 42
}

// Array#lengthをアクセッサプロパティで再現する
{
  // たとえばこういう挙動
  const array = [1, 2, 3, 4, 5];
  // 要素数を減らすと、インデックス以降の要素が削除される
  array.length = 2;
  console.log(array.join(",")); // => "1,2"
  // 要素数だけを増やしても、配列の中身は空要素が増えるだけ
  array.length = 5;
  console.log(array.join(",")); // => "1,2, , , "
}
{
  // 配列のようなlengthを持つクラス
  class ArrayLike {
    constructor(items = []) {
      this._items = items;
    }

    get items() {
      return this._items;
    }

    get length() {
      return this._items.length;
    }

    set length(newLength) {
      const currentItemLength = this.items.length;
      // 現在要素数より小さなnewLengthが指定された場合、指定した要素数となるように末尾を削除する
      if (newLength < currentItemLength) {
        this._items = this.items.slice(0, newLength);
      } else if (newLength > currentItemLength) {
        // 現在要素数より大きなnewLengthが指定された場合、指定した要素数となるように末尾に空要素を追加する
        this._items = this.items.concat(
          new Array(newLength - currentItemLength)
        );
      }
    }
  }

  const arrayLike = new ArrayLike([1, 2, 3, 4, 5]);
  // 要素数を減らすと、インデックス以降の要素が削除される
  arrayLike.length = 2;
  console.log(arrayLike.items.join(",")); // => "1,2"
  // 要素数を増やすと末尾に空要素が追加される
  arrayLike.length = 5;
  console.log(arrayLike.items.join(",")); // => "1,2,,,"
}

// 静的メソッド
{
  class ArrayWrapper {
    constructor(array = []) {
      this.array = array;
    }

    // rest parametersとして要素を受け付ける
    static of(...items) {
      // return new ArrayWrapper(items);
      // thisはArrayWrapperを参照する。よって以下でも同じ
      return new this(items);
    }

    get length() {
      return this.array.length;
    }
  }

  // 配列を引数として渡している
  const arrayWrapperA = new ArrayWrapper([1, 2, 3]);
  // 要素を引数として渡している
  const arrayWrapperB = ArrayWrapper.of(1, 2, 3);
  console.log(arrayWrapperA);
  console.log(arrayWrapperB);
}

// 2種類のインスタンスメソッドの定義
{
  class ConflictClass {
    constructor() {
      // インスタンスオブジェクトにmethodを定義
      this.method = () => {
        console.log("インスタンスオブジェクトのメソッド");
      };
    }

    // クラスのプロトタイプメソッドとしてmethodを定義
    method() {
      console.log("プロトタイプのメソッド");
    }
  }
  const conflict = new ConflictClass();
  conflict.method(); // => "インスタンスオブジェクトのメソッド"
  // インスタンスのmethodプロパティを削除
  delete conflict.method;
  conflict.method(); // => "プロトタイプのメソッド"
}

{
  function fn() {}
  // prototypeプロパティにプロトタイプオブジェクトが存在する
  console.log(typeof fn.prototype === "object"); // => true
  class MyClass {}
  // prototypeプロパティにプロトタイプオブジェクトが存在する
  console.log(typeof MyClass.prototype === "object"); // => true
}
// プロトタイプオブジェクト
{
  class MyClass {
    method() {}
  }
  // methodはMyClassのプロトタイプオブジェクトのプロパティとして定義されている
  console.log(typeof MyClass.prototype.method === "function"); // => true
  // クラス#constructorはクラス自身を参照する
  console.log(MyClass.prototype.constructor === MyClass); // => true
}
// プロトタイプチェーン
{
  class MyClass {
    method() {
      console.log("プロトタイプのメソッド");
    }
  }
  const instance = new MyClass();
  // インスタンスにはmethodプロパティがないため、プロトタイプオブジェクトのmethodが参照される
  instance.method(); // => "プロトタイプのメソッド"
  // instanceの[[Prototype]]内部プロパティはMyClass.prototypeと一致する
  const MyClassPrototype = Object.getPrototypeOf(instance);
  console.log(MyClassPrototype === MyClass.prototype); // => true
}

// 継承
{
  class Parent {
    constructor(...args) {
      console.log("Parentコンストラクタの処理", ...args);
    }
  }
  // Parentを継承したChildクラスの定義
  class Child extends Parent {
    constructor(...args) {
      // Parentのコンストラクタを呼び出す
      super(...args);
      console.log("Childコンストラクタの処理", ...args);
    }
  }
  const child = new Child("引数1", "引数2");
  // Parentコンストラクタの処理 引数1 引数2
  // Childコンストラクタの処理 引数1 引数2
}
{
  class Parent {
    constructor() {
      this.name = "Parent";
    }
  }
  class Child extends Parent {
    constructor() {
      //  子クラスではsuper()をthisに触る前に呼び出さなければならない
      super();
      // 子クラスのコンストラクタ処理
      // 親クラスで書き込まれたnameは上書きされる
      this.name = "Child";
    }
  }
  const parent = new Parent();
  console.log(parent.name); // => 'Parent'
  const child = new Child();
  console.log(child.name); // => 'Child'
}

// プロトタイプ継承
{
  class Parent {
    method() {
      console.log("Parent#method");
    }
  }
  // Parentを継承したChildを定義
  class Child extends Parent {
    // methodの定義はない
  }
  // ChildのインスタンスはParentのプロトタイプメソッドを継承している
  const instance = new Child();
  instance.method(); // => "Parent#method"
}

{
  class Parent {
    method() {
      console.log("Parent#method");
    }
  }
  class Child extends Parent {
    method() {
      console.log("Child#method");
      // this.method()だと自分(this)のmethodを呼び出して無限ループする
      // そのため、明示的にsuper.method()とParent#methodを呼び出す
      super.method();
    }
  }
  const child = new Child();
  child.method();
  // "Child#method"
  // "Parent#method"
}
{
  class Parent {
    static method() {
      console.log("Parent.method");
    }
  }
  class Child extends Parent {
    static method() {
      console.log("Child.method");
      // super.method()はParent.methodを呼び出す
      super.method();
    }
  }
  Child.method();
  // コンソールには次のように出力される
  // "Child.method"
  // "Parent.method"
}

// 継承の判定
{
  class Parent {}
  class Child extends Parent {}
  const parent = new Parent();
  const child = new Child();
  // ParentのインスタンスはParentのみを継承したインスタンス
  console.log(parent instanceof Parent); // => true
  console.log(parent instanceof Child); // => false
  // ChildのインスタンスはChildとParentの両方を継承したインスタンス
  console.log(child instanceof Parent); // => true
  console.log(child instanceof Child); // => true
}

// ビルトインオブジェクトの継承
{
  class MyArray extends Array {
    get first() {
      if (this.length === 0) {
        return undefined;
      } else {
        return this[0];
      }
    }
    get last() {
      if (this.length === 0) {
        return undefined;
      } else {
        return this[this.length - 1];
      }
    }
  }

  // Array を継承しているのでArray.fromも継承している
  // Array.fromはIterableなオブジェクトから配列インスタンスを作成する
  const array = MyArray.from([1, 2, 3, 4, 5]);
  console.log(array.length); // => 5
  console.log(array.first); // => 1
  console.log(array.last); // => 5
}
