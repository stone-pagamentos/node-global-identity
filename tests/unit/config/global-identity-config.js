import test from 'ava'
import gimConfig from '../../../dist/config/global-identity-config'

const configMock = {
    test: {
        base_url: "https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api",
        aplication_key: "test_aplication_key",
        api_key: "test_api_key"
    },
    production: {
        base_url: 'https://arpexid.stone.com.br/api',
        aplication_key: undefined,
        api_key: undefined
    }
}

test.afterEach(() => {
  process.env.NODE_ENV = 'test'
})

test('gimConfig: passing env as argument', (t) => {
    const config = gimConfig("")

    t.deepEqual(config, configMock.test, 'should be the `test` gimConfig')
})

test('gimConfig: with env set to production', (t) => {
    process.env.NODE_ENV = 'production'

    const config = gimConfig()

    t.deepEqual(config, configMock.production, 'should be the `production` gimConfig with default values')
})
