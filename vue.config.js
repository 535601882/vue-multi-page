let projectname = process.argv.slice(2)[1];// 获取到vue-cli-service  build admin
let glob = require("glob");// 用于筛选文件
const path = require('path')
const PAGES_PATH = path.resolve(__dirname, './src/pages')

function getEntry() {
    let entries = {};
    if (process.env.NODE_ENV == 'production') {
        entries[projectname] = {
            // page的入口
            entry: PAGES_PATH +'/' + projectname + '/main.js',
            // 模板来源 // 主页面
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            title: projectname,//打包后的.html中<title>标签的文本内容
            chunks: ['chunk-vendors', 'chunk-common', projectname || 'index']
        }
    } else {
        let items = glob.sync(PAGES_PATH + "/*/*.js");
        for (let i in items) {
            let filepath = items[i];
            let fileList = filepath.split("/");
            let fileName = fileList[fileList.length - 2];

            entries[fileName] = {
                entry: `src/pages/${fileName}/main.js`,
                // 模板来源 主页面
                template: `public/index.html`,
                // 在 dist/index.html 的输出(打包后的html文件名称)
                filename: `${fileName}.html`,
                title: fileName,
                // 提取出来的通用 chunk 和 vendor chunk。
                chunks: ['chunk-vendors', 'chunk-common', fileName]
            }
        }
    }
    return entries;
}

let pages = getEntry();
console.log('pages = ', pages)
module.exports = {
    outputDir: "dist/" + projectname,
    // publicPath: projectname ? '/' + projectname : '/',
    pages
}
