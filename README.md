# vue-multi-page 利用 Vue-CLI 進行多頁面開發并按文件夹打包 

現今流行的前端開發方式不外乎是利用框架進行SPA的網站開發，而 Vue-CLI為 Vue 開發者提供了便利的初始化工具，在不需複雜的設定下我們可以很快的將專案打包成單頁面應用。

然而一個工程師需面對各式各樣的需求，比如一套 landing page 想在不同的管道進行推廣，且需要在前端頁面嵌入各自的統計代碼；又依據這些管道的性向不同，頁面的元件編排也會有些許不同。

在這種情況下，雖然 Vue 可以很便利的共用元件，但若要打包成多個頁面時，總不可能將專案複製多份後，再分別組合吧。


# vueCLI 创建多页应用 注意点如下：

## vue.config.js配置

除了 entry 為必填欄位，其它為選填
```vuejs
module.exports = {
    pages: {
        // 前台入口
        index: {
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
            chunks: ['chunk-vendors', 'chunk-common', 'index']//**重要**
        },
        // 后台入口
        admin: {
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
            chunks: ['chunk-vendors', 'chunk-common', 'admin']//**重要**
        }
        // 示例：只有entry属性时，直接用字符串表示模块入口
        // client: 'src/modules/client/client.js'
    }
}

```

比如我們將 subtitle 插入至```<meta /> ```這個 HTML tag ：

```
<meta 
 attr="subtitle"
 content="<%= htmlWebpackPlugin.options.subtitle %>"
/>
```
給予 attr 及 content 後，只需在 code 裡只要以 js 取出即可
```document.querySelector(“META[attr=’title’]”).getAttribute(“content”)```



## router.js
修改路由配置，将history模式去掉
```
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
```

在默认下, 是只有 index.html 这个入口可以用 history 模式, 如: http://www.xxx.com/xxx/xxx, 而其他的入口只能用 hash 模式, 如: http://www.xxx.com/admin.html#/xxx/xxx, 因为webpack-dev-middleware会将所有的路由都指向 index.html 文件

## package.js
```
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "build:admin": "vue-cli-service build admin",// 单独打包admin
    "build:index": "vue-cli-service build index",// 单独打包index
    "build:all": "npm run build:admin & npm run build:index"// 全部一起打包
  },
```

## 如何按多页文件夹来打包？

### outputDir
- Default: 'dist' 默认全部打包到dist文件夹下。想要按照多页文件夹来打包的话，就需要知道每次打包时要生成的文件夹名来动态改变dist下的值。思路就是接收build时的打包文件夹参数

利用`process.argv`获取`package.json`下的`build`参数，来动态修改`outputDir`的值

例如运行`vue-cli-service build admin`

`let projectname = process.argv.slice(2)[1];` 获取到 admin

```
outputDir: "dist/" + projectname,
```
