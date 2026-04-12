// find-unused-files.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置项
const srcDir = path.resolve('./src');
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];
const excludePatterns = ['index', 'main', 'App', 'types.d'];
// 更新目录名大小写以匹配实际路径
const excludeDirs = ['node_modules', 'dist', 'build', 'tradingView'];
// 排除特定路径
const excludePaths = [
  'components/icons',
  'tradingView' // 添加为完整的相对路径
];

// 修改路径别名配置，确保格式统一
const pathAliases = {
  "@": "src",
  "src": "src",
  "js": "src",  // 注意这里去掉了 /* 后缀
  "public": "public",
  "imgs": "src/imgs",
  "style": "src/style",
};

// 入口文件列表（通常这些文件不会被其他文件导入，但仍然需要保留）
const entryFiles = [
  'index.tsx',
];

// 获取所有源文件
function getAllFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      // 获取相对于src的路径
      const relativeToSrc = path.relative(srcDir, filePath);
      
      // 检查是否在排除目录列表中（区分大小写的比较）
      const shouldExcludeDir = excludeDirs.some(excludeDir => 
        file === excludeDir || file.toLowerCase() === excludeDir.toLowerCase()
      );
      
      // 检查是否在排除路径列表中
      const shouldExcludePath = excludePaths.some(excludePath => 
        relativeToSrc.startsWith(excludePath) || 
        relativeToSrc.toLowerCase().startsWith(excludePath.toLowerCase())
      );
      
      if (stat.isDirectory() && !shouldExcludeDir && !shouldExcludePath) {
        fileList = getAllFiles(filePath, fileList);
      } else if (stat.isFile() && fileExtensions.includes(path.extname(file)) && !shouldExcludePath) {
        // 将文件添加到列表
        fileList.push(filePath);
      }
    });
  } catch (error) {
    console.error(`读取目录 ${dir} 时出错:`, error);
  }
  
  return fileList;
}

// 解析导入语句，获取被导入的文件路径
function parseImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const imports = [];
    
    // 匹配各种import语句
    // import x from 'path'
    // import { x } from 'path'
    // import * as x from 'path'
    const importRegex = /import\s+(?:[\w\s{},*]+\s+from\s+)?['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    // 匹配require语句
    // require('path')
    const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    
    while ((match = requireRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    // 匹配动态导入
    // import('path')
    const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    
    while ((match = dynamicImportRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    return imports;
  } catch (error) {
    console.error(`分析文件 ${filePath} 的导入语句时出错:`, error);
    return [];
  }
}

// 查找匹配的文件，处理没有扩展名的情况
function findMatchingFile(basePath, importPath) {
  // 处理以 / 结尾的导入
  if (importPath.endsWith('/')) {
    importPath = importPath.slice(0, -1);
  }
  
  // 首先尝试直接拼接路径
  let fullPath = path.join(basePath, importPath);
  
  // 如果路径已经有扩展名并且文件存在，直接返回
  if (path.extname(fullPath) && fs.existsSync(fullPath)) {
    return fullPath;
  }
  
  // 尝试添加不同的扩展名
  for (const ext of fileExtensions) {
    const pathWithExt = `${fullPath}${ext}`;
    if (fs.existsSync(pathWithExt)) {
      return pathWithExt;
    }
  }
  
  // 尝试查找index文件
  for (const ext of fileExtensions) {
    const indexPath = path.join(fullPath, `index${ext}`);
    if (fs.existsSync(indexPath)) {
      return indexPath;
    }
  }
  
  // 未找到匹配的文件
  return null;
}

// 解析导入路径，将相对路径和别名路径转换为实际文件路径
function resolveImportPath(importPath, currentFilePath) {
  // 如果是npm包或绝对路径不以别名或相对路径开头，不处理
  if (!importPath.startsWith('.') && 
      !Object.keys(pathAliases).some(alias => 
        importPath === alias || 
        importPath.startsWith(`${alias}/`))) {
    return null;
  }
  
  // 相对路径导入
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    const basePath = path.dirname(currentFilePath);
    return findMatchingFile(basePath, importPath);
  }
  
  // 别名路径导入
  for (const [alias, aliasPath] of Object.entries(pathAliases)) {
    if (importPath === alias || importPath.startsWith(`${alias}/`)) {
      // 如果路径就是别名本身，返回别名映射的根目录
      if (importPath === alias) {
        return findMatchingFile(path.resolve(aliasPath), '');
      }
      
      // 否则处理子路径
      const relativePath = importPath.substring(alias.length + 1);
      return findMatchingFile(path.resolve(aliasPath), relativePath);
    }
  }
  
  return null;
}

// 建立依赖关系图
function buildDependencyGraph(files) {
  const graph = {};
  
  // 初始化图
  files.forEach(file => {
    graph[file] = [];
  });
  
  console.log("正在分析文件依赖关系...");
  
  // 分析每个文件的导入
  files.forEach((file, index) => {
    if (index % 50 === 0) {
      console.log(`已分析 ${index}/${files.length} 个文件...`);
    }
    
    const imports = parseImports(file);
    
    imports.forEach(importPath => {
      const resolvedPath = resolveImportPath(importPath, file);
      
      // 只处理项目内的文件
      if (resolvedPath && files.includes(resolvedPath)) {
        graph[resolvedPath].push(file);
      }
    });
  });
  
  return graph;
}

// 查找未使用的文件
function findUnusedFiles(dependencyGraph, allFiles) {
  const unusedFiles = [];
  
  // 检查是否为入口文件
  function isEntryFile(filePath) {
    const fileName = path.basename(filePath);
    return entryFiles.includes(fileName) || excludePatterns.some(pattern => fileName.includes(pattern));
  }
  
  for (const file of allFiles) {
    // 如果文件不在依赖图中（可能是新添加的），将其添加到依赖图
    if (!dependencyGraph[file]) {
      dependencyGraph[file] = [];
    }
    
    if (dependencyGraph[file].length === 0 && !isEntryFile(file)) {
      unusedFiles.push(file);
    }
  }
  
  return unusedFiles;
}

// 生成删除脚本
function generateDeletionScript(unusedFiles) {
  const deleteCommands = unusedFiles.map(file => `rm "${file}"`).join('\n');
  
  const scriptContent = `#!/bin/bash
# 警告：此脚本将删除以下文件，确认无误后再运行
# 建议先备份这些文件

echo "以下文件将被删除:"
${unusedFiles.map(f => `echo "${f}"`).join('\n')}
echo ""
echo "未使用文件总数: ${unusedFiles.length}"
echo ""
echo "请确认是否继续 (y/n)"
read confirmation

if [ "$confirmation" = "y" ]; then
  ${deleteCommands}
  echo "文件已删除"
else
  echo "操作已取消"
fi
`;

  fs.writeFileSync('delete-unused-files.sh', scriptContent);
  execSync('chmod +x delete-unused-files.sh');
  console.log('删除脚本已生成: delete-unused-files.sh');
}

// 主函数
function main() {
  console.log("正在扫描src目录下的所有文件...");
  const allFiles = getAllFiles(srcDir);
  console.log(`共找到 ${allFiles.length} 个文件`);
  
  const dependencyGraph = buildDependencyGraph(allFiles);
  
  console.log("正在查找未使用的文件...");
  const unusedFiles = findUnusedFiles(dependencyGraph, allFiles);
  
  console.log("\n未使用的文件:");
  unusedFiles.forEach(file => console.log(file));
  console.log(`\n共发现 ${unusedFiles.length} 个未使用的文件`);
  
  if (unusedFiles.length > 0) {
    generateDeletionScript(unusedFiles);
  }
}

main();