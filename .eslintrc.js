/*
 * Eslint config file
 * Documentation: https://eslint.org/docs/user-guide/configuring/
 * Install the Eslint extension before using this feature.
 */
console.log('eslint 文件配置')
const config = require('../config/config')
console.log(config.dev_env,'查看环境')
module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  ecmaFeatures: {
    modules: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true,
  },
  // extends: 'eslint:recommended',
  rules: {
    /**
     * "off"或者0    //关闭规则关闭
     * "warn"或者1    //在打开的规则作为警告（不影响退出代码）
     * "error"或者2    //把规则作为一个错误（退出代码触发时为1）
     **/
    'no-console': config.dev_env === 'pro' ? true : false,
    'no-debugger': config.dev_env === 'pro' ? true : false,
    // 关闭语句强制分号结尾
    "semi": false,
    // 关闭分号前后空格
    "semi-spacing": false,
    // 关闭引号类型限制
    "quotes": false,
    // 关闭对象字面量项尾不能有逗号限制
    "comma-dangle": false,
    // 空行最多不能超过100行
    "no-multiple-empty-lines": [false, {"max": 100}],
    // 关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": false,
    // 不能有声明后未被使用的变量或参数
    "no-unused-vars": [1, {
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    // 关闭不能有不规则的空格
    'no-irregular-whitespace': false,
    // 关闭禁止多余的冒号
    'no-extra-semi': false,
    // 关闭逗号前后的空格
    "comma-spacing": false,
    // 关闭缩进风格
    "indent": false,
    // 关闭大括号内是否允许不必要的空格限制
    "object-curly-spacing": false,
    // 关闭文件以单一的换行符结束限制
    "eol-last": false,
    // 关闭函数定义时括号前面要不要有空格限制
    "space-before-function-paren": false,
    // 关闭避免不必要的方括号限制
    "dot-notation": false,
    // 关闭小括号里面要不要有空格限制
    "space-in-parens": false,
    // 关闭箭头函数用小括号括起来
    "arrow-parens": false,
    // 关闭=>的前/后括号
    "arrow-spacing": false,
    // 关闭块语句中使用var
    "block-scoped-var": false,
    // 关闭对象字面量中冒号的前后空格
    "key-spacing": false,
    // 关闭是否允许非空数组里面有多余的空格
    "array-bracket-spacing": false,
    // 关闭是否允许计算后的键名什么的
    "computed-property-spacing": false,
    // 关闭禁止或强制在单行代码块中使用空格
    "block-spacing": false,
    // 关闭不能用多余的空格
    "no-multi-spaces": false,
    // 关闭注释风格要不要有空格什么的
    "spaced-comment": false,
    // 关闭必须使用 if(){} 中的{}
    "curly": false,
    // 关闭首选const
    "prefer-const": false,
    // 关闭块语句内行首行尾是否要空行
    "padded-blocks": false,
    "template-curly-spacing" : false, // 字符模版限制
    "template-tag-spacing" : false, // 字符模版限制
    "space-unary-ops": false, //一元运算符的前/后要不要加空格
    "quote-props": false, //对象字面量中的属性名是否强制双引号
    "space-infix-ops": false,//中缀操作符周围要不要有空格
    "no-useless-escape": false,// 转义字符串\
    "camelcase": false,// 没有使用驼峰命名法
    "no-callback-literal": 0
  },
}
