import test from 'ava'
import { getConfig } from '../../../dist/config/index'

const configMock = {
    test: {
        base_url: "https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api/",
        aplication_key: "test_key" 
    },
    production: {
        base_url: "https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api/",
        aplication_key: "production_key" 
    },
    development: {
        base_url: "https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api/",
        aplication_key: "development_key" 
    }
}

test.afterEach(() => {
  process.env.NODE_ENV = 'test'
})

test('getConfig: passing env as argument', (t) => {  
  const config = getConfig(configMock)('production')

  t.deepEqual(config, {
    base_url: 'https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api/',
    aplication_key: "production_key"
  }, 'should be the `production` config')
})

test('getConfig: with process.env.NODE_ENV', (t) => {
  process.env.NODE_ENV = 'development'
  const config = getConfig(configMock)('development')

  t.deepEqual(config, {
    base_url: 'https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api/',
    aplication_key: "development_key"
  }, 'should be the `development` config')
})

test('getConfig: with no argument and no process.env.NODE_ENV', (t) => {
  process.env.NODE_ENV = ''
  const config = getConfig(configMock)()

  t.deepEqual(config, {
    base_url: 'https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api/',
    aplication_key: "test_key"
  }, 'should be the default `test` config')
})
