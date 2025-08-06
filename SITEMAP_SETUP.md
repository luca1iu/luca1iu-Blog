# Google 和 Bing 站点地图配置指南

## 📋 已添加的功能

### 1. 站点验证
- ✅ Google Search Console 验证
- ✅ Bing Webmaster Tools 验证
- ✅ 百度站长工具验证（已存在）

### 2. 站点地图
- ✅ 通用站点地图：`/sitemap.xml`
- ✅ Google 专用站点地图：`/sitemap-google.xml`
- ✅ Bing 专用站点地图：`/sitemap-bing.xml`

### 3. Robots.txt
- ✅ 自动包含所有站点地图链接

## 🔧 配置步骤

### 1. 设置环境变量

在 Vercel 仪表板或 `.env.local` 文件中添加：

```bash
# Google Search Console 验证码
NEXT_PUBLIC_SEO_GOOGLE_SITE_VERIFICATION=your_google_verification_code

# Bing Webmaster Tools 验证码
NEXT_PUBLIC_SEO_BING_SITE_VERIFICATION=your_bing_verification_code

# 百度站长工具验证码（可选）
NEXT_PUBLIC_SEO_BAIDU_SITE_VERIFICATION=your_baidu_verification_code
```

### 2. 获取验证码

#### Google Search Console
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加你的网站
3. 选择 "HTML 标签" 验证方法
4. 复制验证码（例如：`abc123def456`）

#### Bing Webmaster Tools
1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 添加你的网站
3. 选择 "HTML 标签" 验证方法
4. 复制验证码（例如：`1234567890ABCDEF`）

### 3. 提交站点地图

#### Google Search Console
1. 登录 Google Search Console
2. 选择你的网站
3. 在左侧菜单中点击 "站点地图"
4. 添加以下站点地图：
   - `https://yourdomain.com/sitemap.xml`
   - `https://yourdomain.com/sitemap-google.xml`

#### Bing Webmaster Tools
1. 登录 Bing Webmaster Tools
2. 选择你的网站
3. 在左侧菜单中点击 "站点地图"
4. 添加以下站点地图：
   - `https://yourdomain.com/sitemap.xml`
   - `https://yourdomain.com/sitemap-bing.xml`

## 📊 站点地图特点

### Google 站点地图 (`/sitemap-google.xml`)
- 主页优先级：1.0
- 文章页面优先级：0.9
- 分类/标签页面优先级：0.8
- 更新频率：主页每日，其他页面每周

### Bing 站点地图 (`/sitemap-bing.xml`)
- 主页优先级：1.0
- 文章页面优先级：0.9
- 分类/标签页面优先级：0.8
- 更新频率：主页每日，其他页面每周

### 通用站点地图 (`/sitemap.xml`)
- 包含所有页面
- 包含 RSS 订阅链接
- 包含搜索页面

## 🔍 验证站点地图

部署后，你可以访问以下 URL 验证站点地图是否正常工作：

- `https://yourdomain.com/sitemap.xml`
- `https://yourdomain.com/sitemap-google.xml`
- `https://yourdomain.com/sitemap-bing.xml`
- `https://yourdomain.com/robots.txt`

## 📈 监控和优化

### 1. 定期检查
- 每月检查 Google Search Console 的索引状态
- 监控 Bing Webmaster Tools 的爬取统计
- 查看站点地图提交状态

### 2. 性能优化
- 站点地图会自动缓存 1 小时
- 支持 stale-while-revalidate 缓存策略
- 自动去重重复 URL

### 3. SEO 建议
- 确保所有重要页面都包含在站点地图中
- 定期更新内容以保持站点地图的时效性
- 监控搜索引擎的爬取错误

## 🚀 部署

设置环境变量后，重新部署你的网站：

```bash
git add .
git commit -m "Add Google and Bing sitemaps"
git push
```

Vercel 会自动重新部署，新的站点地图功能就会生效！ 