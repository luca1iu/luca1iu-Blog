import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import BLOG from '@/blog.config'

/**
 * 语言菜单组件
 * 直接在代码中定义语言菜单，避免从 Notion 读取导致的路径问题
 */
const LanguageMenu = () => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')

  // 获取支持的语言列表
  const getSupportedLanguages = () => {
    const languages = ['en'] // 默认包含英语
    if (BLOG.NOTION_PAGE_ID.indexOf(',') > 0) {
      const siteIds = BLOG.NOTION_PAGE_ID.split(',')
      for (let index = 0; index < siteIds.length; index++) {
        const siteId = siteIds[index]
        if (siteId.includes(':')) {
          const prefix = siteId.split(':')[0]
          if (!languages.includes(prefix)) {
            languages.push(prefix)
          }
        }
      }
    }
    return languages
  }

  const supportedLanguages = getSupportedLanguages()

  // 确保客户端渲染并监听路径变化
  useEffect(() => {
    setMounted(true)
    // 使用 window.location.pathname 来获取当前路径
    const path = typeof window !== 'undefined' ? window.location.pathname : '/'
    setCurrentPath(path)
  }, [router.asPath])

  // 语言菜单配置
  const languageMenus = {
    zh: { name: '中文', href: '/zh' },
    de: { name: 'Deutsch', href: '/de' },
    en: { name: 'English', href: '/' }
  }

  // 处理语言切换
  const handleLanguageSwitch = (targetLang) => {
    // 在点击时获取当前路径
    const currentPathAtClick = typeof window !== 'undefined' ? window.location.pathname : '/'
    
    // 获取当前语言
    const currentLang = supportedLanguages.find(lang => currentPathAtClick.startsWith(`/${lang}`))
    
    // 确定目标URL
    let targetUrl = '/'
    if (targetLang === 'zh') {
      targetUrl = '/zh'
    } else if (targetLang === 'de') {
      targetUrl = '/de'
    } else if (targetLang === 'en') {
      targetUrl = '/'
    }
    
    console.log('LanguageMenu 调试信息:')
    console.log('- 当前路径:', currentPathAtClick)
    console.log('- 当前语言:', currentLang)
    console.log('- 目标语言:', targetLang)
    console.log('- 目标URL:', targetUrl)
    
    // 使用 window.location.href 直接跳转，避免被 Next.js 重写规则拦截
    if (typeof window !== 'undefined') {
      window.location.href = targetUrl
    } else {
      router.push(targetUrl)
    }
  }

  // 获取当前语言
  const currentLang = supportedLanguages.find(lang => currentPath.startsWith(`/${lang}`))
  
  // 在服务器端渲染时不显示任何内容，避免水合错误
  if (!mounted) {
    return null
  }

  // 如果当前在根页面（英文），只显示中文和德文菜单
  if (!currentLang) {
    return (
      <div className="flex space-x-2">
        {supportedLanguages.filter(lang => lang !== 'en').map(lang => (
          <button
            key={lang}
            onClick={() => handleLanguageSwitch(lang)}
            className="hover:bg-black hover:bg-opacity-10 rounded-2xl flex justify-center items-center px-3 py-1 no-underline tracking-widest cursor-pointer dark:text-gray-200"
          >
            {languageMenus[lang]?.name || lang}
          </button>
        ))}
      </div>
    )
  }

  // 在语言页面显示其他两个语言的菜单（不包括当前语言）
  return (
    <div className="flex space-x-2">
      {supportedLanguages.filter(lang => lang !== currentLang).map(lang => (
        <button
          key={lang}
          onClick={() => handleLanguageSwitch(lang)}
          className="hover:bg-black hover:bg-opacity-10 rounded-2xl flex justify-center items-center px-3 py-1 no-underline tracking-widest cursor-pointer dark:text-gray-200"
        >
          {languageMenus[lang]?.name || lang}
        </button>
      ))}
    </div>
  )
}

export default LanguageMenu 