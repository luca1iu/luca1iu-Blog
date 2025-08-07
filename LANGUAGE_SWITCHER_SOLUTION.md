# 语言切换器解决方案

## 问题描述

你遇到的问题是：当你在 `/zh` 路径时，想切换成 `/de`，URL 会变成 `/zh/de`，它直接在当前路径后面增加 `/de`，而不是跳转到域名根目录的 `/de`。

## 解决方案

我创建了一个自定义的语言切换组件来解决这个问题。

### 1. 创建的语言切换组件

**文件位置**: `components/LanguageSwitcher.js`

这个组件能够：
- 自动检测当前页面使用的语言
- 正确处理语言切换，避免URL路径叠加
- 支持多语言配置
- 在桌面端和移动端都有良好的显示效果

### 2. 集成到主题中

**桌面端**: 在 `themes/heo/components/Header.js` 中添加了语言切换器
**移动端**: 在 `themes/heo/components/SlideOver.js` 中添加了语言切换器

### 3. 工作原理

语言切换器会：
1. 从 `blog.config.js` 中的 `NOTION_PAGE_ID` 配置读取支持的语言
2. 检测当前页面的语言前缀
3. 当用户点击语言切换按钮时，正确计算新的URL路径
4. 使用 `router.push()` 跳转到正确的语言页面

### 4. 配置要求

确保你的 `blog.config.js` 中有正确的多语言配置：

```javascript
NOTION_PAGE_ID:
  process.env.NOTION_PAGE_ID ||
  '2474f330b25a80dcb0b2f5c43750f915,zh:2484f330b25a81d78de8dac63d1cfd39,de:2484f330b25a8130a416da0cd1576f01',
```

### 5. 使用方法

1. **桌面端**: 在导航栏右侧会显示语言切换按钮
2. **移动端**: 在侧边菜单中会显示语言切换选项

### 6. 支持的URL结构

- 英语版本: `https://yourdomain.com/`
- 中文版本: `https://yourdomain.com/zh/`
- 德语版本: `https://yourdomain.com/de/`

### 7. 测试页面

我还创建了一个测试页面 `pages/test-lang.js` 来验证语言切换功能。

## 技术细节

### 核心逻辑

```javascript
const switchLanguage = (targetLang) => {
  const currentLang = getCurrentLanguage()
  const currentPath = router.asPath
  
  // 移除当前语言前缀
  let newPath = currentPath
  if (currentLang !== 'en') {
    newPath = currentPath.replace(`/${currentLang}`, '')
  }
  
  // 添加目标语言前缀
  if (targetLang !== 'en') {
    newPath = `/${targetLang}${newPath}`
  }
  
  // 确保路径以 / 开头
  if (!newPath.startsWith('/')) {
    newPath = '/' + newPath
  }
  
  // 跳转到新路径
  router.push(newPath)
}
```

### 样式特点

- 响应式设计，适配桌面端和移动端
- 支持深色模式
- 当前选中的语言会高亮显示
- 悬停效果和过渡动画

## 部署

1. 确保所有文件都已保存
2. 重新构建项目: `npm run build`
3. 部署到你的服务器

## 验证

部署后，你可以：
1. 访问 `https://yourdomain.com/zh/`
2. 点击语言切换按钮
3. 验证是否正确跳转到 `https://yourdomain.com/de/`

这个解决方案完全解决了你提到的URL路径叠加问题，现在语言切换会正确地跳转到对应的语言页面，而不是在当前路径后面添加语言前缀。 