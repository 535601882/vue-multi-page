//简化每个页面的配置对象的创建逻辑
const createPage = (name, title = '', chunk = '')=>{
    return {
        // page 的入口 相当于单页面应用的main.js
        entry: `src/pages/${name}/main.js`,
        // 模板来源，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
        template: `public/${name}.html`,
        // 在 dist/index.html 的输出，编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
        filename: `${name}.html`,
        // 当使用 title 选项时，(通常是在路由切换时设置title)
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>，
        title: title,
        // 在这个页面中包含的模块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', chunk || name]
    }
}

console.log('process.argv = ',process.argv)
console.log('process.env.NODE_ENV = ',process.env.NODE_ENV)
var projectname = process.argv[4];// 获取到vue-cli-service  build --mode admin
var glob = require("glob");

console.log("projectname = ",projectname)
function getEntry() {
    var entries = {};
    if (process.env.NODE_ENV == 'multi-production') {
        entries[projectname] = {
            // page的入口
            entry: 'src/pages/' + projectname + '/main.js',
            // 模板来源 // 主页面
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            title: projectname,//打包后的.html中<title>标签的文本内容
            chunks: ['chunk-vendors', 'chunk-common', projectname || 'index']
        }
    } else {
        var items = glob.sync("./src/pages/*/*.js");
        console.log(items)
        for (var i in items) {
            var filepath = items[i];
            var fileList = filepath.split("/");
            var fileName = fileList[fileList.length - 2];
            console.log('fileName = ',fileName)
            entries[fileName] = {
                entry: `src/pages/${fileName}/main.js`,
                // 模板来源// 主页面
                template: `public/index.html`,
                // 在 dist/index.html 的输出(打包后的html文件名称)
                filename: `${fileName}.html`,
                // 提取出来的通用 chunk 和 vendor chunk。
                chunks: ['chunk-vendors', 'chunk-common', fileName]
            }
        }
    }
    return entries;
}

var pages = getEntry();
console.log('pages = ', pages)
module.exports = {
    outputDir: "dist/" + projectname,
    // publicPath: projectname ? '/' + projectname : '/',
    pages: pages
    /*{
        /!*index: {
            // page 的入口 相当于单页面应用的main.js
            entry: 'src/pages/index/main.js',
            // 模板来源，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'public/index.html',
            // 在 dist/index.html 的输出，编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'index.html',
            // 当使用 title 选项时，(通常是在路由切换时设置title)
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>，
            title: 'Index Page',
            subtitle:'这是 前台 的二级title',
            // 在这个页面中包含的模块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },*!/
        index:createPage('index', '前台 Page'),
        /!*admin: {
            // page 的入口 相当于单页面应用的main.js
            entry: 'src/pages/admin/main.js',
            // 模板来源，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'public/admin.html',
            // 在 dist/index.html 的输出，编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'admin.html',
            // 当使用 title 选项时，(通常是在路由切换时设置title)
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            subtitle:'这是 后台 的二级title',
            // 在这个页面中包含的模块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'admin']
        }*!/
        admin:createPage('admin', '后台 Page'),
        // 只有entry属性时，直接用字符串表示模块入口
        // client: 'src/modules/client/client.js'
    }*/
}
