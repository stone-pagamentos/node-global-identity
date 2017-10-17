import { Management } from './management'
import { GlobalIdentityConfig } from './interfaces/config.interface'
import { Authorization } from './authorization'
import * as gimConfiguration from './config/global-identity-config'

export = function GlobalIdentity (options: any = {}) {
  const gimConfig: GlobalIdentityConfig = <GlobalIdentityConfig>gimConfiguration()
  const applicationKey = options.applicationKey || gimConfig.applicationKey
  const apiKey = options.apiKey || gimConfig.apiKey
  const baseURL = options.baseURL || gimConfig.baseURL

  if (!applicationKey) {
    throw new Error('You must provide an application key')
  }

  if (!baseURL) {
    throw new Error('You must provide the base_url for the Global Identity API')
  }

  if (!apiKey) {
    throw new Error('You must provide API key')
  }

  return {
    Authorization: new Authorization(applicationKey, baseURL),
    Management: new Management(applicationKey, apiKey, baseURL)
  }
}
