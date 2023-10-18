// commanderモジュールからprogramオブジェクトをインポートする
import { program } from "commander";

// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
// md2htmlモジュールからmd2html関数をインポートする
import { md2html } from "./md2html.js";

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数をcommanderでパースする
program.parse(process.argv);
// オプションのパース結果をオブジェクトとして取得する
const options = program.opts();
console.log(options.gfm);
// コマンドライン引数で指定されなかったオプションにデフォルト値を上書きする
const cliOptions = {
  gfm: options.gfm ?? false,
};

// ファイルパスをprogram.args配列から取り出す
const filePath = program.args[0];
// console.log(filePath);

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" })
  .then((file) => {
    // MarkdownファイルをHTML文字列に変換する
    // gfmオプションを無効にする
    const html = md2html(file, cliOptions);
    console.log(html);
  })
  .catch((err) => {
    console.error(err.message);
    // 終了ステータス1(一般的なエラー)としてプロセスを終了する
    process.exit(1);
  });
