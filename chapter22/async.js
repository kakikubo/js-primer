// {
//   // 指定したtimeoutミリ秒経過するまで同期的にブロックする関数
//   function blockTime(timeout) {
//     const startTime = Date.now();
//     while (true) {
//       const diffTime = Date.now() - startTime;
//       if (diffTime >= timeout) {
//         return; // 指定時間経過したら関数の実行を終了
//       }
//     }
//   }
//   console.log("1. setTimeoutのコールバック関数を10ミリ秒後に実行します");
//   // 非同期処理
//   setTimeout(() => {
//     console.log("3. ブロックする処理を開始します");
//     blockTime(1000); // 他の処理を1秒間ブロックする
//     console.log("4. ブロックする処理が完了しました");
//   }, 10);
//   console.log("2. 同期的な処理を実行します");
//   blockTime(1000); // 他の処理を1秒間ブロックする
// }
/**
{
  // 指定したtimeoutミリ秒経過するまで同期的にブロックする関数
  function blockTime(timeout) {
    const startTime = Date.now();
    while (true) {
      const diffTime = Date.now() - startTime;
      if (diffTime >= timeout) {
        return; // 指定時間経過したら関数の実行を終了
      }
    }
  }

  const startTime = Date.now();
  // 10ミリ秒後にコールバック関数を呼び出すようにタイマーに登録する
  setTimeout(() => {
    const endTime = Date.now();
    console.log(
      `非同期処理のコールバックが呼ばれるまで${
        endTime - startTime
      }ミリ秒かかりました`
    );
  }, 10);
  console.log("ブロックする処理を開始します");
  blockTime(1000); // 他の処理を1秒間ブロックする
  console.log("ブロックする処理が完了しました");
}
*/
/** setTimeout関数は同期的な処理がおわってから呼び出されるので、次の構文はうごかない
{
  try {
    setTimeout(() => {
      // 例外を投げる
      throw new Error("非同期的なエラー");
    }, 10);
  } catch (error) {
    console.log("同期的なエラーをキャッチできる");
    console.log(`error: ${error.message}`);
  }
  console.log("この行は実行されます");
}
*/

// const { reject } = require("async");

/**
{
  // 非同期処理の外
  setTimeout(() => {
    // 非同期処理の中
    try {
      // 例外を投げる
      throw new Error("エラー");
    } catch (error) {
      console.log("非同期処理の中でエラーをキャッチできる");
      console.log(`error: ${error.message}`);
    }
  }, 100);
  console.log("この行は実行されます");
}
*/

// エラーファーストコールバック
// {
//   fs.readFile("./example.txt", (error, data) => {
//     if (error) {
//       // エラーファーストコールバックの処理
//       console.error("エラーが発生しました");
//       console.error(error);
//       return;
//     } else {
//       console.log("データを読み込むことができました");
//     }
//     // dataに読み込んだファイルの内容が入る
//     console.log(data);
//   });
// }

// {
//   /**
//    * 1000ミリ秒未満のランダムなタイミングでレスポンスを擬似的にデータ取得する関数
//    * 指定したpathにデータがある場合にはcallback(null, レスポンス)を呼ぶ
//    * 指定したpathにデータがない場合にはcallback(エラー)を呼ぶ
//    */
//   function dummyFetch(path, callback) {
//     setTimeout(() => {
//       // /success から始まるパスにはリソースがあるという設定
//       if (path.startsWith("/success")) {
//         callback(null, { body: `Response body of ${path}` });
//       } else {
//         callback(new Error("NOT FOUND"));
//       }
//     }, 1000 * Math.random());
//   }
//   // /success/dataにリソースが存在するのでresponseにはデータが入る
//   dummyFetch("/success/data", (error, response) => {
//     if (error) {
//       // この行は実行されません
//     } else {
//       console.log(response); // => { body: "Response body of /success/data" })
//     }
//   });
//   // /failure/dataにリソースは存在しないのでerrorにはエラーオブジェクトが入る
//   dummyFetch("/failure/data", (error, response) => {
//     if (error) {
//       console.log(error.message); // => "NOT FOUND"
//     } else {
//       // この行は実行されません
//     }
//   });
// }

