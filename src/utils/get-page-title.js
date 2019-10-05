import defaultSettings from '@/settings'

const title = defaultSettings.title || '汽车配件销售系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

