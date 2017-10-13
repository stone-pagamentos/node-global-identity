import { Management } from './management'
import { GlobalIdentityConfig } from './interfaces/config.interface'
import { Authorization } from './authorization'
import * as gimConfiguration from './config/global-identity-config'

export = function GlobalIdentity (aplicationKey: string) {
  const gimConfig: GlobalIdentityConfig = <GlobalIdentityConfig>gimConfiguration()
  const apiKey = aplicationKey || gimConfig.aplication_key
  const baseUrl = gimConfig.aplication_key

  if (!apiKey) {
    throw new Error('You must provide an application key')
  }

  if (!baseUrl) {
    throw new Error('You must provide the base_url for the Global Identity API')
  }

  return {
    Authorization: new Authorization(apiKey, baseUrl),
    Management: new Management(apiKey, baseUrl),
  }
}
