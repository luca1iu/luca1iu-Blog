import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { extractLangPrefix } from '@/lib/utils/pageId'
import BLOG from '@/blog.config'

/**
 * 语言切换组件
 */
const LanguageSwitcher = () => {
  const { lang, changeLang } = useGlobal()
  const router = useRouter()

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

  // 如果没有多语言配置，不显示语言切换器
  if (supportedLanguages.length <= 1) {
    return null
  }

  // 获取当前语言
  const getCurrentLanguage = () => {
    const pathname = router.asPath
    for (const lang of supportedLanguages) {
      if (pathname.startsWith(`/${lang}`)) {
        return lang
      }
    }
    return 'en' // 默认语言
  }

  // 切换语言
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

  const currentLang = getCurrentLanguage()

  return (
    <div className="flex items-center space-x-2">
      {supportedLanguages.map((language) => (
        <button
          key={language}
          onClick={() => switchLanguage(language)}
          className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
            currentLang === language
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-sm'
          }`}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher 