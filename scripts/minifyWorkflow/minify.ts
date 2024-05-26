import { minify } from 'terser';
import cssnano from 'cssnano';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { marked } from 'marked';

// 文件模式，用來匹配需要最小化的文件
const patterns = {
  js: "./**/*.{js,jsx,ts,tsx}",
  css: "./**/*.{css,scss}",
  json: "./**/*.json",
  markdown: "./**/*.{md,mdx}"
};

// 獲取所有匹配的文件
const getFiles = (pattern: string): string[] => glob.sync(pattern);

// 最小化文件
const minifyFile = async (file: string, type: string): Promise<void> => {
  try {
    const filePath = path.resolve(file);
    const content = fs.readFileSync(filePath, "utf8");
    let minifiedContent = "";
    let outputFilePath = "";

    switch (type) {
      case 'js':
        const jsResult = await minify(content, { compress: { drop_console: true }, mangle: true });
        minifiedContent = jsResult.code || "";
        outputFilePath = filePath.replace(/\.(js|jsx|ts|tsx)$/, ".min.$1");
        break;

      case 'css':
        const cssResult = await cssnano.process(content, { from: filePath, to: filePath.replace(/\.(css|scss)$/, '.min.$1') });
        minifiedContent = cssResult.css;
        outputFilePath = filePath.replace(/\.(css|scss)$/, ".min.$1");
        break;

      case 'json':
        minifiedContent = JSON.stringify(JSON.parse(content));
        outputFilePath = filePath.replace(".json", ".min.json");
        break;

      case 'markdown':
        minifiedContent = marked(content);
        outputFilePath = filePath.replace(/\.(md|mdx)$/, ".min.$1");
        break;

      default:
        throw new Error(`Unsupported file type: ${type}`);
    }

    fs.writeFileSync(outputFilePath, minifiedContent, 'utf8');
    console.log(`Minified ${file} to ${outputFilePath}`);
  } catch (error) {
    console.error(`Error minifying ${file}:`, error);
  }
};

(async () => {
  const allFiles = [
    { type: 'js', files: getFiles(patterns.js) },
    { type: 'css', files: getFiles(patterns.css) },
    { type: 'json', files: getFiles(patterns.json) },
    { type: 'markdown', files: getFiles(patterns.markdown) }
  ];

  for (const { type, files } of allFiles) {
    for (const file of files) {
      await minifyFile(file, type);
    }
  }
})();
