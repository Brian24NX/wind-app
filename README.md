#### 1. 目录结构
```
├── README.md            - 说明文件
├── api                  - 涉及到接口请求的模块，接口统一按照modules模块进行管理，以便后期更好维护
│   ├── http.js          - 对 wx.request 做了一层封装，支持 GET,POST,PUT,DELETE 方法 
│   └── modules          - 接口请求按模块管理
│       ├── home.js      - home 接口请求，返回一个请求函数
│       ├── login.js     - login 接口请求，返回一个请求函数
│       ├── my.js        - my 接口请求，返回一个请求函数
│       ├── query.js     - query接口请求，返回一个请求函数
│       └── quotation.js - quotation 接口请求，返回一个请求函数
├── app.js               - 小程序整体的app 逻辑
├── app.json             - 小程序公共配置
├── app.wxss             - 小程序公共样式表   
├── assets               - 静态文件，用于存放font、img、styles     
│   ├── font             - 字体图标
│   ├── img              - 开发涉及到的图片，图片分大模块存放，例: 涉及到home模块下的图片新建home文件夹存放
                           UI给完图，前端开发需要通过https://tinypng.com/这个网站对图片进行压缩
│   │   └── tabs         - tabs用到的图片
│   │   └── home         - home用到的图片
│   │   └── common       - 公共图片
│   └── styles           - 样式文件  
│       └── common.wxss  - 公共的样式文件           
├── components           - 公共组件，多次使用到的组件需要单独封装抽离出来，要写好注释，需要传递什么
│   └── Header           - 例公用头部组件
├── config               - 小程序配置文件，涉及环境，以及某环境下的baseUrl
│   └── config.js        - config.js
├── pages                - 页面组件
│   ├── Home             - Home，命名规范为首字母大写驼峰命名
│   │   ├── component    - Home模块下的抽离组件
│   │   │   ├── Tab      - Home模块下的抽离Tab组件
│   │   ├── index.js     - 逻辑
│   │   ├── index.json   - 页面的一些配置
│   │   ├── index.wxml   - 页面结构
│   │   └── index.wxss   - 页面样式
│   ├── My               - My 模块页面组件
│   ├── Query            - Query 模块页面组件
│   └── Quotation        - Quotation 模块页面组件
├── project.config.json  - 工具配置
├── sitemap.json         - 文件用于配置小程序及其页面是否允许被微信索引
└── utils                - 公共的js模块，当逻辑层多次使用的js，封装成函数，放到utils中，以免代码冗余
    ├── storage.js       - storage 对小程序storage增删改查的函数方法
    └── util.js          - util 公共函数方法，例如:时间格式化、跳过空数据、
```

#### 2. Git 分支管理
    - development: 开发环境 (开发好的功能，自测完，可从自己分支合并到development分支来)
    - test: 测试环境 (不可直接使用编写代码)
    - production: 生产环境 (不可直接使用编写代码)

#### 3. Git 分支说明：
    1. 分支命名: 开发人员开发前，基于development分支创建个人分支，命名规范为 dev_xxx, 例如dev_xiaohai
    2. 开发: 开发人员的业务代码，自测完没有问题，先上传到自己分支，再merge 到 development 分支
    3. 合并: 切换到development分支，先pull更新最新代码，再merge自己的分支到 development 分支
    4. 冲突: 当合并代码跟其他小伙伴有冲突时，需要两人核对完、解决冲突之后在提交，以免代码被冲掉

#### 4. Git 提交规范
    > type用于说明commit的类别  git commit -m "type: 本次提交的具体功能或者修复的bug"
    - feat: 新功能,   例: git commit -m "feat: 将首页tab页切换开发完成"
    - fix:  修补bug,  例: git commit -m "fix: 修复了tab页切换,active状态不跟随的bug"
    - merge: 解决冲突或者合并代码，例: git commit -m "mege: 将首页tab页切换开发完成,合并到development分支"
    - style: 修补css样式(不影响代码运行的变动)
    - refactor: 重构(既不是新增功能，也不是修改bug的代码变动)
    - chore: 构建过程或辅助工具的变动
    - docs: 文档
    - revert: 撤销之前的commit 

#### 5. pages 命名规范
    - 组件命名: 以大驼峰规则命名例如：Home、HomePage

#### 6. 图片命名规范及压缩
    - 图片命名不可携带中文以及空格
    - 图片压缩使用：https://tinypng.com/ 进行压缩
    - 文件夹按照模块创建

#### 7. 公用函数封装规范
- 关于注释: 封装的公用方法一定要写注释,命名尽可能语义话
    > 页面组件中负责的业务逻辑，需要写注释，已方便后期维护
    ```js
    /**
    * 函数的功能: 跳过空数据
    * 函数的参数: @param {*} obj ,需要传递的参数
    */
    ```
- utils模块化管理:  例 storage 都是基于storage的方法可以分模块化新建文件，单独维护,后续: 将login登陆类授权类，可以单独新建文件来进行管理维护

#### 8.组件开发规范
- 公共组件:  对于公用组件，注意要抽离封装，属于该组件的逻辑写到该组件中去，避免逻辑都在写父组件，
    同时要考虑到暴漏出api，方便在其他组件使用
- 公共样式:  对于公用的样式可单独写在 assets - styles - common.wxss 中，避免演示冗余
- 公共方法:  对于公共方法，需要单独抽离，写好注释

#### 9.组件模块化管理
- pages 下面分为4个模块
    - Home  Home起到组件拼装的、入口的作用，当Home模块分离的组件，在component中创建对应的文件夹，然后引入进Home进行拼装
    - Query
    - Quotation
    - My 