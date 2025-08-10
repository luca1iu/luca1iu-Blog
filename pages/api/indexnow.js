/**
 * IndexNow API endpoint
 * Handles IndexNow notifications for content updates
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { urlList, host } = req.body

    if (!urlList || !Array.isArray(urlList) || urlList.length === 0) {
      return res.status(400).json({ error: 'urlList is required and must be an array' })
    }

    if (!host) {
      return res.status(400).json({ error: 'host is required' })
    }

    // IndexNow configuration
    const INDEXNOW_API_KEY = process.env.INDEXNOW_API_KEY || ''
    const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow'

    if (!INDEXNOW_API_KEY) {
      return res.status(500).json({ error: 'INDEXNOW_API_KEY environment variable is not set' })
    }

    // Prepare the IndexNow request
    const indexNowData = {
      host: host,
      key: INDEXNOW_API_KEY,
      urlList: urlList
    }

    // Send notification to IndexNow
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(indexNowData)
    })

    if (response.ok) {
      console.log(`IndexNow notification sent successfully for ${urlList.length} URLs`)
      return res.status(200).json({ 
        success: true, 
        message: `IndexNow notification sent for ${urlList.length} URLs`,
        urls: urlList
      })
    } else {
      console.error('IndexNow notification failed:', response.status, response.statusText)
      return res.status(response.status).json({ 
        error: 'IndexNow notification failed',
        status: response.status,
        statusText: response.statusText
      })
    }

  } catch (error) {
    console.error('IndexNow API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    })
  }
}
