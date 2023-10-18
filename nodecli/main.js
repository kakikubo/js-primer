// commanderモジュールからprogramオブジェクトをインポートする
import { program } from "commander";

// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";

// コマンドライン引数をcommanderでパースする
program.parse(process.argv);

// ファイルパスをprogram.args配列から取り出す
const filePath = program.args[0];
console.log(filePath);

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" })
  .then((file) => {
    console.log(file);
  })
  .catch((err) => {
    console.error(err.message);
    // 終了ステータス1(一般的なエラー)としてプロセスを終了する
    process.exit(1);
  });