// {
//   /**
//    * リソースの取得に成功した場合はsuccessCallback(レスポンス)を呼び出す
//    * リソースの取得に失敗した場合はfailureCallback(エラー)を呼び出す
//    */
//   function dummyFetch(path, successCallback, failureCallback) {
//     setTimeout(() => {
//       if (path.startsWith("/success")) {
//         successCallback({ body: `Response body of ${path}` });
//       } else {
//         // TODO: Uncaught TypeError TypeError: failureCallback is not a functionが発生するので原因しらべる
//         failureCallback(new Error("NOT FOUND"));
//       }
//     }, 1000 * Math.random());
//   }
//   // /success/dataにリソースが存在するのでresponseにはデータが入る
//   dummyFetch("/success/data", (success, failure) => {
//     if (failure) {
//       // この行は実行されません
//     } else {
//       console.log(success); // => { body: "Response body of /success/data" })
//     }
//   });
//   // /failure/dataにリソースは存在しないのでerrorにはエラーオブジェクトが入る
//   dummyFetch("/failure/data", (success, failure) => {
//     if (failure) {
//       console.log(failure.message); // => "NOT FOUND"
//     } else {
//       // この行は実行されません
//       console.log(success);
//     }
//   });
// }

/**
 * 
{
  // Promiseインスタンスを作成
  const promise = new Promise((resolve, reject) => {
    // 非同期の処理が成功したときはresolveを呼ぶ
    // 非同期の処理が失敗したときにはrejectを呼ぶ
  });
  const onFulfilled = () => {
    console.log("resolveされたときに呼ばれる");
  };
  const onRejected = () => {
    console.log("rejectされたときに呼ばれる");
  };
  // thenメソッドで成功時と失敗時に呼ばれるコールバック関数を登録する
  promise.then(onFulfilled, onRejected);
}
*/

{
  /**
   * 1000ミリ秒未満のランダムなタイミングでレスポンスを擬似的に取得する関数
   * 指定したpathにデータがある場合、成功としてResolved状態のPromiseオブジェクトを返す
   * 指定したpathにデータがない場合、失敗としてRejected状態のPromiseオブジェクトを返す
   */
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith("/success")) {
          resolve({ body: `Response body of ${path}` });
        } else {
          reject(new Error("NOT FOUND"));
        }
      }, 1000 * Math.random());
    });
  }
  // thenメソッドで成功時と失敗時に呼ばれるコールバック関数を登録する
  // /success/dataにリソースは存在するので成功し、onFulfilledが呼ばれる
  dummyFetch("/success/data").then(
    function onFulfilled(response) {
      console.log(response); // => { body: "Response body of /success/data" }
    },
    function onRejected(error) {
      // この行は実行されません
    }
  );
  // /failure/dataにリソースは存在しないので失敗し、onRejectedが呼ばれる
  dummyFetch("/failure/data").then(
    function onFulfilled(response) {
      // この行は実行されません
    },
    function onRejected(error) {
      console.log(error); // Error: "NOT FOUND"
    }
  );
}

{
  function delay(timeoutMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeoutMs);
    });
  }
  // thenメソッドで成功時のコールバック関数だけを登録
  delay(1000).then(() => {
    console.log("1000ミリ秒後に呼ばれる");
  });
}
{
  function errorPromise(message) {
    return new Promise((resolve, reject) => {
      reject(new Error(message));
    });
  }
  // 非推奨: thenメソッドで失敗時のコールバック関数だけを登録
  errorPromise("thenでエラーハンドリング").then(undefined, (error) => {
    console.log(error.message); // => "thenでエラーハンドリング"
  });
  // 推奨: catchメソッドでエラーハンドリング
  errorPromise("catchでエラーハンドリング").catch((error) => {
    console.log(error.message); // => "catchでエラーハンドリング"
  });
}

// Promiseと例外
{
  function throwPromise() {
    return new Promise((resolve, reject) => {
      // Promiseコンストラクタの中で例外は自動的にキャッチされrejectが呼び出される
      throw new Error("例外が発生");
      // 例外が発生するとこれ以降のコンストラクタの処理は実行されません
    });
  }

  throwPromise().catch((error) => {
    console.log(error.message); // => "例外が発生"
  });
}

{
  const promise = new Promise((resolve, reject) => {
    // 非同期でresolveする
    setTimeout(() => {
      resolve();
      // すでにresolveされているため無視される
      reject(new Error("エラー"));
      // 2度目以降のresolveやrejectは無視される
      resolve();
    }, 16);
  });
  promise.then(
    () => {
      console.log("Fulfilledとなった。最初のresolve時に一度だけ呼ばれる");
    },
    (error) => {
      // この行は呼び出されない
    }
  );
}

