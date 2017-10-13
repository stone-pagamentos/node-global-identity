import { getConfig } from './index'

const gimConfiguration = getConfig({
    test: {
        base_url: "https://private-anon-41d5c63929-globalidentity.apiary-mock.com/api/",
        aplication_key: "test_api_key"
    },
    production: {
        base_url: process.env.GLOBAL_IDENTITY_URL || "https://arpexid.stone.com.br/api",
        aplication_key: process.env.GLOBAL_API_KEY
    }
})

export = gimConfiguration;