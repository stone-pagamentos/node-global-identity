import { Management } from './management'
import { GlobalIdentityConfig } from './interfaces/config.interface'
import { Authorization } from './authorization'
import * as gimConfiguration from './config/global-identity-config'

export = function GlobalIdentity (baseURL:string, aplicationKey: string, apiKeyConfig: string) {
  const gimConfig: GlobalIdentityConfig = <GlobalIdentityConfig>gimConfiguration()
  const appKey = aplicationKey || gimConfig.aplication_key
  const apiKey = apiKeyConfig || gimConfig.api_key
  const baseurl = baseURL || gimConfig.base_url

  if (!appKey) {
    throw new Error('You must provide an application key')
  }

  if (!baseurl) {
    throw new Error('You must provide the base_url for the Global Identity API')
  }

  if (!apiKey) {
    throw new Error('You must provide API key')
  }

  return {
    Authorization: new Authorization(appKey, baseurl),
    Management: new Management(appKey, apiKey, baseurl)
  }
}
