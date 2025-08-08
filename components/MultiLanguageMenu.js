import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'

/**
 * 多语言菜单组件
 * 直接在代码中定义菜单项，避免从 Notion 读取导致的路径问题
 */
const MultiLanguageMenu = () => {
  const router = useRouter()
  const { locale } = useGlobal()

  // 获取支持的语言列表
  const getSupportedLanguages = () => {
    const languages = []
    if (BLOG.NOTION_PAGE_ID.indexOf(',') > 0) {
      const siteIds = BLOG.NOTION_PAGE_ID.split(',')
      for (let index = 0; index < siteIds.length; index++) {
        const siteId = siteIds[index]
        if (siteId.includes(':')) {
          const prefix = siteId.split(':')[0]
          languages.push(prefix)
        }
      }
    }
    return languages
  }

  const supportedLanguages = getSupportedLanguages()
  const currentPath = router.asPath

  // 语言菜单配置
  const languageMenus = {
    zh: { name: '中文', href: '/zh' },
    de: { name: 'Deutsch', href: '/de' },
    en: { name: 'English', href: '/' }
  }

  // 处理语言切换
  const handleLanguageSwitch = (targetLang) => {
    const targetHref = languageMenus[targetLang]?.href || '/'
    
    // 如果当前在某个语言页面，需要切换到目标语言页面
    const currentLang = supportedLanguages.find(lang => currentPath.startsWith(`/${lang}`))
    
    if (currentLang && currentLang !== targetLang) {
      // 从当前语言页面切换到目标语言页面
      router.push(targetHref)
    } else if (!currentLang && targetLang !== 'en') {
      // 从根页面切换到其他语言页面
      router.push(targetHref)
    } else if (targetLang === 'en') {
      // 切换到英文（根页面）
      router.push('/')
    }
  }

  // 过滤掉当前语言，只显示其他语言的菜单
  const availableLanguages = supportedLanguages.filter(lang => {
    const currentLang = supportedLanguages.find(l => currentPath.startsWith(`/${l}`))
    return lang !== currentLang
  })

  // 如果当前在根页面，显示所有语言菜单
  const currentLang = supportedLanguages.find(lang => currentPath.startsWith(`/${lang}`))
  const showAllLanguages = !currentLang

  return (
    <>
      {showAllLanguages ? (
        // 在根页面显示所有语言菜单
        supportedLanguages.map(lang => (
          <button
            key={lang}
            onClick={() => handleLanguageSwitch(lang)}
            className="hover:bg-black hover:bg-opacity-10 rounded-2xl flex justify-center items-center px-3 py-1 no-underline tracking-widest cursor-pointer dark:text-gray-200"
          >
            {languageMenus[lang]?.name || lang}
          </button>
        ))
      ) : (
        // 在语言页面显示其他语言菜单
        availableLanguages.map(lang => (
          <button
            key={lang}
            onClick={() => handleLanguageSwitch(lang)}
            className="hover:bg-black hover:bg-opacity-10 rounded-2xl flex justify-center items-center px-3 py-1 no-underline tracking-widest cursor-pointer dark:text-gray-200"
          >
            {languageMenus[lang]?.name || lang}
          </button>
        ))
      )}
    </>
  )
}

export default MultiLanguageMenu 