// Promise.resolve
{
  const fulFilledPromise = Promise.resolve();
}
{
  // const fulFilledPromise = Promise.resolve();と同じ意味
  const fulFilledPromise = new Promise((resolve) => {
    resolve();
  });
}
{
  // resolve(42)されたPromiseインスタンスを作成する
  const fulFilledPromise = Promise.resolve(42);
  fulFilledPromise.then((value) => {
    console.log(value); // => 42
  });
}
{
  const promise = Promise.resolve();
  promise.then(() => {
    console.log("2. コールバック関数が実行されました");
  });
  console.log("1. 同期的な処理が実行されました");
}
{
  const promise = new Promise((resolve) => {
    console.log("1. resolveします");
    resolve();
  });
  promise.then(() => {
    console.log("3. コールバック関数が実行されました＝");
  });
  console.log("2. 同期的な処理が実行されましたー");
}

// Promise.reject
// {
//   const rejectedPromise = Promise.reject(new Error("エラー！！"));
// }
// {
//   // 上記は以下と同じ意味
//   const rejectPromise = new Promise((resolve, reject) => {
//     reject(new Error("エラー！！！"));
//   });
// }
{
  Promise.reject(new Error("エラー")).catch(() => {
    console.log("2. コールバック関数が実行されました★");
  });
  console.log("1. 同期的な処理が実行されました★");
}

// Promiseチェーン
{
  Promise.resolve()
    // thenメソッドは新しいPromiseインスタンスを返す
    .then(() => {
      console.log(1);
      // 返したPromiseインスタンスがresolveされると次のthenが呼ばれる
    })
    .then(() => {
      console.log(2);
    });
}
{
  // 上記は以下と同じ意味
  const firstPromise = Promise.resolve();
  const secondPromise = firstPromise.then(() => {
    console.log(11);
  });
  const thirdPromise = secondPromise.then(() => {
    console.log(22);
  });
  // それぞれの新しいPromiseインスタンスが作成される
  console.log(firstPromise === secondPromise); // => false
  console.log(secondPromise === thirdPromise); // => false
}
{
  // ランダムでFulfilledまたはRejectedのPromiseインスタンスを返す関数
  function asyncTask() {
    return Math.random() > 0.5
      ? Promise.resolve("成功")
      : Promise.reject(new Error("失敗"));
  }

  // asyncTask関数は新しいPromiseインスタンスを返す
  asyncTask()
    // thenメソッドは新しいPromiseインスタンスを返す
    .then(function onFulfilled(value) {
      console.log(value); // => "成功"
    })
    .catch(function onRejected(error) {
      console.log(error.message); // => "失敗"
    });
}
{
  // RejectedなPromiseは次の失敗時の処理までスキップする
  const rejectedPromise = Promise.reject(new Error("結局失敗"));
  rejectedPromise
    .then(() => {
      // このthenのコールバック関数は呼び出されません
    })
    .then(() => {
      // このthenのコールバック関数は呼び出されません
    })
    .catch((error) => {
      console.log(error.message); // => "結局失敗"
    });
}
{
  Promise.resolve()
    .then(() => {
      // 例外が発生すると、thenメソッドはRejectedなPromiseを返す
      throw new Error("例外");
    })
    .then(() => {
      // このthenのコールバック関数は呼び出されません
    })
    .catch((error) => {
      console.log(error.message); // => "例外"
    });
}
// {
//   // 例外をキャッチした後はFulfilledなPromiseを返す
//   Promise.reject(new Error("エラー?"))
//     .catch((error) => {
//       console.log(error.message); // => "エラー?")
//     })
//     .then(() => {
//       console.log("thenのコールバック関数が呼び出される");
//     });
// }

// Promiseチェーンで値を返す
{
  Promise.resolve(1)
    .then((value) => {
      console.log(`value is ${value}`); // => value is 1
      return value * 2;
    })
    .then((value) => {
      console.log(`value is ${value}`); // => value is 2
      return value * 2;
    })
    .then((value) => {
      console.log(`value is ${value}`); // => value is 4
      // 値を返さない場合は undefined を返すのと同じ
    })
    .then((value) => {
      console.log(`value is ${value}`); // => value is undefined
    });
}

{
  Promise.reject(new Error("失敗!!"))
    .catch((error) => {
      // 一度catchすれば、次に呼ばれるのは成功時のコールバック
      console.log(`- error.message is ${error.message}`); // => 失敗!!
      return 1;
    })
    .then((value) => {
      console.log(`- value is ${value}`); // => 1
      return value * 2;
    })
    .then((value) => {
      console.log(`- value is ${value}`); // => 2
    });
}

{
  // Rejectedな状態のPromiseインスタンスがthenの中で返された場合は挙動が少し異なる(thenをスキップする)
  Promise.resolve()
    .then(function onFulfilledA() {
      return Promise.reject(new Error("失敗〜"));
    })
    .then(function onFulfilledB() {
      console.log("onFulfilledBは呼び出されません");
    })
    .catch(function onRejected(error) {
      console.log(error.message); // => "失敗〜"
    })
    .then(function onFulfilledC() {
      console.log("onFulfilledCは呼び出されます〜");
    });
}

