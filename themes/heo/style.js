/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      body {
        background-color: #f7f9fe;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.6;
      }

      // 标题使用 Inter
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 600;
        line-height: 1.3;
      }

      // 导航菜单使用 Inter
      nav, .nav, .menu {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 500;
      }

      // 按钮使用 Inter
      button, .btn {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 500;
      }

      // 文章内容使用 Inter
      .article-content, .post-content, .blog-content {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 400;
        line-height: 1.7;
      }

      // 代码块使用 Monaco
      pre, code {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
      }

      // 内联代码
      :not(pre) > code {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
        font-size: 0.875em;
        background-color: #f1f3f4;
        padding: 0.2em 0.4em;
        border-radius: 3px;
      }

      // 深色模式下的内联代码
      .dark-mode :not(pre) > code {
        background-color: #2d3748;
        color: #e2e8f0;
      }

      // 标题大小调整
      h1 {
        font-size: 2.25rem;
        font-weight: 700;
      }

      h2 {
        font-size: 1.875rem;
        font-weight: 600;
      }

      h3 {
        font-size: 1.5rem;
        font-weight: 600;
      }

      h4 {
        font-size: 1.25rem;
        font-weight: 600;
      }

      h5 {
        font-size: 1.125rem;
        font-weight: 600;
      }

      h6 {
        font-size: 1rem;
        font-weight: 600;
      }

      // 段落间距
      p {
        margin-bottom: 1.25rem;
        line-height: 1.7;
      }

      // 列表样式
      ul, ol {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.7;
      }

      // 引用块样式
      blockquote {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-style: italic;
        border-left: 4px solid #3b82f6;
        padding-left: 1rem;
        margin: 1.5rem 0;
      }

      // 深色模式适配
      .dark-mode {
        background-color: #1a202c;
      }

      .dark-mode body {
        background-color: #1a202c;
        color: #e2e8f0;
      }

      .dark-mode .article-content,
      .dark-mode .post-content,
      .dark-mode .blog-content {
        color: #e2e8f0;
      }
    `}</style>
  )
}
export { Style }

