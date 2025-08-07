# 德语语言支持配置指南

## ✅ 已完成的工作

### 1. 德语语言文件
- ✅ 创建了 `lib/lang/de-DE.js` 德语语言文件
- ✅ 包含了完整的德语翻译

### 2. 语言配置更新
- ✅ 在 `lib/lang.js` 中添加了德语支持
- ✅ 导入了德语语言包
- ✅ 在 LANGS 对象中注册了 `de-DE`

## 🔧 配置步骤

### 1. 设置环境变量

在 Vercel 仪表板或 `.env.local` 文件中添加：

```bash
# 设置默认语言为德语
NEXT_PUBLIC_LANG=de-DE

# 或者保持英语为默认，通过 URL 参数切换
NEXT_PUBLIC_LANG=en-US
```

### 2. 多语言 Notion 配置

如果你想要支持多语言内容，需要在 Notion 中创建对应的页面：

1. **创建德语页面**：
   - 在 Notion 中创建一个新的页面用于德语内容
   - 复制现有的页面结构
   - 将内容翻译为德语

2. **更新 NOTION_PAGE_ID**：
   ```bash
   # 格式：英文页面ID, 语言前缀:德语页面ID
   NOTION_PAGE_ID=2474f330b25a80dcb0b2f5c43750f915,de:你的德语页面ID
   ```

### 3. URL 结构

配置完成后，你的网站将支持以下 URL 结构：

- **英语版本**：`https://yourdomain.com/`
- **德语版本**：`https://yourdomain.com/de/`

## 📝 德语翻译内容

### 主要翻译项目：

#### 导航菜单
- 首页 → Startseite
- 搜索 → Suche
- 归档 → Archiv
- 关于 → Über

#### 通用术语
- 文章 → Artikel
- 分类 → Kategorie
- 标签 → Tags
- 分享 → Teilen
- 评论 → Kommentare

#### 功能按钮
- 复制 → Kopieren
- 提交 → Absenden
- 返回 → Zurück
- 更多 → Mehr

#### 时间相关
- 发布于 → Veröffentlicht am
- 最后编辑 → Zuletzt bearbeitet
- 阅读时间 → Lesezeit

## 🎯 使用方法

### 1. 通过 URL 切换语言
- 访问 `https://yourdomain.com/` 查看英语版本
- 访问 `https://yourdomain.com/de/` 查看德语版本

### 2. 通过查询参数切换语言
- `https://yourdomain.com/?locale=de-DE`
- `https://yourdomain.com/?lang=de-DE`

### 3. 自动语言检测
网站会根据用户的浏览器语言设置自动选择合适的语言版本。

## 🚀 部署

设置环境变量后，重新部署你的网站：

```bash
git add .
git commit -m "Add German language support"
git push
```

Vercel 会自动重新部署，新的德语支持就会生效！

## 📊 支持的完整语言列表

现在你的网站支持以下语言：

1. **英语** (en-US) - 默认
2. **简体中文** (zh-CN)
3. **繁体中文** (zh-TW)
4. **香港繁体** (zh-HK)
5. **法语** (fr-FR)
6. **土耳其语** (tr-TR)
7. **日语** (ja-JP)
8. **德语** (de-DE) - 新增

## 🔍 验证德语支持

部署后，你可以：

1. 访问 `https://yourdomain.com/de/` 查看德语版本
2. 检查页面元素是否正确显示德语
3. 测试语言切换功能是否正常工作

## 💡 自定义德语翻译

如果需要修改或添加德语翻译，编辑 `lib/lang/de-DE.js` 文件：

```javascript
export default {
  LOCALE: 'Deutsch',
  MENU: {
    // 在这里添加或修改菜单翻译
  },
  NAV: {
    // 在这里添加或修改导航翻译
  },
  COMMON: {
    // 在这里添加或修改通用翻译
  }
  // ... 其他翻译项
}
``` 