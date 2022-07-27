const { dest, src, task, watch } = require("gulp");
const ts = require("gulp-typescript");
const config = require("./tsconfig.json");

// ソースファイル
const srcFiles = "server.ts";

// 出力先
const outputDir = "dest";

task("default", function () {
  buildTs();
  // ソースファイルに変更があったら buildTs() を実行
  watch(srcFiles, buildTs);
});

/**
 * TypeScript ファイルをコンパイル
 */
function buildTs() {
  return src(srcFiles)
    .pipe(ts(config.compilerOptions))
    .pipe(dest(outputDir));
} 