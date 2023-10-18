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
fs.readFile(filePath, { encoding: "utf8" }).then((file) => {
  console.log(file);
});
