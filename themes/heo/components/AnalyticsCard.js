import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'
import { getPageViews } from '@/lib/analytics/googleAnalytics'

/**
 * 博客统计卡牌
 * @param {*} props
 * @returns
 */
export function AnalyticsCard(props) {
  const targetDate = new Date(siteConfig('HEO_SITE_CREATE_TIME', null, CONFIG))
  const today = new Date()
  const diffTime = today.getTime() - targetDate.getTime() // 获取两个日期之间的毫秒数差值
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // 将毫秒数差值转换为天数差值
  const postCountTitle = siteConfig('HEO_POST_COUNT_TITLE', null, CONFIG)
  const siteTimeTitle = siteConfig('HEO_SITE_TIME_TITLE', null, CONFIG)
  const siteVisitTitle = siteConfig('HEO_SITE_VISIT_TITLE', null, CONFIG)
  const siteVisitorTitle = siteConfig('HEO_SITE_VISITOR_TITLE', null, CONFIG)

  const { postCount } = props
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: '...',
    uniqueVisitors: '...'
  })

  // 从 Google Analytics 获取数据
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const data = await getPageViews()
        setAnalyticsData({
          pageViews: data.pageViews,
          uniqueVisitors: data.uniqueVisitors
        })
      } catch (error) {
        console.error('Failed to fetch analytics data:', error)
        setAnalyticsData({
          pageViews: 'N/A',
          uniqueVisitors: 'N/A'
        })
      }
    }

    fetchAnalyticsData()
  }, [])

  return <>
        <div className='text-sm flex flex-col space-y-1 justify-center px-3' style={{fontSize: '14px'}}>
            <div className='inline'>
                <div className='flex justify-between'>
                    <div>{postCountTitle}</div>
                    <div>{postCount}</div>
                </div>
            </div>
            <div className='inline'>
                <div className='flex justify-between'>
                    <div>{siteTimeTitle}</div>
                    <div>{diffDays} Days</div>
                </div>
            </div>
            <div className='inline'>
                <div className='flex justify-between'>
                    <div>{siteVisitTitle}</div>
                    <div>{analyticsData.pageViews}</div>
                </div>
            </div>
            <div className='inline'>
                <div className='flex justify-between'>
                    <div>{siteVisitorTitle}</div>
                    <div>{analyticsData.uniqueVisitors}</div>
                </div>
            </div>
        </div>
        </>
}
