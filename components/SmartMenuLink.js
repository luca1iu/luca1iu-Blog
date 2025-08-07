import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import { extractLangPrefix } from '@/lib/utils/pageId'
import BLOG from '@/blog.config'

/**
 * 智能菜单链接组件
 * 能够正确处理多语言菜单链接，避免URL路径叠加问题
 */
const SmartMenuLink = ({ href, children, ...rest }) => {
  const router = useRouter()
  const { lang } = useGlobal()

  // 获取支持的语言列表
  const getSupportedLanguages = () => {
    const languages = []
    if (BLOG.NOTION_PAGE_ID.indexOf(',') > 0) {
      const siteIds = BLOG.NOTION_PAGE_ID.split(',')
      for (let index = 0; index < siteIds.length; index++) {
        const siteId = siteIds[index]
        const prefix = extractLangPrefix(siteId)
        if (prefix) {
          languages.push(prefix)
        }
      }
    }
    return languages
  }

  const supportedLanguages = getSupportedLanguages()

  // 处理菜单链接点击
  const handleClick = (e) => {
    e.preventDefault()
    
    const currentPath = router.asPath
    const targetHref = href || '#'
    
    // 如果是外部链接，直接跳转
    if (targetHref.startsWith('http')) {
      window.open(targetHref, '_blank')
      return
    }
    
    // 如果是锚点链接，直接跳转
    if (targetHref.startsWith('#')) {
      window.location.href = targetHref
      return
    }
    
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
    
    // 确保路径以 / 开头
    if (!finalHref.startsWith('/')) {
      finalHref = '/' + finalHref
    }
    
    // 跳转到目标页面
    router.push(finalHref)
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export default SmartMenuLink 