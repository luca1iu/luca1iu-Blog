import fs from 'fs'

export function generateRobotsTxt(props) {
  const { siteInfo } = props
  const LINK = siteInfo?.link
  
  // 确保使用HTTPS URL
  const secureLink = LINK?.replace(/^http:/, 'https:') || LINK
  
  const content = `
# *
User-agent: *
Allow: /

# Host
Host: ${secureLink}

# Sitemaps
Sitemap: ${secureLink}/sitemap.xml
Sitemap: ${secureLink}/sitemap-google.xml
Sitemap: ${secureLink}/sitemap-bing.xml

# 禁止访问管理页面
Disallow: /dashboard/
Disallow: /auth/
Disallow: /api/
Disallow: /admin/

# 允许搜索引擎访问
Allow: /search/
Allow: /category/
Allow: /tag/
Allow: /archive/
`
  try {
    fs.mkdirSync('./public', { recursive: true })
    fs.writeFileSync('./public/robots.txt', content)
  } catch (error) {
    // 在vercel运行环境是只读的，这里会报错；
    // 但在vercel编译阶段、或VPS等其他平台这行代码会成功执行
  }
}
