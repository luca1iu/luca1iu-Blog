# Giscus 评论系统安装指南

## 步骤一：启用 GitHub Discussions

1. 访问你的 GitHub 仓库设置：https://github.com/luca1iu/luca1iu-Blog/settings/features
2. 找到 "Discussions" 选项
3. 点击 "Enable discussions for this repository"
4. 点击 "Save" 保存设置

## 步骤二：安装 Giscus 应用

1. 访问 Giscus 应用页面：https://github.com/apps/giscus
2. 点击 "Install" 按钮
3. 选择你的仓库：`luca1iu/luca1iu-Blog`
4. 点击 "Install" 完成安装

## 步骤三：获取配置信息

1. 访问 Giscus 配置页面：https://giscus.app
2. 填写以下信息：
   - **Repository**: `luca1iu/luca1iu-Blog`
   - **Discussion Category**: 选择 "Announcements" 或创建新的分类
   - **Mapping**: 选择 "Pathname"
   - **Discussion Term**: 选择 "Discussion title contains page pathname"
   - **Theme**: 选择 "Light" 或 "Dark"
   - **Language**: 选择 "zh-CN"

3. 复制生成的配置信息，包括：
   - **Repository ID** (例如：`R_kgDOJqXqXQ`)
   - **Category ID** (例如：`DIC_kwDOJqXqXc4CaXqX`)

## 步骤四：更新配置文件

获取配置信息后，更新 `conf/comment.config.js` 文件中的以下配置：

```javascript
COMMENT_GISCUS_REPO_ID: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPO_ID || '你的Repository ID',
COMMENT_GISCUS_CATEGORY_ID: process.env.NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY_ID || '你的Category ID',
```

## 步骤五：设置环境变量（可选）

在 Vercel 中设置以下环境变量：

- `NEXT_PUBLIC_COMMENT_GISCUS_REPO_ID`: 你的 Repository ID
- `NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY_ID`: 你的 Category ID

## 步骤六：测试评论功能

1. 部署网站
2. 访问任意文章页面
3. 查看页面底部是否出现评论区域
4. 尝试发表评论

## 常见问题

### Q: "giscus is not installed on this repository"
A: 确保已经完成步骤一和步骤二，安装 Giscus 应用到你的仓库。

### Q: 评论区域不显示
A: 检查配置信息是否正确，确保 Repository ID 和 Category ID 正确。

### Q: 评论无法发表
A: 确保 GitHub Discussions 已启用，并且 Giscus 应用已正确安装。

## 配置示例

```javascript
// conf/comment.config.js
COMMENT_GISCUS_REPO: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPO || 'luca1iu/luca1iu-Blog',
COMMENT_GISCUS_REPO_ID: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPO_ID || 'R_kgDOJqXqXQ',
COMMENT_GISCUS_CATEGORY_ID: process.env.NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY_ID || 'DIC_kwDOJqXqXc4CaXqX',
COMMENT_GISCUS_MAPPING: process.env.NEXT_PUBLIC_COMMENT_GISCUS_MAPPING || 'pathname',
COMMENT_GISCUS_REACTIONS_ENABLED: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REACTIONS_ENABLED || '1',
COMMENT_GISCUS_EMIT_METADATA: process.env.NEXT_PUBLIC_COMMENT_GISCUS_EMIT_METADATA || '0',
COMMENT_GISCUS_INPUT_POSITION: process.env.NEXT_PUBLIC_COMMENT_GISCUS_INPUT_POSITION || 'bottom',
COMMENT_GISCUS_LANG: process.env.NEXT_PUBLIC_COMMENT_GISCUS_LANG || 'zh-CN',
COMMENT_GISCUS_LOADING: process.env.NEXT_PUBLIC_COMMENT_GISCUS_LOADING || 'lazy',
COMMENT_GISCUS_CROSSORIGIN: process.env.NEXT_PUBLIC_COMMENT_GISCUS_CROSSORIGIN || 'anonymous',
``` 