const fs = require('fs');
const path = require('path');

// 读取 .eslintignore 文件内容
const eslintignorePath = path.resolve(__dirname, '.eslintignore');
const eslintignoreContent = fs.readFileSync(eslintignorePath, 'utf-8');

// 处理 .eslintignore 文件内容为数组
const ignores = eslintignoreContent.split('\n').filter(Boolean);

// 读取 eslint.config.mjs 文件
const eslintConfigPath = path.resolve(__dirname, 'eslint.config.mjs');
let eslintConfigContent = fs.readFileSync(eslintConfigPath, 'utf-8');

// 构建 ignores 配置项
const ignoresConfig = `ignores: ${JSON.stringify(ignores)},`;

// 在配置文件中添加 ignores 配置项
if (!eslintConfigContent.includes('ignores:')) {
  eslintConfigContent = eslintConfigContent.replace(
    'export default [',
    `export default [\n  { ${ignoresConfig} },`
  );
}

// 写回 eslint.config.mjs 文件
fs.writeFileSync(eslintConfigPath, eslintConfigContent, 'utf-8');

console.log('The ignores from .eslintignore have been added to eslint.config.mjs.');