{
  function main() {
    return Promise.reject(new Error("エラー"));
  }
  // mainはRejectedなPromiseを返す
  main()
    .catch((error) => {
      // asyncFunctionで発生したエラーのログを出力する
      console.log(error);
      // Promiseチェーンはそのままエラーを継続させる
      return Promise.reject(error);
    })
    .then(() => {
      // 前のcatchでRejectedなPromiseが返されたため、この行は実行されません
    })
    .catch((error) => {
      console.log(`メインの処理が失敗した: ${error.message}`);
    });
}

// Promise#finally
{
  // promiseにはResolvedまたはRejectedなPromiseインスタンスがランダムで入る
  const promise = Math.random() < 0.5 ? Promise.resolve() : Promise.reject();
  promise
    .then(() => {
      console.log("Promise#then");
    })
    .catch((error) => {
      console.log("Promise#catch");
    })
    .finally(() => {
      // 成功、失敗どちらの場合でも呼び出される
      console.log("Promise#finally");
    });
}

{
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith("/resource")) {
          resolve({ body: `Response body of ${path}` });
        } else {
          reject(new Error("NOT FOUND"));
        }
      }, 1000 * Math.random());
    });
  }
  // リソースを取得中かどうかのフラグ
  let isLoading = true;
  dummyFetch("/resource/A")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading = false;
      console.log("Promise#finally");
    });
}

// Promiseチェーンで逐次処理
{
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith("/resource")) {
          resolve({ body: `Response body of ${path}` });
        } else {
          reject(new Error("NOT FOUND"));
        }
      }, 1000 * Math.random());
    });
  }

  const results = [];
  // Resource Aを取得する
  dummyFetch("/resource/A")
    .then((response) => {
      results.push(response.body);
      // Resource Bを取得する
      return dummyFetch("/resource/B");
    })
    .then((response) => {
      results.push(response.body);
    })
    .then(() => {
      console.log(results); // [ "Response body of /resource/A", "Response body of /resource/B" ]
    });
}

// Promise#all
{
  // timeoutMsミリ秒にresolveする
  function delay(timeoutMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(timeoutMs);
      }, timeoutMs);
    });
  }
  const promise1 = delay(1);
  const promise2 = delay(2);
  const promise3 = delay(3);

  Promise.all([promise1, promise2, promise3]).then(function (values) {
    console.log(values); // => [1, 2, 3]
  });
}
{
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith("/resource")) {
          resolve({ body: `Response body of ${path}` });
        } else {
          reject(new Error("NOT FOUND"));
        }
      }, 1000 * Math.random());
    });
  }

  const fetchedPromise = Promise.all([
    dummyFetch("/resource/A"),
    dummyFetch("/not_found/B"),
  ]);
  // fetchedPromiseの結果をDestructuringでresponseA,responseBに代入する
  fetchedPromise
    .then(([responseA, responseB]) => {
      // ひとつもエラーがない場合はこちら
      console.log(responseA.body); // => "Response body of /resource/A"
      console.log(responseB.body); // => "Response body of /resource/B"
    })
    .catch((error) => {
      // エラーが含まれている場合はこちら
      console.log(error); // Error: NOT FOUND
    });
}

{
  // timeoutMsミリ秒後にresolveする
  function delay(timeoutMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(timeoutMs);
      }, timeoutMs);
    });
  }
  // 一つでもresolveまたはrejectした時点で次の処理を実行する
  const racePromise = Promise.race([
    delay(1),
    delay(32),
    delay(64),
    delay(128),
  ]);
  racePromise.then((value) => {
    console.log(`racePromise value is ${value}`); // => racePromise value is 1
  });
}

{
  // timeoutMsミリ秒後にrejectする
  function timeout(timeoutMs) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`Timeout: ${timeoutMs}ミリ秒経過`));
      }, timeoutMs);
    });
  }
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith("/resource")) {
          resolve({ body: `Response body of ${path}` });
        } else {
          reject(new Error("NOT FOUND"));
        }
      }, 1000 * Math.random());
    });
  }
  // 500ミリ秒以内に取得できなければ失敗時の処理が呼ばれる
  Promise.race([dummyFetch("/resource/data"), timeout(500)])
    .then((response) => {
      console.log(response.body); // "Response body of /resource/data"
    })
    .catch((error) => {
      console.log(error.message); // "Timeout: 500ミリ秒経過"
    });
}
