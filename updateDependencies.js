const fs = require('fs');

// 读取 package.json 文件
const packageJson = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));

// 更新 dependencies 和 devDependencies 中的版本号为 latest
const updateDependenciesToLatest = (dependencies) => {
  for (const dependency in dependencies) {
    dependencies[dependency] = 'latest';
  }
};

// 检查并更新 dependencies
if (packageJson.dependencies) {
  updateDependenciesToLatest(packageJson.dependencies);
}

// 检查并更新 devDependencies
if (packageJson.devDependencies) {
  updateDependenciesToLatest(packageJson.devDependencies);
}

// 将更新后的 package.json 写回文件
fs.writeFileSync('package-lock.json', JSON.stringify(packageJson, null, 2), 'utf8');

console.log('Dependencies and devDependencies have been updated to latest versions.');

