# 语言切换器解决方案

## 问题描述

你遇到的问题是：当你在 `/zh` 路径时，想切换成 `/de`，URL 会变成 `/zh/de`，它直接在当前路径后面增加 `/de`，而不是跳转到域名根目录的 `/de`。

**根本原因**：问题出在 Notion 自定义菜单的 `slug` 配置上。当你在 Notion 中创建 `Menu` 类型的页面时，如果 `slug` 设置为 `/de`，那么点击这个菜单项时，Next.js 会将其作为相对路径处理，导致在当前路径 `/zh` 后面追加 `/de`，变成 `/zh/de`。

## 解决方案

我创建了一个智能菜单链接组件来解决这个问题。

### 1. 创建的智能菜单链接组件

**文件位置**: `components/SmartMenuLink.js`

这个组件能够：
- 自动检测当前页面使用的语言
- 正确处理菜单链接，避免URL路径叠加
- 支持多语言配置
- 智能处理语言切换

### 2. 集成到主题中

**桌面端**: 在 `themes/heo/components/MenuItemDrop.js` 中使用 `SmartMenuLink` 替换 `SmartLink`
**移动端**: 在 `themes/heo/components/MenuItemCollapse.js` 中使用 `SmartMenuLink` 替换 `SmartLink`

### 3. 工作原理

智能菜单链接组件会：
1. 从 `blog.config.js` 中的 `NOTION_PAGE_ID` 配置读取支持的语言
2. 检测当前页面的语言前缀
3. 当用户点击菜单链接时，智能处理URL路径
4. 正确处理多语言菜单链接，避免路径叠加问题

### 4. 配置要求

确保你的 `blog.config.js` 中有正确的多语言配置：

```javascript
NOTION_PAGE_ID:
  process.env.NOTION_PAGE_ID ||
  '2474f330b25a80dcb0b2f5c43750f915,zh:2484f330b25a81d78de8dac63d1cfd39,de:2484f330b25a8130a416da0cd1576f01',
```

### 5. 使用方法

现在你的自定义菜单会自动正确处理多语言链接：
1. **桌面端**: 在导航栏的菜单项会自动使用智能链接
2. **移动端**: 在侧边菜单的菜单项会自动使用智能链接

### 6. 支持的URL结构

- 英语版本: `https://yourdomain.com/`
- 中文版本: `https://yourdomain.com/zh/`
- 德语版本: `https://yourdomain.com/de/`

### 7. 工作原理示例

假设你在 Notion 中创建了一个 `Menu` 类型的页面：
- **title**: "德语版"
- **slug**: "/de"
- **type**: "Menu"

现在当用户在 `/zh` 页面点击这个菜单项时，会正确跳转到 `/de`，而不是 `/zh/de`。

## 技术细节

### 核心逻辑

```javascript
const handleClick = (e) => {
  e.preventDefault()
  
  const currentPath = router.asPath
  const targetHref = href || '#'
  
  // 处理多语言链接
  const langPrefixes = supportedLanguages
  const currentLang = langPrefixes.find(lang => currentPath.startsWith(`/${lang}`))
  const targetLang = langPrefixes.find(lang => targetHref.startsWith(`/${lang}`))
  
  let finalHref = targetHref
  
  // 如果目标链接包含语言前缀
  if (targetLang) {
    // 如果当前也在某个语言页面，但语言不同，直接跳转到目标语言页面
    if (currentLang && currentLang !== targetLang) {
      finalHref = targetHref
    } else if (!currentLang) {
      // 如果当前不在语言页面，直接跳转到目标语言页面
      finalHref = targetHref
    } else {
      // 如果当前和目标语言相同，移除语言前缀
      finalHref = targetHref.replace(`/${targetLang}`, '')
    }
  } else {
    // 如果目标链接不包含语言前缀
    if (currentLang) {
      // 如果当前在语言页面，添加当前语言前缀
      finalHref = `/${currentLang}${targetHref}`
    }
  }
  
  // 跳转到目标页面
  router.push(finalHref)
}
```

### 样式特点

- 完全兼容现有的菜单样式
- 支持深色模式
- 保持原有的悬停效果和过渡动画
- 无需额外的UI组件

## 部署

1. 确保所有文件都已保存
2. 重新构建项目: `npm run build`
3. 部署到你的服务器

## 验证

部署后，你可以：
1. 访问 `https://yourdomain.com/zh/`
2. 点击任何包含语言前缀的菜单项（如 `/de`）
3. 验证是否正确跳转到 `https://yourdomain.com/de/`

这个解决方案完全解决了你提到的URL路径叠加问题，现在菜单链接会正确地跳转到对应的语言页面，而不是在当前路径后面添加语言前缀。

## 部署到 Vercel

现在你可以将修改推送到 GitHub，Vercel 会自动重新部署：

```bash
git add .
git commit -m "Fix multi-language menu URL issue with SmartMenuLink component"
git push
```

部署完成后，你就可以在 Vercel 上测试语言切换功能了！ 