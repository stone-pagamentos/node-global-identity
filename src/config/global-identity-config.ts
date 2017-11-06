import { getConfig } from './index'

const gimConfiguration = getConfig({
  test: {
    baseURL: 'https://gim.stone.com.br/api',
    applicationKey: process.env.GLOBAL_APP_KEY || 'test_aplication_key',
    apiKey: process.env.GLOBAL_API_KEY || 'test_api_key'
  },
  production: {
    baseURL: process.env.GLOBAL_IDENTITY_URL || 'https://gim.stone.com.br/api',
    applicationKey: process.env.GLOBAL_APP_KEY,
    apiKey: process.env.GLOBAL_API_KEY
  }
})

export = gimConfiguration
