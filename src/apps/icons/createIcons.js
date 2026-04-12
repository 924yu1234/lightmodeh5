/* eslint-disable */
const fs = require('fs');
const path = require('path');
const rootPath = path.resolve('');
const IconsPath = path.join(rootPath, 'src/components/Icons');
const swPath = path.join(rootPath, 'src/components/Icons/index.js');

fixPublicUrl();

function fixPublicUrl() {
  const allIcons = getAllIconFiles(IconsPath);
  let str = '';
  
  allIcons.forEach((iconInfo) => {
    const { name, relativePath } = iconInfo;
    if (name !== 'index') {
      str += `export { default as ICON${name} } from 'src/components/Icons/${relativePath}';\n`;
    }
  });
  
  fs.writeFileSync(swPath, str, 'utf8');
  console.log(`Generated ${allIcons.length} icon exports`);
}

function getAllIconFiles(dir, baseDir = dir) {
  let icons = [];
  
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach((filename) => {
      const fullPath = path.join(dir, filename);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 递归处理子文件夹
        icons = icons.concat(getAllIconFiles(fullPath, baseDir));
      } else if (filename.endsWith('.js') || filename.endsWith('.tsx')) {
        // 跳过工具类文件
        const name = filename.replace('.js', '').replace('.tsx', '');
        if (name.includes('Wrapper') || name === 'index') {
          return;
        }
        
        // 处理图标文件
        const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/').replace(/\.(js|tsx)$/, '');
        
        // 为子文件夹中的图标添加前缀
        const folderPrefix = path.dirname(relativePath) === '.' ? '' : 
          path.dirname(relativePath).split('/').map(folder => 
            folder.charAt(0).toUpperCase() + folder.slice(1)
          ).join('');
        
        const iconName = folderPrefix + name.charAt(0).toUpperCase() + name.slice(1);
        
        icons.push({
          name: iconName,
          relativePath: relativePath
        });
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return icons;
}
