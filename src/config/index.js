import commonConfig from './common.config'
import developmentConfig from './development.config'
import productionConfig from './production.config'

function buildConfig (type) {
  let envConfig = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig
  return Object.assign(commonConfig, envConfig)
}

export default buildConfig()
