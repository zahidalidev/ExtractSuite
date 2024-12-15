import { networkManager } from './networkManager'

export const scrapeWebsites = payload => {
  return networkManager.post('scrapWebsite', payload)
}
